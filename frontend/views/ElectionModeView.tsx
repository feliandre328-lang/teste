
import React from 'react';
import { GavelIcon } from '../components/icons';

// A helper component to render list items with custom icons (check/cross)
const RuleListItem: React.FC<{ type: 'allowed' | 'forbidden'; children: React.ReactNode }> = ({ type, children }) => {
    const isAllowed = type === 'allowed';
    return (
        <li className="flex items-start space-x-3">
            <span className={`text-xl ${isAllowed ? 'text-green-400' : 'text-red-400'}`}>
                {isAllowed ? '✔' : '❌'}
            </span>
            <span className="text-gray-300">{children}</span>
        </li>
    );
};

// A helper for section titles
const SectionTitle: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        {text}
    </h2>
);

export const ElectionModeView: React.FC = () => {
    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <GavelIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Guia de Conformidade do Modo Eleição
                </h1>
                <p className="text-gray-400 mt-1">Diretrizes essenciais para atuação em períodos eleitorais, com foco em 2026.</p>
            </div>

            {/* Section 1: Períodos de atuação política */}
            <section>
                <SectionTitle icon="🗳️" text="1. Períodos de atuação política" />
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">🟢 Pré-campanha</h3>
                    <p className="text-gray-300">A propaganda eleitoral oficial só começa em <span className="font-bold text-white">16 de agosto de 2026</span>. Antes disso, é o período de pré-campanha.</p>
                    <p className="text-gray-300">Antes de 16/08/2026 é <span className="font-bold text-red-400">proibido pedir voto explícito</span> ou com intenção clara de captar votos.</p>
                    <p className="text-gray-300 font-semibold mt-4">É permitido, nessa fase:</p>
                    <ul className="space-y-2">
                        <RuleListItem type="allowed">comentar sobre ideias pessoais, propostas e posicionamentos políticos;</RuleListItem>
                        <RuleListItem type="allowed">participar de debates e entrevistas;</RuleListItem>
                        <RuleListItem type="forbidden">não é permitido pedir voto ou usar elementos tipicamente eleitorais (não use frases tipo “vote em mim”).</RuleListItem>
                    </ul>
                </div>
            </section>

            {/* Section 2: Regras de propaganda */}
            <section>
                 <SectionTitle icon="📅" text="2. Regras de propaganda eleitoral – o que vale" />
                 <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white">🔹 Quando começa oficialmente</h3>
                        <p className="text-gray-300">Propaganda eleitoral permitida a partir de <span className="font-bold">16 de agosto de 2026.</span></p>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white">🔹 Na TV e rádio</h3>
                        <p className="text-gray-300">Proibido propaganda paga em rádio e TV fora do período eleitoral. Na campanha, existem restrições específicas para horário eleitoral.</p>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white">🔹 Na internet e redes sociais</h3>
                        <p className="text-gray-400 mb-4">As regras gerais hoje são estas — e deverão vigorar também em 2026, com possíveis ajustes nas novas resoluções:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-green-400 mb-2">✅ O que é permitido</h4>
                                <ul className="space-y-2 text-sm">
                                    <RuleListItem type="allowed">Criar e usar páginas, blogs, sites e perfis oficiais para divulgar conteúdo eleitoral;</RuleListItem>
                                    <RuleListItem type="allowed">Usar redes sociais (Instagram, TikTok, Facebook, X etc.) desde que seja conta oficial da campanha, partido, coligação ou federação;</RuleListItem>
                                    <RuleListItem type="allowed">Enviar conteúdo político por mensagem se estiver autorizado pela legislação de proteção de dados;</RuleListItem>
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-semibold text-red-400 mb-2">🚫 O que é proibido</h4>
                                 <ul className="space-y-2 text-sm">
                                    <RuleListItem type="forbidden">Impulsionamento pago por pessoas naturais/terceiros (sem contrato direto com a campanha) – isso continua restrito;</RuleListItem>
                                    <RuleListItem type="forbidden">Propaganda paga na internet fora do período eleitoral;</RuleListItem>
                                    <RuleListItem type="forbidden">Veiculação de propaganda antes de 16/08/2026 com pedido explícito de votos;</RuleListItem>
                                    <RuleListItem type="forbidden">Publicar conteúdo sem informar o endereço eletrônico à Justiça Eleitoral (sites e perfis devem estar registrados) – a falta dessa comunicação pode gerar multa.</RuleListItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>
            
            {/* Section 3: IA */}
            <section>
                <SectionTitle icon="🤖" text="3. Inteligência Artificial (IA) e desinformação" />
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
                    <p className="text-gray-400">Novas regras que estão sendo construídas, e que devem impactar diretamente as campanhas no ambiente digital em 2026, incluem:</p>
                    <div>
                        <h3 className="text-lg font-semibold text-white">🧠 IA nas eleições</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
                           <li>Uso de <span className="font-bold">deepfakes</span> ou conteúdos fraudulentos por IA é proibido e candidatos/campanhas podem responder por isso.</li>
                           <li>Conteúdos gerados por IA devem ter <span className="font-bold">aviso claro</span> quando utilizados.</li>
                           <li>Robôs e chatbots que simulam interação com eleitor podem ser restritos ou proibidos.</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white">🛑 Desinformação</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
                            <li>A Justiça Eleitoral e as plataformas terão maior atuação para identificar e remover conteúdos falsos ou manipulados que afetem a escolha dos eleitores.</li>
                            <li>Plataformas podem ser responsabilizadas por não retirar conteúdos irregulares rapidamente.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 4: Condutas proibidas */}
             <section>
                <SectionTitle icon="🚫" text="4. Condutas proibidas em geral" />
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-2">
                     <p className="text-gray-300 mb-2">Durante a campanha eleitoral, é vedado:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                           <li>Oferecer dinheiro, brindes, vantagens ou benefícios em troca de votos;</li>
                           <li>Veicular propaganda que incite violência, ódio ou discriminação de qualquer tipo;</li>
                           <li>Fazer divulgação de propaganda perto de seções eleitorais fora das hipóteses legais;</li>
                      </ul>
                </div>
            </section>

            {/* Section 5: Consequências */}
            <section>
                <SectionTitle icon="📌" text="5. Consequências e fiscalização" />
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-2">
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>O TSE e os Tribunais Regionais Eleitorais fiscalizam irregularidades e podem aplicar multas, sanções administrativas e até <span className="font-bold text-yellow-400">cassar candidaturas</span> em casos graves (especialmente envolvendo fraude por IA ou propaganda irregular).</li>
                        <li><span className="font-bold text-white">Eleitores:</span> cuidado ao compartilhar conteúdo fora das regras — propagandas irregulares podem também gerar penalidades.</li>
                    </ul>
                </div>
            </section>

             {/* Resumo Rápido Table */}
            <section>
                <SectionTitle icon="📌" text="Resumo rápido" />
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead className="bg-gray-800 text-xs text-gray-400 uppercase">
                                <tr>
                                    <th className="px-6 py-3">Tema</th>
                                    <th className="px-6 py-3">Quando pode</th>
                                    <th className="px-6 py-3">Regras principais</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 text-sm text-gray-300">
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-white">Pré-campanha</td>
                                    <td className="px-6 py-4">Antes de 16/08/2026</td>
                                    <td className="px-6 py-4">Não pedir voto, apenas posicionamentos informativos</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-white">Propaganda eleitoral</td>
                                    <td className="px-6 py-4">16/08/2026 até eleição</td>
                                    <td className="px-6 py-4">Permitida em redes sociais e meios oficiais</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-white">Redes sociais</td>
                                    <td className="px-6 py-4">Durante a campanha</td>
                                    <td className="px-6 py-4">Perfis oficiais, sem impulsionamento irregular, com transparência</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-white">IA e desinformação</td>
                                    <td className="px-6 py-4">Campanha eleitoral</td>
                                    <td className="px-6 py-4">Proibido deepfakes e desinformação; aviso de IA obrigatório</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};
