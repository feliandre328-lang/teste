
export interface Metrics {
  total_comentarios: number;
  apoio_percentual: number;
  critica_percentual: number;
  ataque_percentual: number;
  duvida_percentual: number;
  informacao_falsa_percentual: number;
  ironia_percentual?: number; // Optional as it was not in the original JSON but could be added
  nivel_risco_geral: "baixo" | "medio" | "alto";
  crisis_score: number;
}

export interface AnalysisHistoryEntry {
  id: string;
  timestamp: string;
  score: number;
  classification: "baixo" | "medio" | "alto";
  postTheme: string;
  metrics: Metrics;
}

export interface Politico {
  id: string;
  nome: string;
  partido: string;
  cargo: string;
  nivel: "municipal" | "estadual" | "federal";
  cidade?: string;
  historico_resumido: string;
  projetos_relevantes: string[];
  temas_sensiveis: string[];
}

export interface Alert {
  id: string;
  timestamp: string;
  score: number;
  classification: "Alerta" | "Crise" | "Crise Grave";
  postTheme: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst';
  status: 'active' | 'inactive';
}

export interface MonitoredPost {
  id: string;
  platform: 'instagram';
  username: string;
  userAvatarUrl: string;
  postUrl: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  commentCount: number;
  comments: string[];
  analysis?: {
    text: string;
    metrics: Metrics;
  };
  analysisStatus: 'pending' | 'analyzing' | 'completed' | 'error';
}

export interface AnalysisPreset {
  id: string;
  name: string;
  selectedPoliticoId: string | null;
  postTheme: string;
}
