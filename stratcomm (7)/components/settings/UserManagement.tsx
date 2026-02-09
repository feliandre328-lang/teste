
import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { UserList } from './UserList';
import { UserForm } from './UserForm';
import { PlusIcon, UsersIcon } from '../icons';
import type { User } from '../../types';

export const UserManagement: React.FC = () => {
    const { users, addUser, updateUser, deleteUser } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleOpenModal = (user: User | null = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleSaveUser = (userData: Omit<User, 'id' | 'status'> | User) => {
        if ('id' in userData) {
            updateUser(userData);
        } else {
            addUser(userData);
        }
        handleCloseModal();
    };
    
    const handleDeleteUser = (userId: string) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            deleteUser(userId);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                     <h2 className="text-2xl font-bold text-white flex items-center">
                        <UsersIcon className="w-7 h-7 mr-3" />
                        Gerenciamento de Usuários
                    </h2>
                    <p className="text-gray-400">Adicione, edite ou remova usuários do sistema.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors duration-300 flex items-center space-x-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Adicionar Usuário</span>
                </button>
            </div>
            
            <UserList 
                users={users}
                onEdit={handleOpenModal}
                onDelete={handleDeleteUser}
            />

            <UserForm 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveUser}
                userToEdit={editingUser}
            />
        </div>
    );
};
