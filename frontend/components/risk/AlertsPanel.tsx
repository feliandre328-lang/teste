
import React from 'react';
import { AlertTriangleIcon, BellRingIcon } from '../icons';
import type { Alert } from '../../types';

interface AlertsPanelProps {
    alerts: Alert[];
}

const getRiskColorClasses = (classification: "Alerta" | "Crise" | "Crise Grave") => {
  switch (classification) {
    case 'Alerta':
      return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
    case 'Crise':
      return 'bg-red-500/20 text-red-300 border-red-500/50';
    case 'Crise Grave':
      return 'bg-red-700/30 text-red-200 border-red-600/50';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  }
};


export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 h-full min-h-[400px] flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BellRingIcon className="w-6 h-6 mr-2 text-cyan-400" />
                Alertas Gerados
            </h3>
            <div className="flex-1 overflow-y-auto pr-2">
                {alerts.length > 0 ? (
                    <ul className="space-y-4">
                       {alerts.map(alert => (
                           <li key={alert.id} className={`p-4 rounded-lg border-l-4 ${getRiskColorClasses(alert.classification)}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-lg flex items-center"><AlertTriangleIcon className="w-5 h-5 mr-2" />{alert.classification}</span>
                                    <span className="font-bold text-xl">{alert.score}</span>
                                </div>
                                <p className="text-sm text-gray-300 truncate" title={alert.postTheme}>
                                    Origem: {alert.postTheme}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                           </li>
                       ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
                        <BellRingIcon className="w-16 h-16 mb-6" />
                        <p>Nenhum alerta gerado.</p>
                        <p className="text-sm">Alertas automáticos aparecerão aqui quando o score de risco for elevado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
