import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Leaf, 
  Users, 
  Sparkles, 
  Building2, 
  Sun, 
  Award, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Heart,
  Send,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CompanyAction } from '../../types';

export const CompanyActionsSection: React.FC = () => {
  const { companyActions, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);

  // Community proposal form
  const [institutionName, setInstitutionName] = useState('');
  const [institutionContact, setInstitutionContact] = useState('');
  const [institutionCity, setInstitutionCity] = useState('');
  const [institutionNeed, setInstitutionNeed] = useState('');
  const [isSent, setIsSent] = useState(false);

  const filteredActions = selectedCategory === 'todas'
    ? companyActions
    : companyActions.filter((act) => act.category === selectedCategory);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName.trim() || !institutionContact.trim()) return;

    setIsSent(true);
    showToast('Proposta comunitária enviada aos 4 Irmãos! Entraremos em contato com carinho.');
    setTimeout(() => {
      setInstitutionName('');
      setInstitutionContact('');
      setInstitutionCity('');
      setInstitutionNeed('');
      setIsSent(false);
    }, 5000);
  };

  const categories = [
    { id: 'todas', label: 'Todas as Ações' },
    { id: 'social', label: 'Ações Sociais & Solidariedade' },
    { id: 'sustentabilidade', label: 'Sustentabilidade & Energia Solar' },
    { id: 'parceria', label: 'Cacau Justo & Produtores' },
    { id: 'educacao', label: 'Escola de Confeitaria' },
  ];

  return (
    <section id="acoes" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 space-y-12">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE9FE] pb-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#DDD6FE] text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />
            <span>Ações da Empresa & Impacto Social</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
            Ações da 4 Irmãos: Cuidado com as Pessoas & o Planeta
          </h2>
          <p className="text-sm text-[#4C1D95]/80 leading-relaxed">
            Acreditamos que uma confeitaria artesanal de verdade gera afeto na mesa e transformação na comunidade. 
            Conheça as ações contínuas lideradas pelos 4 irmãos (Nicole, Neudyelle, Elizene e Adão) em prol de doações, sustentabilidade e comércio justo.
          </p>
        </div>

        {/* Global Impact Badge */}
        <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-[#EDE9FE] shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
            <Award className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7C3AED] block">Selo de Responsabilidade</span>
            <span className="text-xs font-bold text-[#200E2E]">Empresa Cidadã & Sustentável</span>
          </div>
        </div>
      </div>

      {/* 4 GRANDES INDICADORES DE IMPACTO DAS AÇÕES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#200E2E] to-[#3B1553] text-white p-5 rounded-3xl shadow-sm space-y-2 border border-purple-500/20">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-pink-300">
            <Heart className="w-4 h-4 fill-pink-300" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            3.840 kg
          </div>
          <div className="text-xs font-medium text-[#DDD6FE]">
            Biscoitos doados a creches e asilos parceiros em SP
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EDE9FE] shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Users className="w-4 h-4" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#200E2E] tracking-tight">
            28 Famílias
          </div>
          <div className="text-xs font-medium text-[#4C1D95]/80">
            Produtores familiares de cacau na Bahia com renda justa
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EDE9FE] shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Sun className="w-4 h-4" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-700 tracking-tight">
            100% Limpa
          </div>
          <div className="text-xs font-medium text-[#4C1D95]/80">
            Energia fotovoltaica na fábrica & frota elétrica lilás
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EDE9FE] shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
            <Award className="w-4 h-4" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#7C3AED] tracking-tight">
            60 Jovens
          </div>
          <div className="text-xs font-medium text-[#4C1D95]/80">
            Capacitados gratuitamente na Escola Oficina de Confeitaria
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS ROW */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#EDE9FE] pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'bg-[#FAF8FD] text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#EDE9FE]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* LISTA DE AÇÕES CORPORATIVAS / SOCIAIS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActions.map((action) => {
          const isExpanded = expandedActionId === action.id;
          return (
            <div
              key={action.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EDE9FE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Cover if available */}
                {action.image && (
                  <div className="relative h-48 overflow-hidden bg-purple-950">
                    <img
                      src={action.image}
                      alt={action.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category & Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#200E2E] text-[10px] font-bold uppercase tracking-wider">
                        {action.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        action.status === 'ativa'
                          ? 'bg-emerald-500 text-white'
                          : action.status === 'em_andamento'
                          ? 'bg-amber-400 text-[#200E2E]'
                          : 'bg-purple-600 text-white'
                      }`}>
                        {action.status === 'ativa' ? 'Em Ação' : action.status === 'em_andamento' ? 'Em Andamento' : 'Concluída'}
                      </span>
                    </div>

                    {/* Impact Metric Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{action.impactMetric}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Body */}
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-[#200E2E] leading-snug group-hover:text-[#7C3AED] transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                      {action.summary}
                    </p>
                  </div>

                  {/* Sibling Leadership & Meta Info */}
                  <div className="pt-2 border-t border-[#EDE9FE] space-y-1.5 text-xs text-[#4C1D95]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#7C3AED]">
                      <HeartHandshake className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>{action.leadSibling}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#7C3AED]/70">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#7C3AED]" />
                        <span>{action.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#7C3AED]" />
                        <span>{action.date}</span>
                      </span>
                    </div>
                  </div>

                  {/* Expandable Full Story */}
                  {isExpanded && (
                    <div className="mt-3 p-4 bg-[#FAF8FD] rounded-2xl border border-[#DDD6FE] text-xs text-[#200E2E] space-y-2 animate-in fade-in duration-200">
                      <div className="font-bold text-[#7C3AED] text-[11px] uppercase tracking-wider">
                        Como Funciona na Prática:
                      </div>
                      <p className="leading-relaxed text-xs text-[#4C1D95]/90">
                        {action.fullDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-4 bg-[#FAF8FD] border-t border-[#EDE9FE] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setExpandedActionId(isExpanded ? null : action.id)}
                  className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 cursor-pointer"
                >
                  <span>{isExpanded ? 'Recolher Detalhes' : 'Conhecer Mais'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ação Auditada</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BANNER INTERATIVO: CONECTE SUA INSTITUIÇÃO OU COMUNIDADE */}
      <div className="bg-[#1E0B2B] text-white rounded-3xl p-6 sm:p-10 border border-purple-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#DDD6FE] border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Conexão Solidária 4 Irmãos</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              Sua instituição gostaria de participar das nossas Fornadas do Bem?
            </h3>
            <p className="text-xs sm:text-sm text-[#DDD6FE]/80 leading-relaxed">
              Se você administra ou apoia creches comunitárias, lares de acolhimento de idosos, hospitais pediátricos ou projetos educativos, cadastre sua instituição para receber fornadas de biscoitos frescos ou oficinas gastronômicas.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15">
            {isSent ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Proposta Recebida com Sucesso!</h4>
                <p className="text-xs text-[#DDD6FE]">
                  Nossa equipe e os 4 irmãos analisarão o cadastro e entrarão em contato em até 48 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                  Indicar / Cadastrar Instituição Parceira
                </h4>
                <input
                  type="text"
                  required
                  placeholder="Nome da Entidade / Projeto Social *"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp / Contato *"
                    value={institutionContact}
                    onChange={(e) => setInstitutionContact(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                  <input
                    type="text"
                    placeholder="Cidade / Bairro"
                    value={institutionCity}
                    onChange={(e) => setInstitutionCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Conte brevemente sobre o público atendido (ex: 40 crianças de 3 a 6 anos)..."
                  value={institutionNeed}
                  onChange={(e) => setInstitutionNeed(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar para os 4 Irmãos</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
