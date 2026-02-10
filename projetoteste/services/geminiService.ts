
import { GoogleGenAI } from "@google/genai";
import type { Metrics, Politico, AnalysisHistoryEntry } from '../types';

// Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines.
// The API key is assumed to be pre-configured and valid in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPT_TEMPLATE = `
Você é uma IA especializada em análise técnica de comunicação pública, reputação institucional e gestão de risco social.

⚠️ REGRAS ABSOLUTAS:
- Não faça propaganda política.
- Não influencie voto.
- Não utilize linguagem persuasiva ou de campanha.
- Atue exclusivamente como analista técnico, neutro e informativo.
{{ELECTION_MODE_INSTRUCTION}}

---
### 📥 DADOS DE ENTRADA:

Você está analisando o seguinte conjunto de dados para detectar riscos de crise de imagem, desinformação, ataques coordenados ou insatisfação social.

\`\`\`json
{{INPUT_JSON}}
\`\`\`

---
### 📊 TAREFAS DE ANÁLISE:

Execute uma análise completa e estruturada, seguindo CADA um dos pontos abaixo, baseada nos dados de entrada.

1.  **SCORE DE RISCO:** Calcule um score de 0 a 100 com base na gravidade, volume e potencial de viralização dos comentários, cruzados com os temas sensíveis do político (se fornecido no contexto).
2.  **CLASSIFICAÇÃO:** Com base no score, classifique o risco:
    - 0–20 → Seguro
    - 21–40 → Atenção
    - 41–60 → Alerta
    - 61–80 → Crise
    - 81–100 → Crise Grave
3.  **TIPO DE RISCO:** Identifique e liste os tipos de risco presentes (múltiplos são possíveis): Reputacional, Jurídico, Eleitoral, Ético, Fake news, Mobilização negativa, Ataque coordenado.
4.  **PADRÕES:** Analise o conteúdo coletivo para identificar padrões, como narrativas organizadas, palavras-gatilho e emoções predominantes (sentimento geral: positivo, neutro, negativo).
5.  **ANÁLISE TÉCNICA:** Forneça um parágrafo conciso explicando o que está acontecendo, por que representa um risco e a gravidade real da situação.
6.  **RECOMENDAÇÕES:** Liste 2-3 recomendações estratégicas claras e acionáveis para a equipe de comunicação.
7.  **SUGESTÃO DE RESPOSTA:** Se apropriado, sugira um texto para resposta institucional. Se não, recomende "Silêncio estratégico". A resposta deve ser SEMPRE neutra, informativa e não-confrontacional.
8.  **MÉTRICAS JSON:** Preencha o bloco JSON com as métricas quantitativas da análise. O campo "nivel_risco_geral" deve ser "baixo" (score 0-40), "medio" (score 41-60) ou "alto" (score 61-100) para compatibilidade com a interface.

---
### 📤 ESTRUTURA DE SAÍDA OBRIGATÓRIA:

Responda EXATAMENTE no formato abaixo, sem adicionar nenhuma outra seção.

### AVALIAÇÃO DE RISCO ESTRATÉGICO
**SCORE DE RISCO:** [Score de 0 a 100]
**CLASSIFICAÇÃO:** [Seguro | Atenção | Alerta | Crise | Crise Grave]
**TIPO DE RISCO:**
- [Tipo 1]
- [Tipo 2]

**PADRÕES IDENTIFICADOS:**
- **Narrativas Principais:** [Descrição]
- **Palavras-Chave:** [Lista de palavras]
- **Emoção Predominante:** [Sentimento geral]

**ANÁLISE TÉCNICA:**
[Análise detalhada sobre o que está acontecendo, por que é um risco e a gravidade.]

**RECOMENDAÇÕES ESTRATÉGICAS:**
- [Item 1]
- [Item 2]

**SUGESTÃO DE RESPOSTA INSTITUCIONAL:**
[Texto da resposta sugerida ou "Silêncio estratégico recomendado."]

### MÉTRICAS PARA GRÁFICOS (JSON)
\`\`\`json
{
  "total_comentarios": 0,
  "apoio_percentual": 0,
  "critica_percentual": 0,
  "ataque_percentual": 0,
  "duvida_percentual": 0,
  "ironia_percentual": 0,
  "informacao_falsa_percentual": 0,
  "nivel_risco_geral": "[baixo, medio ou alto]",
  "crisis_score": 0
}
\`\`\`
`;

const REPORT_PROMPT_TEMPLATE = `
Você é um consultor sênior de comunicação estratégica e análise de risco. Sua tarefa é analisar uma série de avaliações de risco de comunicação (geradas anteriormente por uma IA) e sintetizar um relatório consolidado.

###  AUDIÊNCIA DO RELATÓRIO: {{REPORT_TYPE}}

- **Se o tipo for "Executivo":** Foque em insights estratégicos, tendências gerais, principais riscos e recomendações de alto nível. Use linguagem clara, concisa e orientada a decisões. Evite jargão técnico. O público são diretores e gestores.
- **Se o tipo for "Técnico":** Forneça uma análise detalhada dos padrões, sentimentos, temas recorrentes e tipos de risco observados. Inclua recomendações táticas específicas para a equipe de comunicação. O público são analistas de comunicação e mídias sociais.

### 📥 DADOS DE ENTRADA (HISTÓRICO DE ANÁLISES):

\`\`\`json
{{INPUT_JSON}}
\`\`\`

### 📊 TAREFAS DE GERAÇÃO DE RELATÓRIO:

Com base nos dados fornecidos, gere um relatório coerente e bem estruturado.

1.  **Sumário (Executivo ou Técnico):** Crie um parágrafo inicial que resuma a situação geral de comunicação no período analisado.
2.  **Análise de Tendências:** Descreva a evolução do "Score de Crise" ao longo do tempo. A situação está melhorando, piorando ou estável? Houve picos de risco? Se sim, associados a quais temas de post?
3.  **Principais Riscos Identificados:** Agrupe os temas de post que geraram os maiores scores de risco. Quais foram os assuntos mais sensíveis ou que geraram mais reações negativas?
4.  **Análise de Sentimento Consolidada:** Calcule ou estime o sentimento geral agregado (positivo, negativo, misto) com base nas métricas de todas as análises.
5.  **Recomendações Estratégicas (para Executivos) ou Táticas (para Técnicos):** Com base em toda a análise, forneça de 2 a 3 recomendações acionáveis e alinhadas com o público do relatório.
6.  **Conclusão:** Finalize com um breve parágrafo sobre o cenário atual e os próximos passos sugeridos.

---
### 📤 ESTRUTURA DE SAÍDA OBRIGATÓRIA:

Responda EXATAMENTE no formato abaixo, usando Markdown.

### RELATÓRIO DE ANÁLISE DE COMUNICAÇÃO - {{REPORT_TYPE}}
**Período Analisado:** {{DATE_RANGE}}

**1. SUMÁRIO {{REPORT_TYPE_TITLE_CASE}}**
[Seu parágrafo de resumo aqui.]

**2. TENDÊNCIA DO SCORE DE RISCO**
[Sua análise sobre a evolução do score de risco.]

**3. PRINCIPAIS FOCOS DE RISCO**
- **Tema:** "[Tema do post com maior risco]" (Score: [score])
- **Tema:** "[Segundo tema com maior risco]" (Score: [score])
- [etc.]

**4. SENTIMENTO GERAL NO PERÍODO**
[Sua análise consolidada do sentimento.]

**5. RECOMENDAÇÕES**
- **Recomendação 1:** [Descrição da recomendação]
- **Recomendação 2:** [Descrição da recomendação]

**6. CONCLUSÃO**
[Seu parágrafo de conclusão.]
`;

export const analyzeComments = async (
  comments: string, 
  allPoliticos: Politico[], 
  selectedPolitico: Politico | null,
  postTheme: string,
  isElectionModeActive: boolean,
): Promise<string> => {
  
  const commentsArray = comments.split('\n').filter(c => c.trim() !== '');

  const politicoContext = selectedPolitico ? {
    nome: selectedPolitico.nome,
    partido: selectedPolitico.partido,
    cargo: selectedPolitico.cargo,
    historico: selectedPolitico.historico_resumido,
    temas_sensiveis: selectedPolitico.temas_sensiveis,
  } : {
    nome: "Análise Geral",
    partido: "N/A",
    cargo: "N/A",
    historico: "Análise geral sem foco em um político específico. O contexto de todos os políticos cadastrados é fornecido para referência.",
    temas_sensiveis: [],
  };

  const inputData = {
    modo_eleicao: isElectionModeActive,
    politico_analisado: politicoContext,
    post: {
      id: `post_${new Date().getTime()}`,
      tema: postTheme || "Não especificado",
      comentarios: commentsArray
    },
    contexto_geral_politicos_cadastrados: allPoliticos,
  };
  
  const electionModeInstruction = isElectionModeActive 
    ? '- Todo o conteúdo deve ser legalmente seguro para uso em período eleitoral (MODO ELEIÇÃO ATIVADO).'
    : '- A análise não precisa seguir as restrições de período eleitoral (MODO ELEIÇÃO DESATIVADO).';

  const finalPrompt = PROMPT_TEMPLATE
    .replace('{{ELECTION_MODE_INSTRUCTION}}', electionModeInstruction)
    .replace('{{INPUT_JSON}}', JSON.stringify(inputData, null, 2));
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: finalPrompt
    });
    // Fix: The `response.text` property can be undefined. Return an empty string to satisfy the function's return type.
    return response.text ?? '';
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};


export const parseAnalysisResponse = (responseText: string): { metrics: Metrics | null; analysisText: string } => {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = responseText.match(jsonRegex);

  if (match && match[1]) {
    try {
      const metrics = JSON.parse(match[1]);
      // Remove the JSON block for clean text display
      const analysisText = responseText.replace(jsonRegex, '').trim();
      return { metrics, analysisText };
    } catch (e) {
      console.error("Failed to parse metrics JSON:", e);
      // Return full text on parse error so user can still see it
      return { metrics: null, analysisText: responseText };
    }
  }

  // If no JSON block is found, return the full text
  return { metrics: null, analysisText: responseText };
};

export const testCustomPrompt = async (prompt: string, data: string): Promise<string> => {
  const fullPrompt = `${prompt}\n\nDADOS PARA ANÁLISE:\n\`\`\`\n${data}\n\`\`\``;
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: fullPrompt
    });
    return response.text ?? 'Nenhuma resposta recebida do modelo.';
  } catch (error) {
    console.error("Error calling Gemini API with custom prompt:", error);
    throw new Error("Falha ao executar o prompt customizado.");
  }
};

export const generateReport = async (
  history: AnalysisHistoryEntry[],
  reportType: 'executive' | 'technical',
  dateRange: '24h' | '7d' | '30d'
): Promise<string> => {
  
  const reportTypeDisplay = reportType === 'executive' ? 'Executivo' : 'Técnico';
  let dateRangeDisplay = '';
  switch(dateRange) {
    case '24h': dateRangeDisplay = 'Últimas 24 Horas'; break;
    case '7d': dateRangeDisplay = 'Últimos 7 Dias'; break;
    case '30d': dateRangeDisplay = 'Últimos 30 Dias'; break;
  }
  
  const finalPrompt = REPORT_PROMPT_TEMPLATE
    .replace(/{{REPORT_TYPE}}/g, reportTypeDisplay)
    .replace(/{{REPORT_TYPE_TITLE_CASE}}/g, reportTypeDisplay.toUpperCase())
    .replace(/{{DATE_RANGE}}/g, dateRangeDisplay)
    .replace('{{INPUT_JSON}}', JSON.stringify(history, null, 2));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: finalPrompt,
    });
    return response.text ?? 'Não foi possível gerar o relatório.';
  } catch (error) {
    console.error("Error calling Gemini API for report generation:", error);
    throw new Error("Falha ao gerar o relatório com a IA.");
  }
};
