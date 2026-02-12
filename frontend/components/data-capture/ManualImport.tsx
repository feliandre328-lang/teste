
import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { LinkIcon, ClipboardCopyIcon, MessageSquareIcon } from '../icons';

interface ManualImportProps {
    onNavigate: (viewId: string) => void;
}

export const ManualImport: React.FC<ManualImportProps> = ({ onNavigate }) => {
    const { setImportedData } = useContext(AppContext);
    const [postUrl, setPostUrl] = useState('');
    const [postCaption, setPostCaption] = useState('');
    const [comments, setComments] = useState('');
    const [errors, setErrors] = useState<{ postUrl?: string; comments?: string; }>({});

    const handleSubmit = () => {
        const newErrors: { postUrl?: string; comments?: string } = {};
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        // Validate URL if it's not empty
        if (postUrl.trim() && !urlRegex.test(postUrl)) {
            newErrors.postUrl = 'Por favor, insira uma URL válida (ex: https://site.com).';
        }

        // Validate comments
        if (!comments.trim()) {
            newErrors.comments = 'O campo de comentários é obrigatório.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setErrors({});

        // Use caption as post theme if available, otherwise use URL
        const theme = postCaption.trim() || postUrl.trim() || 'Importação Manual';

        setImportedData({
            comments: comments,
            postTheme: theme,
        });

        onNavigate('analysis/individual');
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 max-w-3xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <ClipboardCopyIcon className="w-7 h-7 mr-3 text-cyan-400" />
                    Importar Dados do Instagram Manualmente
                </h2>
                <p className="text-gray-400">Cole as informações do post que você deseja analisar.</p>
            </div>

            <div>
                <label htmlFor="post-url" className="flex items-center text-lg font-semibold text-gray-300 mb-2">
                    <LinkIcon className="w-5 h-5 mr-2" />
                    URL do Post (Opcional)
                </label>
                <input
                    id="post-url"
                    type="url"
                    className={`w-full bg-gray-700 border rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 ${errors.postUrl ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
                    placeholder="https://www.instagram.com/p/C..."
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                />
                {errors.postUrl && <p className="text-red-400 text-sm mt-1">{errors.postUrl}</p>}
            </div>
            
            <div>
                <label htmlFor="post-caption" className="flex items-center text-lg font-semibold text-gray-300 mb-2">
                    <MessageSquareIcon className="w-5 h-5 mr-2" />
                    Legenda do Post (Opcional)
                </label>
                <textarea
                    id="post-caption"
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                    placeholder="Cole a legenda do post aqui para fornecer mais contexto à IA..."
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="comments-import" className="block text-lg font-semibold text-gray-300 mb-2">
                    Comentários (Obrigatório)
                </label>
                <textarea
                    id="comments-import"
                    rows={10}
                    className={`w-full bg-gray-900 border rounded-lg p-3 text-gray-200 focus:ring-2 resize-none ${errors.comments ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'}`}
                    placeholder="Cole os comentários aqui, um por linha..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                {errors.comments && <p className="text-red-400 text-sm mt-1">{errors.comments}</p>}
            </div>
            
            <button
                onClick={handleSubmit}
                className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 transition-colors duration-300 disabled:bg-gray-600"
                disabled={!comments.trim()}
            >
                Analisar Post
            </button>
        </div>
    );
};
