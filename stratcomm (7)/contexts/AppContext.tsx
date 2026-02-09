
import React, { createContext, useState, ReactNode } from 'react';
import type { AnalysisHistoryEntry, Politico, Alert, User, MonitoredPost, Metrics, AnalysisPreset } from '../types';
import { analyzeComments, parseAnalysisResponse } from '../services/geminiService';


// Initial default data for politicians
const initialPoliticians: Politico[] = [
  {
    "id": "pol_001",
    "nome": "João da Silva",
    "partido": "Partido Progressista (PP)",
    "cargo": "Deputado Federal",
    "nivel": "federal",
    "historico_resumido": "Eleito pela primeira vez em 2018, com foco em pautas de segurança pública e agronegócio.",
    "projetos_relevantes": [
      "Lei de Segurança Cibernética (2022)",
      "Incentivos Fiscais para o Agronegócio (2020)"
    ],
    "temas_sensiveis": [
      "Reforma agrária",
      "Discussões sobre porte de armas"
    ]
  },
  {
    "id": "pol_002",
    "nome": "Maria Oliveira",
    "partido": "Partido Social Democrático (PSD)",
    "cargo": "Vereadora de São Paulo",
    "nivel": "municipal",
    "cidade": "São Paulo",
    "historico_resumido": "Ativista social eleita em 2020, com plataforma focada em educação e direitos humanos.",
    "projetos_relevantes": [
      "Programa de Creches em Tempo Integral (2023)",
      "Lei de Transparência de Contratos Públicos (2021)"
    ],
    "temas_sensiveis": [
      "Tarifa de transporte público",
      "Zoneamento urbano"
    ]
  }
];

const initialUsers: User[] = [
    { id: 'user_001', name: 'Admin Geral', email: 'admin@stratcomm.ai', role: 'admin', status: 'active' },
    { id: 'user_002', name: 'Analista Chefe', email: 'analista.chefe@stratcomm.ai', role: 'analyst', status: 'active' },
    { id: 'user_003', name: 'Usuário Inativo', email: 'ex.analista@stratcomm.ai', role: 'analyst', status: 'inactive' },
];

const initialMonitoredPosts: MonitoredPost[] = [
    {
        id: 'post_001',
        platform: 'instagram',
        username: 'joaodasilva.oficial',
        userAvatarUrl: 'https://i.pravatar.cc/150?u=joaodasilva',
        postUrl: '#',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=870&auto=format&fit=crop',
        caption: 'Hoje tivemos uma reunião produtiva sobre o futuro da segurança digital no país. Grandes avanços estão por vir! #SegurançaDigital #Tecnologia',
        timestamp: '2 dias atrás',
        commentCount: 128,
        comments: [
            "Parabéns pela iniciativa, Deputado!",
            "Precisamos de mais segurança online, ótimo trabalho.",
            "E as outras áreas? A saúde precisa de atenção.",
            "Isso vai realmente funcionar ou é só propaganda?",
            "Muito vago, quero ver o projeto de lei completo.",
            "Continue assim, estamos de olho!",
        ],
        analysisStatus: 'pending',
    },
    {
        id: 'post_002',
        platform: 'instagram',
        username: 'mariaoliveira.sp',
        userAvatarUrl: 'https://i.pravatar.cc/150?u=mariaoliveira',
        postUrl: '#',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=871&auto=format&fit=crop',
        caption: 'Visitando a nova creche no bairro Sol Nascente. A educação é a base de tudo e nossa prioridade. #Educação #SP',
        timestamp: '5 dias atrás',
        commentCount: 256,
        comments: [
            "Maravilhosa! As crianças agradecem.",
            "Meu filho estuda aí, ficou incrível!",
            "Promessa de campanha sendo cumprida.",
            "Enquanto isso, meu bairro continua sem creche...",
            "Espero que a qualidade do ensino seja boa.",
            "A estrutura ficou ótima, mas e os professores?",
            "Vereadora, precisamos de mais vagas!",
        ],
        analysisStatus: 'pending',
    }
];


interface ImportedData {
  comments: string;
  postTheme: string;
}

interface AppContextType {
  history: AnalysisHistoryEntry[];
  addHistoryEntry: (entry: AnalysisHistoryEntry) => void;
  politicians: Politico[];
  addPolitician: (politician: Omit<Politico, 'id'>) => void;
  updatePolitician: (politician: Politico) => void;
  deletePolitician: (politicianId: string) => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'status'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  monitoredPosts: MonitoredPost[];
  analyzePost: (postId: string) => Promise<void>;
  updatePostAnalysis: (postId: string, analysis: { text: string; metrics: Metrics } | null, status: MonitoredPost['analysisStatus']) => void;
  importedData: ImportedData | null;
  setImportedData: (data: ImportedData) => void;
  clearImportedData: () => void;
  isElectionModeActive: boolean;
  toggleElectionMode: () => void;
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  presets: AnalysisPreset[];
  addPreset: (preset: Omit<AnalysisPreset, 'id'>) => void;
  deletePreset: (presetId: string) => void;
  isApiConnected: boolean;
  setIsApiConnected: (status: boolean) => void;
  targetProfile: string | null;
  setTargetProfile: (username: string | null) => void;
}

export const AppContext = createContext<AppContextType>({
  history: [],
  addHistoryEntry: () => {},
  politicians: [],
  addPolitician: () => {},
  updatePolitician: () => {},
  deletePolitician: () => {},
  users: [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  monitoredPosts: [],
  analyzePost: async () => {},
  updatePostAnalysis: () => {},
  importedData: null,
  setImportedData: () => {},
  clearImportedData: () => {},
  isElectionModeActive: true,
  toggleElectionMode: () => {},
  alerts: [],
  addAlert: () => {},
  presets: [],
  addPreset: () => {},
  deletePreset: () => {},
  isApiConnected: false,
  setIsApiConnected: () => {},
  targetProfile: null,
  setTargetProfile: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<AnalysisHistoryEntry[]>([]);
  const [politicians, setPoliticians] = useState<Politico[]>(initialPoliticians);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [monitoredPosts, setMonitoredPosts] = useState<MonitoredPost[]>(initialMonitoredPosts);
  const [importedData, setImportedDataState] = useState<ImportedData | null>(null);
  const [isElectionModeActive, setIsElectionModeActive] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [presets, setPresets] = useState<AnalysisPreset[]>([]);
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [targetProfile, setTargetProfile] = useState<string | null>(null);

  const addHistoryEntry = (entry: AnalysisHistoryEntry) => {
    setHistory(prevHistory => [entry, ...prevHistory].slice(0, 50)); // Keep last 50 entries
  };
  
  const addPolitician = (politician: Omit<Politico, 'id'>) => {
    const newPolitician = { ...politician, id: `pol_${new Date().getTime()}` };
    setPoliticians(prev => [...prev, newPolitician]);
  };

  const updatePolitician = (updatedPolitician: Politico) => {
    setPoliticians(prev => prev.map(p => p.id === updatedPolitician.id ? updatedPolitician : p));
  };
  
  const deletePolitician = (politicianId: string) => {
    setPoliticians(prev => prev.filter(p => p.id !== politicianId));
  };

  const addUser = (userData: Omit<User, 'id' | 'status'>) => {
    const newUser: User = { ...userData, id: `user_${new Date().getTime()}`, status: 'active' };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const updatePostAnalysis = (postId: string, analysis: { text: string; metrics: Metrics } | null, status: MonitoredPost['analysisStatus']) => {
    setMonitoredPosts(prev => prev.map(p => p.id === postId ? { ...p, analysis: analysis ?? undefined, analysisStatus: status } : p));
  };

  const analyzePost = async (postId: string) => {
    const post = monitoredPosts.find(p => p.id === postId);
    if (!post) return;

    updatePostAnalysis(postId, null, 'analyzing');

    try {
        const commentsText = post.comments.join('\n');
        const selectedPolitico = politicians.find(p => post.username.includes(p.nome.split(' ')[0].toLowerCase())) || null;

        const responseText = await analyzeComments(commentsText, politicians, selectedPolitico, post.caption, isElectionModeActive);
        const { metrics, analysisText } = parseAnalysisResponse(responseText);

        if (metrics) {
            updatePostAnalysis(postId, { text: analysisText, metrics }, 'completed');
            // Also add to global history
            addHistoryEntry({
              id: `analysis_${new Date().getTime()}`,
              timestamp: new Date().toLocaleString('pt-BR'),
              score: metrics.crisis_score,
              classification: metrics.nivel_risco_geral,
              postTheme: post.caption.substring(0, 50) + '...',
              metrics: metrics,
            });
        } else {
            throw new Error("Failed to parse analysis metrics.");
        }
    } catch (e) {
        console.error("Failed to analyze post:", e);
        updatePostAnalysis(postId, null, 'error');
    }
  };

  const setImportedData = (data: ImportedData) => {
    setImportedDataState(data);
  };
  
  const clearImportedData = () => {
    setImportedDataState(null);
  };

  const toggleElectionMode = () => {
    setIsElectionModeActive(prev => !prev);
  };

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: `alert_${new Date().getTime()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  const addPreset = (presetData: Omit<AnalysisPreset, 'id'>) => {
      const newPreset: AnalysisPreset = {
          ...presetData,
          id: `preset_${new Date().getTime()}`,
      };
      setPresets(prev => [...prev, newPreset]);
  };

  const deletePreset = (presetId: string) => {
      setPresets(prev => prev.filter(p => p.id !== presetId));
  };

  return (
    <AppContext.Provider value={{ 
      history, 
      addHistoryEntry,
      politicians,
      addPolitician,
      updatePolitician,
      deletePolitician,
      users,
      addUser,
      updateUser,
      deleteUser,
      monitoredPosts,
      analyzePost,
      updatePostAnalysis,
      importedData,
      setImportedData,
      clearImportedData,
      isElectionModeActive,
      toggleElectionMode,
      alerts,
      addAlert,
      presets,
      addPreset,
      deletePreset,
      isApiConnected,
      setIsApiConnected,
      targetProfile,
      setTargetProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};
