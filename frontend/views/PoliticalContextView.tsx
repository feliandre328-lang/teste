
import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { PoliticianList } from '../components/political-context/PoliticianList';
import { PoliticianForm } from '../components/political-context/PoliticianForm';
import { PlusIcon, LandmarkIcon } from '../components/icons';
import type { Politico } from '../types';

export const PoliticalContextView: React.FC = () => {
    const { politicians, addPolitician, updatePolitician, deletePolitician } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPolitician, setEditingPolitician] = useState<Politico | null>(null);

    const handleOpenModal = (politician: Politico | null = null) => {
        setEditingPolitician(politician);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPolitician(null);
    };

    const handleSavePolitician = (politicianData: Omit<Politico, 'id'> | Politico) => {
        if ('id' in politicianData) {
            updatePolitician(politicianData);
        } else {
            addPolitician(politicianData);
        }
        handleCloseModal();
    };
    
    const handleDeletePolitician = (politicianId: string) => {
        if (window.confirm("Tem certeza que deseja excluir este perfil?")) {
            deletePolitician(politicianId);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        <LandmarkIcon className="w-8 h-8 mr-3 text-cyan-400" />
                        Contexto Político
                    </h1>
                    <p className="text-gray-400">Gerencie a base de dados de perfis políticos.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors duration-300 flex items-center space-x-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Adicionar Perfil</span>
                </button>
            </div>
            
            <PoliticianList 
                politicians={politicians}
                onEdit={handleOpenModal}
                onDelete={handleDeletePolitician}
            />

            <PoliticianForm 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSavePolitician}
                politicianToEdit={editingPolitician}
            />
        </div>
    );
};
