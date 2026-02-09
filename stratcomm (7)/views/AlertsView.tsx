
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { BellRingIcon, AlertTriangleIcon } from '../components/icons';
import type { Alert } from '../types';

const getRiskColorClasses = (classification: "Alerta" | "Crise" | "Crise Grave") => {
  switch (classification) {
    case 'Alerta':
      return {
        border: 'border-orange-500/50',
        bg: 'bg-orange-900/30',
        text: 'text-orange-300',
        icon: 'text-orange-400',
      };
    case 'Crise':
      return {
        border: 'border-red-500/50',
        bg: 'bg-red-900/30',
        text: 'text-red-300',
        icon: 'text-red-400',
      };
    case 'Crise Grave':
      return {
        border: 'border-red-600/50',
        bg: 'bg-red-900/50',
        text: 'text-red-200',
        icon: 'text-red-300',
      };
    default:
       return {
        border: 'border-gray-500/50',
        bg: 'bg-gray-800/50',
        text: 'text-gray-300',
        icon: 'text-gray-400',
      };
  }
};

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
    const colors = getRiskColorClasses(alert.classification);

    return (
        <div className={`border-l-4 p-6 rounded-lg shadow-lg ${colors.border} ${colors.bg}`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                    <div className={`flex items-center space-x-3 mb-2`}>
                         <AlertTriangleIcon className={`w-7 h-7 ${colors.icon}`} />
                        <h3 className={`text-2xl font-bold ${colors.text}`}>{alert.classification}</h3>
                    </div>
                    <p className="text-gray-400">
                        <strong>Origem:</strong> <span className="text-gray-300">{alert.postTheme}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{alert.timestamp}</p>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                    <p className="text-gray-400 text-sm">Score de Risco</p>
                    <p className={`text-5xl font-extrabold ${colors.text}`}>{alert.score}</p>
                </div>
            </div>
        </div>
    );
}


export const AlertsView: React.FC = () => {
    const { alerts } = useContext(AppContext);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <BellRingIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Central de Alertas
                </h1>
                <p className="text-gray-400">Histórico de todos os alertas de risco gerados automaticamente.</p>
            </div>
            
            {alerts.length > 0 ? (
                <div className="space-y-6">
                    {alerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700 min-h-[400px]">
                    <BellRingIcon className="w-20 h-20 mb-6 text-gray-700" />
                    <h2 className="text-3xl font-bold text-gray-500">Nenhum Alerta</h2>
                    <p className="mt-2 text-lg text-gray-600">O sistema não detectou nenhum risco elevado que exigisse um alerta.</p>
                </div>
            )}
        </div>
    );
};
