
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ShieldAlertIcon } from '../components/icons';
import { CrisisScoreGauge } from '../components/risk/CrisisScoreGauge';
import { AlertsPanel } from '../components/risk/AlertsPanel';
import { DashboardChart } from '../components/dashboard/DashboardChart';

export const RiskCrisisView: React.FC = () => {
    const { history, alerts } = useContext(AppContext);
    const latestEntry = history.length > 0 ? history[0] : null;
    const currentScore = latestEntry?.score ?? 0;

    const chartData = useMemo(() => 
        history.slice(0, 10).reverse().map(entry => ({
            name: new Date(entry.id.split('_')[1]).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            score: entry.score,
        })), [history]);

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <ShieldAlertIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Painel de Risco & Crise
                </h1>
                <p className="text-gray-400">Monitoramento centralizado de score de crise e alertas automáticos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Gauge and Chart */}
                <div className="lg:col-span-2 space-y-8">
                    <CrisisScoreGauge score={currentScore} />
                    <DashboardChart data={chartData} />
                </div>

                {/* Sidebar: Alerts Panel */}
                <div className="lg:col-span-1">
                    <AlertsPanel alerts={alerts} />
                </div>
            </div>
        </div>
    );
};
