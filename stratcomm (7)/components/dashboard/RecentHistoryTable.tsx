
import React from 'react';
import type { AnalysisHistoryEntry } from '../../types';
import { HistoryIcon } from '../icons';

const getRiskColorClasses = (classification: 'baixo' | 'medio' | 'alto') => {
  switch (classification) {
    case 'baixo':
      return 'bg-green-500/20 text-green-300';
    case 'medio':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'alto':
      return 'bg-red-500/20 text-red-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
};

interface RecentHistoryTableProps {
    history: AnalysisHistoryEntry[];
}

export const RecentHistoryTable: React.FC<RecentHistoryTableProps> = ({ history }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 h-[400px] flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <HistoryIcon className="w-6 h-6 mr-2 text-cyan-400" />
                Análises Recentes
            </h3>
            <div className="flex-1 overflow-y-auto pr-2">
                {history.length > 0 ? (
                    <table className="w-full text-left text-sm table-fixed">
                        <thead className="sticky top-0 bg-gray-800 z-10">
                            <tr>
                                <th className="p-2 text-gray-400 font-semibold w-2/3">Tema</th>
                                <th className="p-2 text-gray-400 font-semibold w-1/6">Score</th>
                                <th className="p-2 text-gray-400 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {history.map(entry => (
                                <tr key={entry.id} className="hover:bg-gray-700/50">
                                    <td className="p-2 text-gray-300" title={entry.postTheme}>
                                        <div className="font-medium truncate">{entry.postTheme}</div>
                                        <div className="text-xs text-gray-500">{entry.timestamp}</div>
                                    </td>
                                    <td className="p-2 text-gray-200 font-bold">{entry.score}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getRiskColorClasses(entry.classification)}`}>
                                            {entry.classification}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Nenhuma análise recente.</p>
                    </div>
                )}
            </div>
        </div>
    );
};