
import React from 'react';
import type { AnalysisHistoryEntry } from '../types';
import { HistoryIcon } from './icons/HistoryIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface AnalysisHistoryProps {
  history: AnalysisHistoryEntry[];
}

const getRiskColorClasses = (classification: 'baixo' | 'medio' | 'alto') => {
  switch (classification) {
    case 'baixo':
      return 'bg-green-500/20 text-green-300 border-green-500';
    case 'medio':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
    case 'alto':
      return 'bg-red-500/20 text-red-300 border-red-500';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500';
  }
};

const getAlertIcon = (classification: 'baixo' | 'medio' | 'alto') => {
  switch (classification) {
    case 'medio':
      return <AlertTriangleIcon className="w-4 h-4 text-yellow-300" />;
    case 'alto':
      return <AlertTriangleIcon className="w-4 h-4 text-red-300" />;
    default:
      return null;
  }
}

export const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ history }) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-700">
      <h3 className="flex items-center text-lg font-semibold text-gray-300 mb-4">
        <HistoryIcon className="w-5 h-5 mr-2 text-cyan-400" />
        Histórico de Análises
      </h3>
      {history.length === 0 ? (
        <p className="text-sm text-center text-gray-500 py-4">Nenhuma análise realizada ainda.</p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {history.map((entry, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
              <div className="text-xs text-gray-400">{entry.timestamp}</div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-white">Score: {entry.score}</span>
                <div className={`flex items-center space-x-2 px-3 py-1 text-xs font-semibold rounded-full border capitalize ${getRiskColorClasses(entry.classification)}`}>
                  {getAlertIcon(entry.classification)}
                  <span>{entry.classification}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};