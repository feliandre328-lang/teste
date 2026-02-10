
import React, { useState, useEffect } from 'react';
import type { User } from '../../types';

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (user: Omit<User, 'id'|'status'> | User) => void;
    userToEdit: User | null;
}

const initialFormState: Omit<User, 'id'> = {
    name: '',
    email: '',
    role: 'analyst',
    status: 'active'
};

export const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, onSubmit, userToEdit }) => {
    const [formState, setFormState] = useState(initialFormState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    useEffect(() => {
        if (userToEdit) {
            setFormState(userToEdit);
        } else {
            setFormState(initialFormState);
        }
        setErrors({});
    }, [userToEdit, isOpen]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formState.name.trim()) newErrors.name = "O nome é obrigatório.";
        if (!formState.email.trim()) {
            newErrors.email = "O email é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = "Formato de email inválido.";
        }
        return newErrors;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formState);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl w-full max-w-lg">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-cyan-400">{userToEdit ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-3xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                        <input type="text" name="name" value={formState.name} onChange={handleChange} className={`w-full bg-gray-700 border rounded-md p-2 text-white ${errors.name ? 'border-red-500' : 'border-gray-600'}`} required />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" name="email" value={formState.email} onChange={handleChange} className={`w-full bg-gray-700 border rounded-md p-2 text-white ${errors.email ? 'border-red-500' : 'border-gray-600'}`} required />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Função</label>
                        <select name="role" value={formState.role} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white capitalize">
                            <option value="analyst">Analyst</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                     {userToEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                            <select name="status" value={formState.status} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white capitalize">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    )}
                     <div className="pt-4 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
