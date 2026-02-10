
import React from 'react';
import type { Politico } from '../../types';
import { PencilIcon, TrashIcon } from '../icons';

interface PoliticianListProps {
    politicians: Politico[];
    onEdit: (politician: Politico) => void;
    onDelete: (politicianId: string) => void;
}

export const PoliticianList: React.FC<PoliticianListProps> = ({ politicians, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-800 text-xs text-gray-400 uppercase">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Partido</th>
                            <th className="px-6 py-3">Cargo</th>
                            <th className="px-6 py-3">Nível</th>
                            <th className="px-6 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {politicians.length > 0 ? politicians.map(p => (
                            <tr key={p.id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium text-white">{p.nome}</td>
                                <td className="px-6 py-4 text-gray-300">{p.partido}</td>
                                <td className="px-6 py-4 text-gray-300">{p.cargo}</td>
                                <td className="px-6 py-4 text-gray-300 capitalize">{p.nivel}</td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => onEdit(p)} className="text-cyan-400 hover:text-cyan-300 mr-4" title="Editar">
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(p.id)} className="text-red-500 hover:text-red-400" title="Excluir">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    Nenhum perfil político cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
