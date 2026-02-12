
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import { StatCard } from '../components/dashboard/StatCard';
import { ClockIcon, TrendingUpIcon, ShieldAlertIcon, SmileIcon, MehIcon, FrownIcon } from '../components/icons';
import { DashboardChart } from '../components/dashboard/DashboardChart';
import { RecentHistoryTable } from '../components/dashboard/RecentHistoryTable';

const getStatusInfo = (score: number): { status: string; color: string } => {
    if (score <= 20) return { status: "Seguro", color: "text-green-400" };
    if (score <= 40) return { status: "Atenção", color: "text-yellow-400" };
    if (score <= 60) return { status: "Alerta", color: "text-orange-400" };
    if (score <= 80) return { status: "Crise", color: "text-red-500" };
    return { status: "Crise Grave", color: "text-red-400" };
};

const getSentimentInfo = (metrics: any) => {
    if (!metrics) return { sentiment: "N/D", Icon: MehIcon, color: "text-gray-400" };

    const positive = metrics.apoio_percentual || 0;
    const negative = (metrics.critica_percentual || 0) + (metrics.ataque_percentual || 0) + (metrics.informacao_falsa_percentual || 0);

    if (positive > negative && positive > 50) return { sentiment: "Positivo", Icon: SmileIcon, color: "text-green-400" };
    if (negative > positive && negative > 50) return { sentiment: "Negativo", Icon: FrownIcon, color: "text-red-400" };
    return { sentiment: "Misto", Icon: MehIcon, color: "text-yellow-400" };
};


export const DashboardView: React.FC = () => {
    const { history } = useContext(AppContext);

    // Filter history to only include entries from the current calendar day
    const todaysHistory = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfToday = today.getTime();

        return history.filter(entry => {
            const entryTimestamp = parseInt(entry.id.split('_')[1], 10);
            return entryTimestamp >= startOfToday;
        });
    }, [history]);

    const latestEntry = todaysHistory.length > 0 ? todaysHistory[0] : null;
    const score = latestEntry?.score ?? 0;
    const { status, color } = getStatusInfo(score);
    const { sentiment, Icon: SentimentIcon, color: sentimentColor } = getSentimentInfo(latestEntry?.metrics);

    const chartData = useMemo(() => 
        todaysHistory.slice().reverse().map(entry => ({
            name: new Date(parseInt(entry.id.split('_')[1], 10)).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            score: entry.score,
        })), [todaysHistory]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard do Dia</h1>
                <p className="text-gray-400">Visão executiva dos indicadores de risco de hoje.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Score de Crise Atual" 
                    value={score.toString()} 
                    icon={TrendingUpIcon}
                    valueColor={color}
                    trend={todaysHistory.length > 1 ? todaysHistory[0].score - todaysHistory[1].score : 0}
                />
                <StatCard 
                    title="Status Geral" 
                    value={status} 
                    icon={ShieldAlertIcon} 
                    valueColor={color}
                />
                <StatCard 
                    title="Emoção Predominante" 
                    value={sentiment}
                    icon={SentimentIcon} 
                    valueColor={sentimentColor}
                />
                <StatCard 
                    title="Última Análise" 
                    value={latestEntry?.timestamp.split(' ')[1] ?? '--:--:--'} 
                    icon={ClockIcon} 
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <DashboardChart data={chartData} />
                </div>
                <div className="lg:col-span-1">
                    <RecentHistoryTable history={todaysHistory.slice(0, 7)} />
                </div>
            </div>
        </div>
    );
};
