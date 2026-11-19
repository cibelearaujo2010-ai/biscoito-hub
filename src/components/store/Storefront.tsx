import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Gift, 
  Search, 
  MapPin, 
  Check, 
  Briefcase, 
  Newspaper, 
  ExternalLink,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Info,
  Layers,
  HeartHandshake,
  ArrowUp,
  Heart,
  Trash2,
  RotateCcw,
  BookOpen,
  PenTool,
  Music,
  Code2,
  Terminal,
  KeyRound,
  ArrowRight,
  EyeOff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { PRESS_ITEMS } from '../../data/initialData';
import { CookieStories } from './CookieStories';
import { LogisticsSection } from './LogisticsSection';
import { CompanyActionsSection } from './CompanyActionsSection';

export const Storefront: React.FC = () => {
  const { 
    products, 
    addToCart, 
    setIsCartOpen, 
    getOrderById, 
    addCandidate, 
    deleteCandidate,
    candidates,
    setActiveSpace,
    orders,
    showToast,
    siteConfig,
    isDeveloperBioOpen,
    setIsDeveloperBioOpen,
    toggleDeveloperBio,
  } = useApp();

  const sister1 = siteConfig.siblings?.sister1 || 'Nicole';
  const sister2 = siteConfig.siblings?.sister2 || 'Neudyelle';
  const sister3 = siteConfig.siblings?.sister3 || 'Elizene';
  const brother = siteConfig.siblings?.brother || 'Adão';

  // Category filter
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Tracking section state
  const [trackingCode, setTrackingCode] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState<ReturnType<typeof getOrderById> | null>(() => getOrderById('BIS-1042'));

  // Freight simulation state
  const [cepInput, setCepInput] = useState('');
  const [freightResult, setFreightResult] = useState<{ express: number; padrao: number; prazoExpress: string; prazoPadrao: string } | null>(null);

  // HR Application Form
  const [rhName, setRhName] = useState('');
  const [rhEmail, setRhEmail] = useState('');
  const [rhPhone, setRhPhone] = useState('');
  const [rhRole, setRhRole] = useState('Confeiteiro(a) Artesanal & Decoração');
  const [rhExperience, setRhExperience] = useState(3);
  const [rhSummary, setRhSummary] = useState('');
  const [rhSuccess, setRhSuccess] = useState(false);



  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'combos') return p.isCombo;
    return p.category === activeCategory;
  });

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    const found = getOrderById(trackingCode.trim());
    setTrackedOrderResult(found || null);
  };

  const handleCalculateFreight = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cepInput.replace(/\D/g, '');
    if (cleanCep.length < 5) {
      showToast('Por favor, informe um CEP válido.');
      return;
    }
    setFreightResult({
      express: 12.0,
      padrao: 8.0,
      prazoExpress: '35 a 55 minutos (Frota Roxa Climatizada)',
      prazoPadrao: 'Hoje até às 18h',
    });
  };

  const [lastSubmittedEmail, setLastSubmittedEmail] = useState<string>('');

  const handleRhSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rhName || !rhEmail || !rhPhone) return;
    setLastSubmittedEmail(rhEmail);
    addCandidate({
      fullName: rhName,
      email: rhEmail,
      phone: rhPhone,
      roleApplied: rhRole,
      experienceYears: Number(rhExperience),
      summary: rhSummary || 'Candidatura enviada através do portal de carreiras da 4 Irmãos — Confeitaria Artesanal.',
    });
    setRhSuccess(true);
  };

  const handleClearRhForm = () => {
    setRhName('');
    setRhEmail('');
    setRhPhone('');
    setRhRole('Confeiteiro(a) de Pâtisserie & Massas Finas');
    setRhExperience(1);
    setRhSummary('');
    showToast('Campos do formulário de currículo apagados com sucesso.');
  };


  const categoryTabs = [
    { id: 'todos', label: 'Todos os Biscoitos' },
    { id: 'amanteigados', label: 'Amanteigados Finos' },
    { id: 'recheados', label: 'Casadinhos & Recheados' },
    { id: 'gourmet', label: 'Cookies Gourmet' },
    { id: 'combos', label: 'Combos & Latas Lilás' },
    { id: 'salgados', label: 'Salgados & Aperitivos' },
  ];

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'recebido': return 0;
      case 'cozinha_massa': return 1;
      case 'no_forno': return 2;
      case 'resfriando': return 3;
      case 'embalagem': return 4;
      case 'pronto_despacho': return 5;
      case 'saiu_entrega': return 6;
      case 'entregue': return 7;
      default: return 0;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* BANNER DINÂMICO DE AVISOS DA FÁBRICA (GERENCIADO POR CIBELE ARAÚJO) */}
      {siteConfig.isAnnouncementActive && (
        <div className="bg-gradient-to-r from-[#200E2E] via-[#2A103D] to-[#1E0B2B] text-white py-3 px-4 sm:px-8 border-b border-[#4C1D95]/40 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="px-2.5 py-0.5 bg-[#7C3AED] text-white rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-sm">
                Aviso da Fábrica
              </span>
              <p className="text-xs text-[#EDE9FE] font-medium leading-relaxed">
                {siteConfig.bannerAnnouncement}
              </p>
            </div>

            {siteConfig.specialPromoCode && (
              <div className="flex items-center gap-2 shrink-0 bg-[#3B1443]/80 px-3 py-1 rounded-full border border-[#DDD6FE]/30">
                <span className="text-[11px] text-[#DDD6FE]">Cupom Oficial:</span>
                <span className="font-mono font-bold text-amber-300 text-xs tracking-wider">
                  {siteConfig.specialPromoCode}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-[#7C3AED] text-white rounded">
                  {siteConfig.specialPromoDiscount}% OFF
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="topo" className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Brand Message */}
            <div className="lg:col-span-6 space-y-6">
              {/* Unboxed editorial kicker with Logo Crest */}
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
                  alt="Logotipo Oficial 3 Irmãs & 1 Biscoito"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-[#7C3AED]/30 shrink-0"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-[#6D28D9] font-bold tracking-wide">
                    <span>4 Irmãos — Confeitaria Artesanal</span>
                    <span aria-hidden="true">·</span>
                    <span>Est. 2024</span>
                  </div>
                  <span className="text-[11px] text-[#7C3AED]">3 Irmãs Confeiteiras & 1 Irmão Forneiro</span>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#200E2E] leading-[1.1] tracking-tight">
                {siteConfig.heroTitle || 'Quatro irmãos unidos por uma receita secular de biscoitos e confeitaria.'}
              </h1>

              <p className="text-sm sm:text-base text-[#4C1D95]/80 leading-relaxed max-w-xl">
                {siteConfig.heroSubtitle || `Tudo começou com o caderno amarelo da nossa avó e uma única receita mágica de biscoito que derretia no céu da boca. Hoje, os 4 irmãos — três irmãs confeiteiras (${sister1}, ${sister2} e ${sister3}) e o irmão mestre forneiro (${brother}) — lideram uma confeitaria artesanal que preserva o cuidado familiar com fornos de lastro e as icônicas latas colecionáveis em roxo e lilás.`}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#cardapio"
                  className="px-6 py-3.5 bg-[#200E2E] hover:bg-[#3B1443] text-[#FAF8FD] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-[0.99] whitespace-nowrap"
                >
                  Ver Cardápio & Fornadas
                </a>
                <a
                  href="#fabrica"
                  className="px-6 py-3.5 bg-white hover:bg-[#F5F3FF] text-[#3B0764] border border-[#DDD6FE] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm"
                >
                  Conhecer os 4 Irmãos
                </a>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 border-t border-[#EDE9FE] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="font-display text-2xl font-bold text-[#200E2E] tabular-nums">1 Receita</div>
                  <div className="text-[11px] text-[#6D28D9]">Segredo guardado a 7 chaves</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#200E2E] tabular-nums">4 Irmãos</div>
                  <div className="text-[11px] text-[#6D28D9]">3 irmãs e 1 irmão nos fornos</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#200E2E] tabular-nums">180°C</div>
                  <div className="text-[11px] text-[#6D28D9]">Forno de lastro a vapor</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero High-Res Factory Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DDD6FE] bg-[#F5F3FF] aspect-[16/10]">
                <img
                  src="/src/assets/images/hero_cookie_factory_1793997928787.jpg"
                  alt="Interior da Confeitaria 4 Irmãos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200E2E]/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[#DDD6FE]">
                      4 Irmãos — Confeitaria Artesanal 🍪
                    </p>
                    <p className="font-display text-xl font-medium">
                      Onde cada fornada carrega a tradição e o amor da família.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: APRESENTAÇÃO DA FÁBRICA DAS 3 IRMÃS */}
      <section id="fabrica" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EDE9FE] shadow-sm space-y-12">
          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Apresentação da Confeitaria & Fábrica</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
              A história por trás do nome: 4 Irmãos — Confeitaria Artesanal.
            </h2>
            <p className="text-sm text-[#4C1D95]/80 leading-relaxed">
              Dona Cecília, avó dos quatro irmãos, fazia um único tipo de biscoito amanteigado na fazenda que era disputado pelos netos. 
              Anos depois, as três irmãs <strong>{sister1}</strong> (que domina a alquimia das massas sablé), <strong>{sister2}</strong> (pâtisserie e recheios nobres) 
              e <strong>{sister3}</strong> (nutricionista e guardiã dos ingredientes puros), uniram forças com o irmão <strong>{brother}</strong> (mestre dos fornos a vapor e torra de cacau). 
              Juntos, os 4 irmãos transformaram a receita de família em uma confeitaria artesanal de excelência.
            </p>
          </div>

          {/* 4 Steps of Factory Manufacturing */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] space-y-3">
              <div className="font-display text-2xl font-bold text-[#7C3AED]">01.</div>
              <h3 className="font-display text-lg font-bold text-[#200E2E]">A Receita Original</h3>
              <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                Manteiga pura com 82% de lipídios batida delicadamente com açúcar de confeiteiro e 
                extrato puro de favas de baunilha, sem adição de emulsificantes artificiais.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] space-y-3">
              <div className="font-display text-2xl font-bold text-[#7C3AED]">02.</div>
              <h3 className="font-display text-lg font-bold text-[#200E2E]">Modelagem a 8 Mãos</h3>
              <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                Os quatro irmãos e sua equipe moldam cada formato em bancadas de mármore branco, 
                garantindo as bordas perfeitas do sablé e a textura aveludada do casadinho.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] space-y-3">
              <div className="font-display text-2xl font-bold text-[#7C3AED]">03.</div>
              <h3 className="font-display text-lg font-bold text-[#200E2E]">Forno Ouro Refratário</h3>
              <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                Comandado pelo irmão {brother}, o cozimento a 175°C com vapor suave doura os açúcares naturais 
                e cria a crocância que desmancha ao menor toque.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] space-y-3">
              <div className="font-display text-2xl font-bold text-[#7C3AED]">04.</div>
              <h3 className="font-display text-lg font-bold text-[#200E2E]">Lata Lilás Colecionável</h3>
              <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                Resfriamento natural em esteira de cobre antes do envase nas nossas icônicas latas roxas e lilases, 
                com selagem hermética que conserva a crocância por 90 dias.
              </p>
            </div>
          </div>

          {/* Master Baker Split Spotlight */}
          <div className="grid lg:grid-cols-12 gap-8 items-center pt-4">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#EDE9FE] bg-[#F5F3FF] aspect-[4/3]">
              <img
                src="/src/assets/images/factory_master_baking_1793997929768.jpg"
                alt="Os 4 irmãos finalizando a fornada na confeitaria"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs text-[#6D28D9] font-medium uppercase tracking-wider">
                Amor de Família em Cada Biscoito
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#200E2E]">
                "Nenhum biscoito sai da nossa confeitaria sem que passe pelo olhar atento de um dos quatro irmãos."
              </h3>
              <p className="text-sm text-[#4C1D95]/80 leading-relaxed">
                Todas as manhãs, realizamos a prova sensorial do lote número zero. 
                Apenas após a aprovação de {brother}, {sister1}, {sister2} e {sister3}, liberamos as esteiras para 
                o envio direto aos nossos clientes e parceiros de atacado.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-[#6D28D9]">
                <span>Irmão {brother}: <strong>Mestre dos Fornos & Torra</strong></span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>Irmã {sister1}: <strong>Confeitaria & Massas</strong></span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>Irmã {sister2}: <strong>Pâtisserie & Recheios</strong></span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>Irmã {sister3}: <strong>Qualidade (CRN 18.420)</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CARDÁPIO DE BISCOITOS & COMBOS */}
      <section id="cardapio" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Cardápio dos 4 Irmãos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
              Fornadas do Dia & Biscoitos Artesanais
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#200E2E] text-white shadow-sm font-semibold'
                      : 'bg-white hover:bg-[#F5F3FF] text-[#4C1D95] border border-[#EDE9FE]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Banner Especial dos Campeões de Vendas */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#200E2E] via-[#3B0764] to-[#4C1D95] rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg border border-purple-400/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              🍪
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Os que Mais Saem na Confeitaria</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Biscoito de Brigadeiro, Cookie com M&M's e Biscoito de Chocolate
              </h3>
              <p className="text-xs text-[#DDD6FE]/90">
                Os três favoritos das fornadas diárias dos 4 irmãos. Casquinha crocante e recheio cremoso que derrete na boca!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                const prod = products.find((p) => p.id === 'prod-brigadeiro');
                if (prod) addToCart(prod);
              }}
              className="flex-1 md:flex-none px-4 py-2.5 bg-white hover:bg-[#EDE9FE] text-[#200E2E] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Pedir Brigadeiro</span>
              <span className="text-[10px] text-[#7C3AED] font-mono">R$ 43,90</span>
            </button>
            <button
              onClick={() => {
                const prod = products.find((p) => p.id === 'prod-mms');
                if (prod) addToCart(prod);
              }}
              className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#200E2E] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Pedir M&M's</span>
              <span className="text-[10px] text-amber-950 font-mono">R$ 41,50</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-3xl border border-[#EDE9FE] hover:border-[#DDD6FE] transition-all duration-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Product Image Slot */}
              <div 
                className="relative aspect-[4/3] bg-[#F5F3FF] overflow-hidden cursor-pointer"
                onClick={() => setSelectedProduct(prod)}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {prod.isPopular && (
                  <div className="absolute top-3 left-3 bg-[#FAF8FD]/95 backdrop-blur-sm text-[#3B0764] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#DDD6FE]">
                    Favorito dos 4 Irmãos
                  </div>
                )}
                {prod.isCombo && (
                  <div className="absolute top-3 right-3 bg-[#7C3AED] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    Lata Lilás Colecionável
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#7C3AED]">
                    <span className="uppercase tracking-wider font-semibold text-[11px]">{prod.category}</span>
                    <span className="text-[#6D28D9]">{prod.weight}</span>
                  </div>

                  <h3 
                    onClick={() => setSelectedProduct(prod)}
                    className="font-display text-lg font-bold text-[#200E2E] group-hover:text-[#6D28D9] transition-colors cursor-pointer leading-snug"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#4C1D95]/80 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE9FE] flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase text-[#7C3AED]">Valor</span>
                    <div className="font-sans text-lg font-bold text-[#200E2E] tabular-nums">
                      R$ {prod.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="p-2.5 rounded-xl border border-[#EDE9FE] text-[#6D28D9] hover:bg-[#F5F3FF] hover:text-[#200E2E] transition-colors"
                      title="Ver detalhes e ingredientes"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="px-4 py-2.5 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#3B0764] border border-[#DDD6FE] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98]"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: COMBOS EXCLUSIVOS & LATA LILÁS */}
      <section id="combos" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="bg-gradient-to-br from-[#FAF8FD] via-white to-[#EDE9FE]/50 rounded-3xl p-8 sm:p-12 border border-[#DDD6FE] shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image of the Deluxe Tin */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#EDE9FE] bg-white shadow-md aspect-[4/3]">
                <img
                  src="/src/assets/images/product_cookie_box_1793997929366.jpg"
                  alt="Lata Lilás Signature 4 Irmãos — Confeitaria Artesanal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Combo Presentation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
                  <Gift className="w-4 h-4" />
                  <span>Edição Especial Lilás Colecionável</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
                  Lata Lilás Signature 🍪 — O Segredo dos 4 Irmãos
                </h2>
                <p className="text-sm text-[#4C1D95]/80 leading-relaxed">
                  Criada em comemoração ao primeiro biscoito da família. Em elegante acabamento roxo e lilás 
                  com relevo metálico, vedação hermética para presentear ou para transformar o lanche 
                  da tarde em uma verdadeira festa.
                </p>
              </div>

              {/* Items included bullet-list */}
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#DDD6FE] space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#200E2E]">
                  O que vem na Lata Lilás Signature (680g):
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#4C1D95]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Sablé Imperial de Baunilha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Casadinho Tradicional de Goiabada Cascão</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Double Chocolate com Flor de Sal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Palmier Folhado Caramelizado</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase text-[#7C3AED]">Valor Especial</span>
                  <div className="font-sans text-2xl font-bold text-[#200E2E] tabular-nums">
                    R$ 89,90
                  </div>
                </div>

                <button
                  onClick={() => {
                    const combo = products.find((p) => p.id === 'combo-1');
                    if (combo) addToCart(combo, 1);
                  }}
                  className="px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
                >
                  Adicionar à Bolsa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ENTREGA, FRETE & RASTREAMENTO */}
      <section id="entrega" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            <span>Logística Direta ao Cliente</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
            Entrega Expressa & Rastreamento em Tempo Real
          </h2>
          <p className="text-sm text-[#4C1D95]/80">
            Nossos biscoitos são embalados com controle térmico para preservar a crocância única. 
            Acompanhe a sua fornada desde a saída do forno até a chegada à sua porta.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Tracking Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE9FE] shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-[#200E2E]">
              Rastrear Pedido pelo Código
            </h3>

            {/* Quick Demo Codes */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7C3AED]">
              <span>Exemplos ativos:</span>
              {orders.slice(0, 3).map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => {
                    setTrackingCode(ord.id);
                    setTrackedOrderResult(ord);
                  }}
                  className="px-2.5 py-1 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#3B0764] rounded-lg border border-[#DDD6FE] font-mono text-[11px] transition-colors"
                >
                  #{ord.id}
                </button>
              ))}
            </div>

            <form onSubmit={handleTrackOrder} className="flex gap-2">
              <input
                type="text"
                placeholder="Digite o código (ex: BIS-1042)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="flex-1 text-xs px-4 py-3 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E] uppercase font-mono"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Rastrear
              </button>
            </form>

            {/* Tracking Result View */}
            {trackedOrderResult ? (
              <div className="p-5 bg-[#FAF8FD] rounded-2xl border border-[#DDD6FE] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE9FE] pb-3">
                  <div>
                    <span className="text-[10px] uppercase text-[#7C3AED]">Código do Pedido</span>
                    <div className="font-mono text-base font-bold text-[#200E2E]">
                      #{trackedOrderResult.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#7C3AED]">Destinatário</span>
                    <div className="text-xs font-semibold text-[#200E2E]">
                      {trackedOrderResult.customerName}
                    </div>
                  </div>
                </div>

                {/* Status Stepper */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-[11px] text-[#7C3AED]">
                    <span>Fornada / Cozinha</span>
                    <span>Embalagem</span>
                    <span>Saiu para Entrega</span>
                    <span>Entregue</span>
                  </div>
                  <div className="w-full bg-[#EDE9FE] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#7C3AED] h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (getStatusStepIndex(trackedOrderResult.status) + 1) * 12.5
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-[#200E2E]">
                    <Clock className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span className="font-medium">Previsão: {trackedOrderResult.estimatedDeliveryTime}</span>
                  </div>
                  {trackedOrderResult.driverName && (
                    <div className="text-xs text-[#7C3AED]">
                      Entregador: <strong className="text-[#200E2E]">{trackedOrderResult.driverName}</strong>
                    </div>
                  )}
                </div>

                {/* Items in this tracked order */}
                <div className="text-[11px] text-[#4C1D95] pt-2 border-t border-[#EDE9FE]">
                  <span className="font-semibold text-[#200E2E]">Itens da comanda: </span>
                  {trackedOrderResult.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                </div>
              </div>
            ) : trackingCode ? (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                Nenhum pedido encontrado com o código "{trackingCode}". Verifique a digitação ou use um dos exemplos acima.
              </div>
            ) : null}
          </div>

          {/* Freight & CEP Calculator */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE9FE] shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-[#200E2E]">
              Simular Prazo & Frete
            </h3>

            <p className="text-xs text-[#4C1D95]/80">
              Informe seu CEP para conferir a disponibilidade de rota da frota própria dos 4 Irmãos.
            </p>

            <form onSubmit={handleCalculateFreight} className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: 01420-001"
                value={cepInput}
                onChange={(e) => setCepInput(e.target.value)}
                className="flex-1 text-xs px-4 py-3 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#3B0764] border border-[#DDD6FE] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Calcular
              </button>
            </form>

            {freightResult && (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-[#F5F3FF] rounded-xl border border-[#DDD6FE] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#200E2E]">Entrega Expressa dos 4 Irmãos</div>
                    <div className="text-[11px] text-[#7C3AED]">{freightResult.prazoExpress}</div>
                  </div>
                  <div className="font-bold text-sm text-[#7C3AED] tabular-nums">
                    R$ {freightResult.express.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EDE9FE] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#200E2E]">Entrega Convencional</div>
                    <div className="text-[11px] text-[#7C3AED]">{freightResult.prazoPadrao}</div>
                  </div>
                  <div className="font-bold text-sm text-[#200E2E] tabular-nums">
                    R$ {freightResult.padrao.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-900">
                  <div>
                    <div className="text-xs font-bold">Retirada na Fábrica (Balcão)</div>
                    <div className="text-[11px] text-emerald-700">Café quentinho de cortesia com os 4 irmãos</div>
                  </div>
                  <div className="font-bold text-sm text-emerald-700">Grátis</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: RH & VAGAS NA FÁBRICA */}
      <section id="rh" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EDE9FE] shadow-sm space-y-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Culture & Open Roles */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Trabalhe Conosco</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
                  Faça parte da família 4 Irmãos — Confeitaria Artesanal.
                </h2>
                <p className="text-sm text-[#4C1D95]/80 leading-relaxed">
                  Trabalhar conosco é conviver com o aroma constante de manteiga e canela assando. 
                  Oferecemos ambiente acolhedor, valorização profissional, cesta semanal de biscoitos frescos e plano de carreira.
                </p>
              </div>

              {/* Open Roles List */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#200E2E]">
                  Vagas com Seleção Aberta:
                </div>

                <div className="p-3.5 bg-[#FAF8FD] rounded-xl border border-[#EDE9FE] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#200E2E]">Mestre Forneiro / Operador de Forno</span>
                    <span className="text-[11px] text-[#7C3AED] font-medium">Integral · CLT</span>
                  </div>
                  <p className="text-[11px] text-[#4C1D95]/80">Controle de curvas térmicas dos fornos a vapor com o Mestre {brother}.</p>
                </div>

                <div className="p-3.5 bg-[#FAF8FD] rounded-xl border border-[#EDE9FE] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#200E2E]">Confeiteiro(a) de Pâtisserie & Massas Finas</span>
                    <span className="text-[11px] text-[#7C3AED] font-medium">Integral · CLT</span>
                  </div>
                  <p className="text-[11px] text-[#4C1D95]/80">Preparo das massas sablé e recheio manual com a Confeiteira {sister1}.</p>
                </div>

                <div className="p-3.5 bg-[#FAF8FD] rounded-xl border border-[#EDE9FE] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#200E2E]">Operador(a) de Embalagem Hermética & Selagem</span>
                    <span className="text-[11px] text-[#7C3AED] font-medium">Turno Manhã · CLT</span>
                  </div>
                  <p className="text-[11px] text-[#4C1D95]/80">Envase das latas lilases colecionáveis, pesagem e controle de lote.</p>
                </div>
              </div>
            </div>

            {/* Right: Candidacy Form */}
            <div className="lg:col-span-6 bg-[#FAF8FD] rounded-2xl p-6 sm:p-8 border border-[#DDD6FE] space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#200E2E]">
                    Enviar Candidatura Direta
                  </h3>
                  <p className="text-xs text-[#7C3AED]">
                    Preencha seus dados ou apague o formulário a qualquer momento.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClearRhForm}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 rounded-xl text-xs font-semibold border border-rose-200 transition-colors shadow-xs active:scale-95"
                  title="Apagar todos os campos digitados no formulário"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Apagar / Limpar Formulário</span>
                </button>
              </div>

              {rhSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                  <div className="space-y-1">
                    <div className="text-emerald-800 font-bold text-sm">Candidatura Registrada com Sucesso! 🍪</div>
                    <p className="text-xs text-emerald-700">
                      Seu perfil foi enviado ao Painel da Diretoria dos 4 Irmãos. Caso deseje corrigir ou remover seus dados, você pode apagar o currículo abaixo.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const submitted = candidates.find(c => c.email === lastSubmittedEmail) || candidates[0];
                        if (submitted) {
                          deleteCandidate(submitted.id);
                        }
                        setRhSuccess(false);
                        handleClearRhForm();
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-rose-700" />
                      <span>Apagar meu Currículo Enviado</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRhSuccess(false);
                        handleClearRhForm();
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-[#DDD6FE]" />
                      <span>Enviar Outro Currículo</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRhSubmit} className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold uppercase text-[#4C1D95]">
                        Nome Completo *
                      </label>
                      {rhName && (
                        <button
                          type="button"
                          onClick={() => setRhName('')}
                          className="text-[10px] text-rose-600 hover:underline"
                        >
                          apagar campo
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mariana Lima"
                      value={rhName}
                      onChange={(e) => setRhName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold uppercase text-[#4C1D95]">
                          E-mail *
                        </label>
                        {rhEmail && (
                          <button
                            type="button"
                            onClick={() => setRhEmail('')}
                            className="text-[10px] text-rose-600 hover:underline"
                          >
                            apagar
                          </button>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={rhEmail}
                        onChange={(e) => setRhEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold uppercase text-[#4C1D95]">
                          Telefone / Celular *
                        </label>
                        {rhPhone && (
                          <button
                            type="button"
                            onClick={() => setRhPhone('')}
                            className="text-[10px] text-rose-600 hover:underline"
                          >
                            apagar
                          </button>
                        )}
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98888-0000"
                        value={rhPhone}
                        onChange={(e) => setRhPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                        Vaga Desejada
                      </label>
                      <select
                        value={rhRole}
                        onChange={(e) => setRhRole(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                      >
                        <option value="Mestre Forneiro / Operador de Forno">Mestre Forneiro</option>
                        <option value="Confeiteiro(a) Artesanal & Decoração">Confeiteiro(a) Artesanal</option>
                        <option value="Operador(a) de Embalagem Hermética">Operador(a) de Embalagem</option>
                        <option value="Assistente de Logística & Expedição">Assistente de Logística</option>
                        <option value="Atendente de Balcão e Loja da Fábrica">Atendente de Balcão da Fábrica</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                        Anos de Experiência
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="35"
                        value={rhExperience}
                        onChange={(e) => setRhExperience(Number(e.target.value))}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold uppercase text-[#4C1D95]">
                        Resumo Profissional / Experiências Prévias
                      </label>
                      {rhSummary && (
                        <button
                          type="button"
                          onClick={() => setRhSummary('')}
                          className="text-[10px] text-rose-600 hover:underline"
                        >
                          apagar texto
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Conte sobre sua trajetória com confeitaria, panificação ou logística..."
                      value={rhSummary}
                      onChange={(e) => setRhSummary(e.target.value)}
                      className="w-full text-xs px-3.5 py-2 bg-white border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                    />
                  </div>

                  {/* Botões de Ação: Apagar / Limpar e Enviar */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClearRhForm}
                      className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Apagar Dados</span>
                    </button>

                    <button
                      type="submit"
                      className="flex-1 w-full py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Enviar Currículo aos 4 Irmãos
                    </button>
                  </div>
                </form>
              )}

              {/* Seção para consultar e apagar currículos já enviados */}
              {candidates.length > 0 && (
                <div className="pt-4 border-t border-[#DDD6FE]/70 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#200E2E]">Currículos Enviados Recentemente ({candidates.length}):</span>
                    <span className="text-[10px] text-[#7C3AED]">Você pode apagar qualquer envio</span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {candidates.slice(0, 3).map((cand) => (
                      <div
                        key={cand.id}
                        className="p-2.5 bg-white rounded-xl border border-[#EDE9FE] flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#200E2E] truncate">{cand.fullName}</div>
                          <div className="text-[11px] text-[#7C3AED] truncate">{cand.roleApplied} · {cand.appliedDate}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteCandidate(cand.id)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[11px] font-semibold border border-rose-200 shrink-0 transition-colors"
                          title="Apagar este currículo do sistema"
                        >
                          <Trash2 className="w-3 h-3 text-rose-600" />
                          <span>Apagar</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LOGÍSTICA & DISTRIBUIÇÃO DOS 4 IRMÃOS */}
      <LogisticsSection />

      {/* SECTION 7: MÍDIA, STORIES & SALA DE IMPRENSA */}
      <section id="midia" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 space-y-12">
        {/* STORIES INTERATIVOS DOS BISCOITOS */}
        <CookieStories />

        <div className="border-t border-[#EDE9FE] pt-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <Newspaper className="w-4 h-4" />
              <span>Mídia & Imprensa</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
              Os 4 Irmãos na Imprensa
            </h2>
            <p className="text-sm text-[#4C1D95]/80">
              Acompanhe o que os principais críticos gastronômicos e veículos dizem sobre a receita única que conquistou o país.
            </p>
          </div>

        {/* Press Clippings */}
        <div className="grid md:grid-cols-3 gap-6">
          {PRESS_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#EDE9FE] shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7C3AED]">
                  <span className="font-semibold text-[#6D28D9]">{item.source}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#200E2E] leading-snug">
                  "{item.title}"
                </h3>
                <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDE9FE] flex items-center gap-1.5 text-xs text-[#7C3AED] font-medium">
                <span>Ler matéria completa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Press Kit & Logotipo Box */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF8FD] to-[#F5F3FF] rounded-3xl border border-[#DDD6FE] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
              alt="Logotipo Oficial 3 Irmãs & 1 Biscoito"
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-md ring-4 ring-[#DDD6FE] shrink-0"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-bold uppercase tracking-wider">
                <span>Identidade Visual & Logotipo Oficial</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#200E2E]">
                Logotipo 3 Irmãs & 1 Biscoito — Confeitaria Artesanal
              </h4>
              <p className="text-xs text-[#7C3AED] max-w-lg">
                Guirlanda artesanal de cookies com gotas de chocolate em fundo cacau acolhedor e assinatura caligráfica oficial 3 Irmãs & 1 Biscoito.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
              download="logotipo-3-irmas-1-biscoito.jpg"
              className="px-5 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Baixar Logotipo HD
            </a>
          </div>
        </div>
      </div>
    </section>

      {/* SECTION 7.5: AÇÕES DA EMPRESA & RESPONSABILIDADE SOCIAL */}
      <CompanyActionsSection />

      {/* SECTION 8: DESENVOLVEDORA DA PLATAFORMA (OCULTA POR PADRÃO — COM BOTÃO PARA SABER) */}
      <section id="desenvolvedora" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        {!isDeveloperBioOpen ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF5FF]/70 rounded-2xl px-5 py-3.5 border border-[#EDE9FE]">
            <span className="text-xs text-[#4C1D95]/70 font-medium">
              Quer conhecer quem desenvolveu esta plataforma digital?
            </span>

            <button
              type="button"
              onClick={toggleDeveloperBio}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#200E2E] to-[#3B1553] hover:from-[#2E1045] hover:to-[#4C1D95] text-[#DDD6FE] hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Saber sobre a desenvolvedora do sistema"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Saber sobre a Desenvolvedora</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE9FE] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
                  <Code2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Engenharia & Criação da Plataforma</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#200E2E] tracking-tight">
                  A Criadora do Sistema: {siteConfig.developerName}
                </h2>
                <p className="text-xs text-[#4C1D95]/80">
                  Idealizadora, arquiteta de software e criadora de cada linha de código da plataforma 4 Irmãos.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDeveloperBioOpen(false)}
                className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#200E2E] text-xs font-bold transition-colors cursor-pointer"
              >
                <EyeOff className="w-4 h-4 text-rose-500" />
                <span>Ocultar Área da Desenvolvedora</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#1E0B2B] via-[#2A103D] to-[#14071D] text-white rounded-3xl p-6 sm:p-10 border border-[#4C1D95]/40 shadow-xl relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Developer Header Row */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#A78BFA] to-[#DDD6FE] p-1 shadow-lg shrink-0">
                    <div className="w-full h-full bg-[#200E2E] rounded-[22px] flex items-center justify-center font-display text-2xl font-bold text-[#DDD6FE] tracking-tight">
                      CA
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                        {siteConfig.developerName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-[#DDD6FE] font-medium">
                      {siteConfig.developerRole}
                    </p>
                    <span className="text-[11px] font-mono text-[#A78BFA] block">
                      {siteConfig.developerEmail}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDeveloperBioOpen(false)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <EyeOff className="w-4 h-4 text-rose-300" />
                  <span>Ocultar Informações</span>
                </button>
              </div>

              {/* Bio & Paixões */}
              <div className="space-y-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/30 border border-[#A78BFA]/40 text-[#DDD6FE] text-xs font-bold uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                        <span>Minha Mini Biografia</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-white">
                        Sobre a Criadora & Propósito
                      </h4>
                    </div>

                    <div className="p-5 bg-white/10 rounded-2xl border border-white/15 text-xs text-[#FAF8FD] leading-relaxed italic relative">
                      <span className="text-3xl text-[#A78BFA] absolute -top-2 left-3 font-serif select-none">“</span>
                      <p className="pt-2">
                        {siteConfig.developerBio}
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#DDD6FE]">
                        <span>— {siteConfig.developerName}</span>
                        <span className="text-pink-300 flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-pink-300" /> Código com Alma
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-[#A78BFA] flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                        <span>Central Total de Atualização:</span>
                      </div>
                      <p className="text-xs text-[#DDD6FE]/80">
                        Cibele possui acesso protegido no Painel ADM para atualizar textos, produtos, ações da empresa, equipe e comunicados do site em tempo real.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSpace('admin');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 group cursor-pointer"
                      >
                        <span>Acessar Meu Painel (ADM)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                        <span>O que eu mais gosto: Paixões Pessoais</span>
                      </span>
                      <span className="text-[11px] text-[#DDD6FE]/70">{siteConfig.developerName}</span>
                    </div>

                    <div className="grid gap-3 sm:gap-4">
                      <div className="p-5 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/15 transition-all flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-xl text-white shrink-0 shadow-md">
                          <PenTool className="w-5 h-5 text-[#DDD6FE]" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>✍️ Escrever</span>
                            <span className="text-[10px] uppercase font-bold text-[#A78BFA] bg-white/10 px-2 py-0.5 rounded-full">
                              Crônicas & Poesia
                            </span>
                          </h5>
                          <p className="text-xs text-[#DDD6FE]/90 leading-relaxed">
                            {siteConfig.developerHobbies[0] || 'Escrever crônicas, poesias e narrativas autorais'}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/15 transition-all flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-xl text-white shrink-0 shadow-md">
                          <BookOpen className="w-5 h-5 text-[#DDD6FE]" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>📚 Ler</span>
                            <span className="text-[10px] uppercase font-bold text-[#A78BFA] bg-white/10 px-2 py-0.5 rounded-full">
                              Literatura & Ficção
                            </span>
                          </h5>
                          <p className="text-xs text-[#DDD6FE]/90 leading-relaxed">
                            {siteConfig.developerHobbies[1] || 'Ler livros clássicos, poesia e literatura instigante'}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/15 transition-all flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-xl text-white shrink-0 shadow-md">
                          <Music className="w-5 h-5 text-[#DDD6FE]" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>🎧 Escutar Música</span>
                            <span className="text-[10px] uppercase font-bold text-[#A78BFA] bg-white/10 px-2 py-0.5 rounded-full">
                              Trilha Sonora Viva
                            </span>
                          </h5>
                          <p className="text-xs text-[#DDD6FE]/90 leading-relaxed">
                            {siteConfig.developerHobbies[2] || 'Escutar música e criar playlists inspiradoras para codificar'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Technical Highlights */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center relative z-10">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="font-display text-xl font-bold text-[#DDD6FE]">4 Espaços</div>
                    <div className="text-[11px] text-[#DDD6FE]/70">Loja, Fornos, Frota e ADM</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="font-display text-xl font-bold text-[#DDD6FE]">100% Autoral</div>
                    <div className="text-[11px] text-[#DDD6FE]/70">Arquitetura de {siteConfig.developerName}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="font-display text-xl font-bold text-[#DDD6FE]">Roxo & Lilás</div>
                    <div className="text-[11px] text-[#DDD6FE]/70">Identidade Visual Harmonizada</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="font-display text-xl font-bold text-[#DDD6FE]">Tempo Real</div>
                    <div className="text-[11px] text-[#DDD6FE]/70">Fornos, Despacho & Avisos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-[#EDE9FE] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#F5F3FF] border border-[#EDE9FE]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-[#7C3AED] font-semibold">
                  {selectedProduct.category} · {selectedProduct.weight}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#200E2E]">
                  {selectedProduct.name}
                </h3>
                <div className="font-sans text-xl font-bold text-[#200E2E] tabular-nums">
                  R$ {selectedProduct.price.toFixed(2).replace('.', ',')}
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct, 1);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Adicionar à Bolsa da Fábrica
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#EDE9FE]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#200E2E] mb-1">
                  História & Notas de Sabor
                </h4>
                <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#200E2E] mb-1">
                  Ingredientes Puros Selecionados pelos 4 Irmãos
                </h4>
                <p className="text-xs text-[#4C1D95]/80 leading-relaxed bg-[#FAF8FD] p-3 rounded-xl border border-[#EDE9FE]">
                  {selectedProduct.ingredients}
                </p>
              </div>

              {selectedProduct.comboItems && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#200E2E] mb-2">
                    Itens Inclusos na Lata Colecionável:
                  </h4>
                  <ul className="text-xs text-[#4C1D95] space-y-1">
                    {selectedProduct.comboItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-xs text-[#7C3AED] hover:text-[#200E2E] transition-colors"
                >
                  Fechar Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Voltar ao Início / Topo Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-md hover:bg-[#F5F3FF] text-[#200E2E] border border-[#DDD6FE] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] group"
          aria-label="Voltar para o início"
        >
          <ArrowUp className="w-4 h-4 text-[#7C3AED] group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">Voltar ao Início</span>
        </button>
      </div>
    </div>
  );
};
