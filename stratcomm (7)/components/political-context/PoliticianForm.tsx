import React, { useState, useEffect, useMemo } from 'react';
import type { Politico } from '../../types';

interface PoliticianFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (politician: Omit<Politico, 'id'> | Politico) => void;
    politicianToEdit: Politico | null;
}

// Correct: Define an initial state with strings for fields that will be edited as text.
// This avoids type inconsistencies.
const initialFormState = {
    nome: '',
    partido: '',
    cargo: '',
    // Fix: Widen the type of 'nivel' to match the `Politico` type, preventing a type error when editing.
    nivel: 'municipal' as Politico['nivel'],
    cidade: '',
    historico_resumido: '',
    projetos_relevantes: '',
    temas_sensiveis: '',
};

export const PoliticianForm: React.FC<PoliticianFormProps> = ({ isOpen, onClose, onSubmit, politicianToEdit }) => {
    // The state will hold the form data, plus an optional ID if editing.
    const [formState, setFormState] = useState(initialFormState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (politicianToEdit) {
            // Convert arrays from the data model to comma-separated strings for the form input.
            // Fix: Ensure 'cidade' is a string to match the form state's type, as it's optional in the Politico type.
            setFormState({
                ...politicianToEdit,
                cidade: politicianToEdit.cidade ?? '',
                projetos_relevantes: politicianToEdit.projetos_relevantes.join(', '),
                temas_sensiveis: politicianToEdit.temas_sensiveis.join(', '),
            });
        } else {
            // For a new politician, use the clean initial state.
            setFormState(initialFormState);
        }
        setErrors({}); // Clear errors when modal opens or politician changes
    }, [politicianToEdit, isOpen]);

    // UseMemo for validation depends on formState, which now has consistent types.
    const validateForm = useMemo(() => {
        const newErrors: { [key: string]: string } = {};
        if (!formState.nome.trim()) newErrors.nome = "O nome é obrigatório.";
        if (!formState.partido.trim()) newErrors.partido = "O partido é obrigatório.";
        if (!formState.cargo.trim()) newErrors.cargo = "O cargo é obrigatório.";
        if (formState.historico_resumido.length > 500) newErrors.historico_resumido = "O histórico não pode exceder 500 caracteres.";
        // Correct: No type casting needed as the fields are always strings.
        if (formState.projetos_relevantes.length > 500) newErrors.projetos_relevantes = "O campo de projetos não pode exceder 500 caracteres.";
        if (formState.temas_sensiveis.length > 500) newErrors.temas_sensiveis = "O campo de temas não pode exceder 500 caracteres.";
        return newErrors;
    }, [formState]);

    const isFormValid = Object.keys(validateForm).length === 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         setErrors(validateForm);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalErrors = validateForm;
        setErrors(finalErrors);
        
        if (Object.keys(finalErrors).length > 0) {
            return;
        }

        // Correct: Safely convert comma-separated strings back to arrays.
        // The properties are guaranteed to be strings.
        const finalData = {
            ...formState,
            projetos_relevantes: formState.projetos_relevantes.split(',').map(item => item.trim()).filter(Boolean),
            temas_sensiveis: formState.temas_sensiveis.split(',').map(item => item.trim()).filter(Boolean),
        };
        onSubmit(finalData);
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-cyan-400">{politicianToEdit ? 'Editar Perfil' : 'Adicionar Novo Perfil'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-300">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                            <input type="text" name="nome" value={formState.nome} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border rounded-md p-2 text-white transition-colors ${errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`} required />
                            {errors.nome && <p className="text-red-400 text-sm mt-1">{errors.nome}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Partido</label>
                            <input type="text" name="partido" value={formState.partido} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border rounded-md p-2 text-white transition-colors ${errors.partido ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`} required />
                            {errors.partido && <p className="text-red-400 text-sm mt-1">{errors.partido}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Cargo</label>
                            <input type="text" name="cargo" value={formState.cargo} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border rounded-md p-2 text-white transition-colors ${errors.cargo ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`} required />
                            {errors.cargo && <p className="text-red-400 text-sm mt-1">{errors.cargo}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nível</label>
                            <select name="nivel" value={formState.nivel} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white">
                                <option value="municipal">Municipal</option>
                                <option value="estadual">Estadual</option>
                                <option value="federal">Federal</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Histórico Resumido</label>
                        <textarea name="historico_resumido" value={formState.historico_resumido} onChange={handleChange} onBlur={handleBlur} rows={3} className={`w-full bg-gray-700 border rounded-md p-2 text-white transition-colors ${errors.historico_resumido ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`}></textarea>
                        {errors.historico_resumido && <p className="text-red-400 text-sm mt-1">{errors.historico_resumido}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Projetos Relevantes (separados por vírgula)</label>
                        <input type="text" name="projetos_relevantes" value={formState.projetos_relevantes} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border rounded-md p-2 text-white transition-colors ${errors.projetos_relevantes ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`} />
                        {errors.projetos_relevantes && <p className="text-red-400 text-sm mt-1">{errors.projetos_relevantes}</p>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Temas Sensíveis (separados por vírgula)</label>
                        <input type="text" name="temas_sensiveis" value={formState.temas_sensiveis} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border rounded-md p-2 text-white transition-colors ${errors.temas_sensiveis ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`} />
                        {errors.temas_sensiveis && <p className="text-red-400 text-sm mt-1">{errors.temas_sensiveis}</p>}
                    </div>

                </form>
                <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Cancelar</button>
                    <button type="submit" onClick={handleSubmit} disabled={!isFormValid} className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">Salvar</button>
                </div>
            </div>
        </div>
    );
};
