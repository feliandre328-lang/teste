
import React, { useState, useContext } from 'react';
import { InstagramIcon, LinkIcon, XIcon, UserFocusIcon, ClipboardCopyIcon } from '../icons';
import { LoadingSpinner } from '../LoadingSpinner';
import { AppContext } from '../../contexts/AppContext';

export const ApiIntegration: React.FC = () => {
    const { isApiConnected, setIsApiConnected, setTargetProfile } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [targetUsername, setTargetUsername] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const canConnect = targetUsername.trim() !== '' && sessionId.trim() !== '';

    const handleFetchPosts = () => {
        if (!canConnect) return;
        setIsLoading(true);
        setShowSuccessMessage(false);
        // Simulate API call to fetch posts
        setTimeout(() => {
            setIsApiConnected(true);
            setTargetProfile(targetUsername);
            setIsLoading(false);
            setShowSuccessMessage(true);
        }, 1500);
    };
    
    const handleDisconnect = () => {
        setIsApiConnected(false);
        setTargetProfile(null);
        setTargetUsername('');
        setSessionId('');
        setShowSuccessMessage(false);
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                        <InstagramIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Integração com Instagram (via Sessão)</h2>
                        <p className="text-gray-400">Extraia dados de um perfil alvo usando seu ID de sessão.</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg">
                        <span className="font-medium text-gray-300">Status da Conexão:</span>
                        <div className={`flex items-center space-x-2 px-3 py-1 text-sm font-semibold rounded-full ${isApiConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            <span className={`w-2 h-2 rounded-full ${isApiConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                            <span>{isApiConnected ? 'Conectado' : 'Desconectado'}</span>
                        </div>
                    </div>

                    {!isApiConnected && (
                        <div className="space-y-4">
                            <div className="bg-yellow-900/50 border border-yellow-700/50 text-yellow-300 p-4 rounded-lg text-sm space-y-2">
                                <p><strong>Como obter seu `sessionid` do Instagram:</strong></p>
                                <ol className="list-decimal list-inside text-xs">
                                    <li>Acesse <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="underline">instagram.com</a> no seu navegador (Chrome/Firefox).</li>
                                    <li>Faça login na sua conta.</li>
                                    <li>Abra as Ferramentas de Desenvolvedor (F12 ou Ctrl+Shift+I).</li>
                                    <li>Vá para a aba "Aplicativo" (ou "Application").</li>
                                    <li>No menu à esquerda, em "Armazenamento", expanda "Cookies" e selecione "https://www.instagram.com".</li>
                                    <li>Encontre o cookie chamado `sessionid` e copie o seu valor.</li>
                                </ol>
                                <p className="text-xs mt-2">⚠️ **Nunca compartilhe este valor.** Ele é usado apenas para autenticar sua sessão localmente.</p>
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                                    <UserFocusIcon className="w-4 h-4 mr-2" />
                                    Instagram Username Alvo
                                </label>
                                <input type="text" value={targetUsername} onChange={e => setTargetUsername(e.target.value)} placeholder="Ex: nome_do_perfil" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white" />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                                    <ClipboardCopyIcon className="w-4 h-4 mr-2" />
                                    ID da Sessão (sessionid)
                                </label>
                                <input type="password" value={sessionId} onChange={e => setSessionId(e.target.value)} placeholder="Cole o valor do cookie 'sessionid' aqui" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white" />
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-4">
                                <LoadingSpinner />
                                <p className="mt-2 text-gray-400">Buscando posts...</p>
                            </div>
                        ) : isApiConnected ? (
                             <button
                                onClick={handleDisconnect}
                                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center w-full"
                            >
                                <XIcon className="w-5 h-5 mr-2" />
                                <span>Desconectar e Limpar</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleFetchPosts}
                                disabled={!canConnect}
                                className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-500 transition-colors flex items-center justify-center w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                <LinkIcon className="w-5 h-5 mr-2" />
                                <span>Buscar Posts do Perfil</span>
                            </button>
                        )}
                    </div>
                    
                    {showSuccessMessage && isApiConnected && (
                         <div className="text-center bg-green-900/50 border border-green-700/50 text-green-300 p-4 rounded-lg text-sm">
                             Posts do perfil buscados com sucesso. Navegue para a aba "Posts Monitorados" para selecionar os dados e iniciar uma análise.
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};
