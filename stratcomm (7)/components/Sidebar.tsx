
import React, { useState, useEffect, useContext } from 'react';
import { LayoutDashboardIcon } from './icons/LayoutDashboardIcon';
import { DatabaseZapIcon } from './icons/DatabaseZapIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { ShieldAlertIcon } from './icons/ShieldAlertIcon';
import { LandmarkIcon } from './icons/LandmarkIcon';
import { GavelIcon } from './icons/GavelIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { BellRingIcon } from './icons/BellRingIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { FlaskConicalIcon } from './icons/FlaskConicalIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { AppContext } from '../contexts/AppContext';

const menuItems = [
    { id: 'dashboard', name: 'Dashboard Geral', icon: LayoutDashboardIcon, tooltip: 'Visão executiva em tempo real com os principais indicadores de risco.', submenus: [{id: 'dashboard/today', name: 'Visão Hoje'}, {id: 'dashboard/7days', name: 'Últimos 7 dias'}, {id: 'dashboard/monthly', name: 'Comparativo mensal'}] },
    { id: 'capture', name: 'Captura de Dados', icon: DatabaseZapIcon, tooltip: 'Entrada e organização dos comentários de diversas fontes.', submenus: [{id: 'capture/meta', name: 'Meta API'}, {id: 'capture/manual', name: 'Importação Manual'}, {id: 'capture/posts', name: 'Posts Monitorados'}] },
    { id: 'analysis', name: 'Análises IA', icon: BrainCircuitIcon, tooltip: 'Execute análises detalhadas com o poder da IA Gemini.', submenus: [{id: 'analysis/individual', name: 'Análise Individual de Post'}, {id: 'analysis/compare', name: 'Comparar Vários Posts'}, {id: 'analysis/coordinated', name: 'Detecção de Ataque'}] },
    { id: 'risk', name: 'Risco & Crise', icon: ShieldAlertIcon, badgeKey: 'alerts', tooltip: 'Monitoramento profundo de métricas de crise e alertas.', submenus: [{id: 'risk/score', name: 'Score de Crise'}, {id: 'risk/escalation', name: 'Gráfico de Escalada'}, {id: 'risk/autoalerts', name: 'Alertas Automáticos'}] },
    { id: 'context', name: 'Contexto Político', icon: LandmarkIcon, tooltip: 'Banco de dados factual sobre políticos, mandatos e projetos.', submenus: [{id: 'context/politicians', name: 'Políticos'}, {id: 'context/projects', name: 'Projetos e Atuação'}, {id: 'context/timeline', name: 'Linha do Tempo'}] },
    { id: 'election', name: 'Modo Eleição', icon: GavelIcon, tooltip: 'Controle de conformidade legal para período eleitoral.', submenus: [{id: 'election/rules', name: 'Regras Ativas'}, {id: 'election/audit', name: 'Auditoria de Saída da IA'}, {id: 'election/log', name: 'Log de Conformidade'}] },
    { id: 'reports', name: 'Relatórios', icon: FileTextIcon, tooltip: 'Gere e exporte relatórios técnicos e executivos.', submenus: [{id: 'reports/executive', name: 'Relatório Executivo'}, {id: 'reports/technical', name: 'Relatório Técnico'}, {id: 'reports/export', name: 'Exportar PDF'}] },
    { id: 'alerts', name: 'Alertas', icon: BellRingIcon, tooltip: 'Configuração e histórico de alertas automáticos.', submenus: [{id: 'alerts/realtime', name: 'Alertas em Tempo Real'}, {id: 'alerts/threshold', name: 'Configurar Threshold'}, {id: 'alerts/channels', name: 'Canais (Email / Webhook)'}] },
    { id: 'settings', name: 'Configurações', icon: SettingsIcon, tooltip: 'Administração do sistema, usuários e integrações.', submenus: [{id: 'settings/integrations', name: 'Integrações'}, {id: 'settings/params', name: 'Parâmetros de Análise'}, {id: 'settings/users', name: 'Usuários e Permissões'}] },
    { id: 'lab', name: 'Laboratório IA', icon: FlaskConicalIcon, tooltip: 'Teste e melhore prompts e simule cenários de crise.', submenus: [{id: 'lab/prompt', name: 'Testar Prompt'}, {id: 'lab/simulate', name: 'Simular Crise'}, {id: 'lab/quality', name: 'Avaliação de Qualidade'}] },
];

const AlertBadge = ({ count }: { count: number }) => {
    if (count === 0) return null;
    return (
        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {count}
        </span>
    );
};

interface SidebarProps {
    activeView: string;
    onNavigate: (viewId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({ 'analysis': true, 'risk': true });
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));
    const { isElectionModeActive, alerts } = useContext(AppContext);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
        }, 1000 * 60); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const toggleSubmenu = (id: string) => {
        setOpenSubmenus(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <aside className="w-64 bg-gray-900/70 backdrop-blur-lg border-r border-gray-800 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-bold text-white">MENU PRINCIPAL</h2>
                <p className="text-xs text-gray-500">Navegação do Sistema</p>
            </div>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {menuItems.map((item) => {
                    const isParentActive = activeView.startsWith(item.id);
                    return (
                        <div key={item.id}>
                            <a
                                href="#"
                                title={item.tooltip}
                                className={`flex items-center justify-between p-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isParentActive
                                    ? 'bg-cyan-500/10 text-cyan-300'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(item.submenus ? item.submenus[0].id : item.id);
                                    if (item.submenus) toggleSubmenu(item.id);
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                   {item.badgeKey === 'alerts' && <AlertBadge count={alerts.length} />}
                                   {item.submenus && (
                                       <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${openSubmenus[item.id] ? 'rotate-180' : ''}`} />
                                   )}
                                </div>
                            </a>
                            {item.submenus && openSubmenus[item.id] && (
                                <div className="pl-6 pt-2 pb-1 space-y-1">
                                    {item.submenus.map(submenu => (
                                        <a 
                                            href="#" 
                                            key={submenu.id} 
                                            onClick={(e) => { e.preventDefault(); onNavigate(submenu.id); }}
                                            className={`block p-2 text-sm rounded-md transition-colors duration-200 ${
                                                activeView === submenu.id ? 'text-cyan-200 font-semibold' : 'text-gray-500 hover:text-gray-300'
                                            }`}>
                                            - {submenu.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-gray-800 space-y-3">
                 {isElectionModeActive && (
                    <div className="flex items-center justify-between p-2 bg-green-900/50 border border-green-700/50 rounded-lg" title="O sistema está operando com regras de conformidade para período eleitoral.">
                        <div className="flex items-center space-x-2">
                            <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-semibold text-green-300">Modo Eleição Ativo</span>
                        </div>
                    </div>
                 )}
                <div className="text-center text-xs text-gray-600">
                    <p>Última detecção: {currentTime}</p>
                </div>
            </div>
        </aside>
    );
};
