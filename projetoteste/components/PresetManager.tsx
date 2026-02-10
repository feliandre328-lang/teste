
import React, { useState, useEffect } from 'react';
import type { AnalysisPreset } from '../types';
import { TrashIcon } from './icons';

interface PresetManagerProps {
    presets: AnalysisPreset[];
    currentConfig: {
        selectedPoliticoId: string | null;
        postTheme: string;
    };
    onSave: (name: string) => void;
    onLoad: (preset: AnalysisPreset) => void;
    onDelete: (presetId: string) => void;
}

export const PresetManager: React.FC<PresetManagerProps> = ({ presets, currentConfig, onSave, onLoad, onDelete }) => {
    const [selectedPresetId, setSelectedPresetId] = useState<string>('');

    useEffect(() => {
        // If the current config matches a preset, select it in the dropdown.
        // Otherwise, reset the dropdown to the placeholder.
        const matchingPreset = presets.find(p => 
            p.selectedPoliticoId === currentConfig.selectedPoliticoId && 
            p.postTheme === currentConfig.postTheme
        );
        setSelectedPresetId(matchingPreset ? matchingPreset.id : '');
    }, [currentConfig, presets]);
    
    const handleSaveClick = () => {
        const name = window.prompt("Digite um nome para esta configuração:", "Configuração Padrão");
        if (name && name.trim()) {
            onSave(name.trim());
        }
    };

    const handleLoadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const presetId = e.target.value;
        const presetToLoad = presets.find(p => p.id === presetId);
        if (presetToLoad) {
            onLoad(presetToLoad);
        }
        setSelectedPresetId(presetId);
    };

    const handleDeleteClick = () => {
        if (selectedPresetId && window.confirm("Tem certeza que deseja excluir esta configuração?")) {
            onDelete(selectedPresetId);
            setSelectedPresetId(''); // Reset dropdown
        }
    };

    return (
        <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Configurações Salvas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <select 
                    value={selectedPresetId} 
                    onChange={handleLoadChange} 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500"
                >
                    <option value="">Carregar configuração...</option>
                    {presets.map(preset => (
                        <option key={preset.id} value={preset.id}>{preset.name}</option>
                    ))}
                </select>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={handleSaveClick}
                        className="flex-1 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                        Salvar Atual
                    </button>
                    <button 
                        onClick={handleDeleteClick}
                        disabled={!selectedPresetId}
                        className="p-3 bg-red-800/50 text-red-300 rounded-lg hover:bg-red-700/50 transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
                        title="Excluir configuração selecionada"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
