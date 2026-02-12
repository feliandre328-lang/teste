
import React, { useState } from 'react';
import { InstagramIcon, XIcon, YoutubeIcon, TiktokIcon, GoogleIcon, WebhookIcon } from '../icons';

const integrationData = [
    { id: 'instagram', name: 'Meta (Instagram)', icon: InstagramIcon, description: 'Capture comentários de posts e menções automaticamente.', connected: true },
    { id: 'x', name: 'X (Twitter)', icon: XIcon, description: 'Monitore tweets, menções e hashtags em tempo real.', connected: false },
    { id: 'youtube', name: 'YouTube', icon: YoutubeIcon, description: 'Analise comentários e tendências em vídeos.', connected: false },
    { id: 'tiktok', name: 'TikTok', icon: TiktokIcon, description: 'Acompanhe a repercussão e os comentários em vídeos.', connected: false },
    { id: 'google_alerts', name: 'Google Alerts', icon: GoogleIcon, description: 'Receba e analise notícias e menções da web.', connected: false },
    { id: 'webhook', name: 'Webhook Genérico', icon: WebhookIcon, description: 'Envie dados de qualquer fonte para análise via webhook.', connected: false },
];

interface IntegrationCardProps {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
    connected: boolean;
    onToggle: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ id, name, icon: Icon, description, connected, onToggle }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = () => {
        setIsLoading(true);
        setTimeout(() => {
            onToggle(id);
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <Icon className="w-10 h-10 text-gray-300" />
                    <div className={`flex items-center space-x-2 px-3 py-1 text-xs font-semibold rounded-full ${connected ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/50 text-gray-400'}`}>
                        <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                        <span>{connected ? 'Conectado' : 'Desconectado'}</span>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-white">{name}</h3>
                <p className="text-sm text-gray-400 mt-1">{description}</p>
            </div>
            <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`w-full mt-6 py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
                    connected 
                        ? 'bg-gray-700 hover:bg-red-800/50 text-gray-300 hover:text-red-300' 
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
            >
                {isLoading ? 'Processando...' : (connected ? 'Gerenciar' : 'Conectar')}
            </button>
        </div>
    );
};

export const Integrations: React.FC = () => {
    const [integrations, setIntegrations] = useState(integrationData);

    const handleToggleIntegration = (id: string) => {
        setIntegrations(prev => 
            prev.map(int => int.id === id ? { ...int, connected: !int.connected } : int)
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map(integration => (
                <IntegrationCard 
                    key={integration.id}
                    {...integration}
                    onToggle={handleToggleIntegration}
                />
            ))}
        </div>
    );
};
