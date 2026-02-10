
import React from 'react';
import type { User } from '../../types';
import { PencilIcon, TrashIcon } from '../icons';
import { UserAvatar } from './UserAvatar';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const RoleBadge: React.FC<{ role: User['role'] }> = ({ role }) => {
    const roleClasses = role === 'admin'
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'bg-gray-600/50 text-gray-300';
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleClasses}`}>{role}</span>;
};

const StatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
    const statusClasses = status === 'active'
        ? 'bg-green-500/20 text-green-300'
        : 'bg-red-500/20 text-red-300';
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusClasses}`}>{status}</span>;
};


export const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-800 text-xs text-gray-400 uppercase">
                        <tr>
                            <th className="px-6 py-3">Usuário</th>
                            <th className="px-6 py-3">Função</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.length > 0 ? users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <UserAvatar name={user.name} />
                                        <div>
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={user.status} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => onEdit(user)} className="text-cyan-400 hover:text-cyan-300 mr-4" title="Editar">
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-400" title="Excluir">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-500">
                                    Nenhum usuário cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
