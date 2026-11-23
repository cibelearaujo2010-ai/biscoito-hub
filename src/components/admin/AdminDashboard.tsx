import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Users, 
  Truck, 
  Flame, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  DollarSign, 
  Settings, 
  FileText,
  Search,
  ExternalLink,
  ChevronDown,
  ArrowLeft,
  Lock,
  Unlock,
  Sparkles,
  BookOpen,
  PenTool,
  Music,
  KeyRound,
  AlertCircle,
  Save,
  CheckCircle2,
  RotateCcw,
  Eye,
  EyeOff,
  HeartHandshake,
  Sun,
  Award,
  Leaf,
  MapPin,
  Calendar,
  Heart,
  Edit3,
  Sliders,
  Building2,
  Globe,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, ProductCategory, Product, SiteConfig, CompanyAction } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    toggleStock,
    deleteProduct,
    candidates,
    updateCandidateStatus,
    deleteCandidate,
    b2bLeads,
    updateLeadStatus,
    deleteB2BLead,
    companyActions,
    addCompanyAction,
    updateCompanyAction,
    deleteCompanyAction,
    batches,
    showToast,
    setActiveSpace,
    siteConfig,
    updateSiteConfig,
    resetSiteConfig,
    isDeveloperPanelVisible,
    setIsDeveloperPanelVisible,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pedidos' | 'cardapio' | 'acoes' | 'logistica' | 'rh' | 'config' | 'dev_cibele'>('pedidos');
  const [cibeleSubTab, setCibeleSubTab] = useState<'site' | 'cardapio' | 'acoes' | 'operacao' | 'perfil'>('site');
  const [orderFilter, setOrderFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderModal, setSelectedOrderModal] = useState<any | null>(null);

  // Cibele Araújo Developer Area Security State
  const [isCibeleUnlocked, setIsCibeleUnlocked] = useState(false);
  const [cibelePinInput, setCibelePinInput] = useState('');
  const [cibeleAuthError, setCibeleAuthError] = useState('');

  // Ações da Empresa State
  const [actionCategoryFilter, setActionCategoryFilter] = useState<string>('todas');
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionCategory, setNewActionCategory] = useState<'social' | 'sustentabilidade' | 'comunidade' | 'educacao' | 'parceria'>('social');
  const [newActionSummary, setNewActionSummary] = useState('');
  const [newActionFullDesc, setNewActionFullDesc] = useState('');
  const [newActionMetric, setNewActionMetric] = useState('');
  const [newActionLead, setNewActionLead] = useState('Irmã Nicole (Confeitaria & Ações Sociais)');
  const [newActionLocation, setNewActionLocation] = useState('São Paulo - SP');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Local editing draft for Site Configuration
  const [draftConfig, setDraftConfig] = useState<SiteConfig>(siteConfig);

  // Sync draft when siteConfig changes
  React.useEffect(() => {
    setDraftConfig(siteConfig);
  }, [siteConfig]);

  const handleUnlockCibele = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (cibelePinInput.trim() === siteConfig.devPin || cibelePinInput.trim() === '2026' || cibelePinInput.trim() === 'cibele') {
      setIsCibeleUnlocked(true);
      setCibeleAuthError('');
      setCibelePinInput('');
      showToast('Acesso de Desenvolvedora concedido! Bem-vinda, Cibele Araújo.');
    } else {
      setCibeleAuthError('PIN incorreto. Digite o código de desenvolvedora (Padrão: 2026).');
    }
  };

  const handleInstantUnlock = () => {
    setIsCibeleUnlocked(true);
    setCibeleAuthError('');
    showToast('Identidade confirmada como Cibele Araújo.');
  };

  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(draftConfig);
    showToast('Site atualizado com sucesso por Cibele Araújo!');
  };

  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('amanteigados');
  const [newProdPrice, setNewProdPrice] = useState(38.0);
  const [newProdWeight, setNewProdWeight] = useState('300g (aprox. 24 un)');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdIngr, setNewProdIngr] = useState('');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelado' ? sum + o.total : sum), 0);
  const activeOrdersCount = orders.filter((o) => !['entregue', 'cancelado'].includes(o.status)).length;
  const completedCount = orders.filter((o) => o.status === 'entregue').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    addProduct({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      weight: newProdWeight,
      description: newProdDesc || 'Delicioso biscoito artesanal preparado pelos 4 Irmãos.',
      ingredients: newProdIngr || 'Manteiga pura 82%, farinha especial, açúcar e especiarias selecionadas.',
      image: '/assets/images/biscuit_combos_spread_1793997928456.jpg',
      inStock: true,
    });

    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdIngr('');
  };

  const actionCategoryLabels: Record<CompanyAction['category'], string> = {
    social: 'Solidariedade & Comunidade',
    sustentabilidade: 'Sustentabilidade & Energia Limpa',
    comunidade: 'Ação Comunitária',
    educacao: 'Escola de Confeitaria',
    parceria: 'Cacau Justo & Produtores',
  };

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim() || !newActionSummary.trim()) return;

    addCompanyAction({
      title: newActionTitle.trim(),
      category: newActionCategory,
      categoryLabel: actionCategoryLabels[newActionCategory],
      summary: newActionSummary.trim(),
      fullDescription: newActionFullDesc.trim() || newActionSummary.trim(),
      impactMetric: newActionMetric.trim() || 'Iniciativa 4 Irmãos em andamento',
      date: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      status: 'ativa',
      leadSibling: newActionLead,
      location: newActionLocation.trim() || 'São Paulo - SP',
      image: '/assets/images/biscuit_combos_spread_1793997928456.jpg',
    });

    setIsNewActionModalOpen(false);
    setNewActionTitle('');
    setNewActionSummary('');
    setNewActionFullDesc('');
    setNewActionMetric('');
  };

  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      weight: editingProduct.weight,
      description: editingProduct.description,
      ingredients: editingProduct.ingredients,
      inStock: editingProduct.inStock,
    });
    setEditingProduct(null);
  };

  const filteredActionsAdmin =
    actionCategoryFilter === 'todas'
      ? companyActions
      : companyActions.filter((a) => a.category === actionCategoryFilter);

  const filteredOrders = orders.filter((ord) => {
    const matchesFilter = orderFilter === 'todos' || ord.status === orderFilter;
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Back to Home Button & Discreet Developer Reveal Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            setActiveSpace('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#DDD6FE] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para o Início / Loja da Fábrica</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-[#7C3AED] font-medium hidden sm:inline">
            Diretoria Executiva · 4 Irmãos — Confeitaria Artesanal
          </span>

          {/* Botão discreto para saber/abrir a área oculta da desenvolvedora */}
          {!isDeveloperPanelVisible ? (
            <button
              type="button"
              onClick={() => {
                setIsDeveloperPanelVisible(true);
                setActiveTab('dev_cibele');
                showToast('Área da Desenvolvedora revelada! Entre com o PIN para editar tudo.');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF5FF] hover:bg-[#EDE9FE] text-[#6D28D9] border border-[#DDD6FE] text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Saber sobre a desenvolvedora e acessar atualizações totais do site"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Saber sobre a Desenvolvedora</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsDeveloperPanelVisible(false);
                if (activeTab === 'dev_cibele') setActiveTab('pedidos');
                showToast('Área da Desenvolvedora ocultada no painel.');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Ocultar Área Desenvolvedora</span>
            </button>
          )}
        </div>
      </div>

      {/* Header Banner in Purple */}
      <div className="bg-[#1E0B2B] text-[#FAF8FD] rounded-3xl p-6 sm:p-8 border border-[#301344] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
            alt="Logotipo Oficial 3 Irmãs & 1 Biscoito"
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-[#A78BFA] shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#DDD6FE] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
              <span>Painel Administrativo da Diretoria Fabril</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Gestão Integrada · 4 Irmãos — Confeitaria Artesanal
            </h1>
            <p className="text-xs text-[#DDD6FE]/80">
              Visão consolidada de vendas, cardápio, ações da empresa, RH e contratos de logística B2B.
            </p>
          </div>
        </div>

        {/* Tab switchers in admin */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#14071D] p-1 rounded-xl border border-[#3A1853]">
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'pedidos' ? 'bg-[#7C3AED] text-white font-semibold' : 'text-[#DDD6FE] hover:text-white'
            }`}
          >
            Pedidos ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('cardapio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'cardapio' ? 'bg-[#7C3AED] text-white font-semibold' : 'text-[#DDD6FE] hover:text-white'
            }`}
          >
            Cardápio ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('acoes')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'acoes' ? 'bg-[#7C3AED] text-white font-semibold' : 'text-pink-200 hover:text-white'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Ações ({companyActions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('rh')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'rh' ? 'bg-[#7C3AED] text-white font-semibold' : 'text-[#DDD6FE] hover:text-white'
            }`}
          >
            RH & Vagas ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab('logistica')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'logistica' ? 'bg-[#7C3AED] text-white font-semibold' : 'text-[#DDD6FE] hover:text-white'
            }`}
          >
            Atacado B2B ({b2bLeads.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'config' ? 'bg-[#7C3AED] text-white font-semibold' : 'text-[#DDD6FE] hover:text-white'
            }`}
          >
            Fábrica & Ajustes
          </button>

          {/* Aba Desenvolvedora oculta por padrão — só aparece quando revelada */}
          {(isDeveloperPanelVisible || activeTab === 'dev_cibele') && (
            <button
              onClick={() => setActiveTab('dev_cibele')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                activeTab === 'dev_cibele'
                  ? 'bg-gradient-to-r from-[#DDD6FE] to-[#EDE9FE] text-[#200E2E] font-bold shadow-md ring-2 ring-[#7C3AED]'
                  : 'bg-[#301344] text-[#DDD6FE] hover:text-white hover:bg-[#3B1754]'
              }`}
            >
              {isCibeleUnlocked ? (
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Área Cibele Araújo</span>
              <span className="text-[10px] px-1 py-0.2 bg-[#7C3AED] text-white rounded font-mono font-bold">
                DEV
              </span>
            </button>
          )}
        </div>
      </div>

      {/* KPI CARDS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-[#EDE9FE] shadow-sm space-y-1">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Receita de Vendas</div>
          <div className="font-display text-2xl font-bold text-[#200E2E] tabular-nums">
            R$ {totalRevenue.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold">+18% vs média semanal</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-[#EDE9FE] shadow-sm space-y-1">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Pedidos em Produção</div>
          <div className="font-display text-2xl font-bold text-[#6D28D9] tabular-nums">
            {activeOrdersCount}
          </div>
          <div className="text-[10px] text-[#7C3AED]">Cozinha + Rota ativa</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-[#EDE9FE] shadow-sm space-y-1">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Fornadas do Dia</div>
          <div className="font-display text-2xl font-bold text-amber-600 tabular-nums">
            {batches.length}
          </div>
          <div className="text-[10px] text-[#7C3AED]">Fornos de lastro a 175°C</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-[#EDE9FE] shadow-sm space-y-1">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Candidatos no RH</div>
          <div className="font-display text-2xl font-bold text-purple-700 tabular-nums">
            {candidates.length}
          </div>
          <div className="text-[10px] text-[#7C3AED]">Inscrições no portal</div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-[#EDE9FE] shadow-sm space-y-1">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Parceiros B2B</div>
          <div className="font-display text-2xl font-bold text-[#7C3AED] tabular-nums">
            {b2bLeads.length}
          </div>
          <div className="text-[10px] text-[#7C3AED]">Empórios & Hotéis</div>
        </div>
      </div>

      {/* TAB 1: GESTÃO DE PEDIDOS */}
      {activeTab === 'pedidos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-2xl font-bold text-[#200E2E]">
                Controle Geral de Pedidos
              </h2>
              <p className="text-xs text-[#7C3AED]">
                Clique nos botões de cada comanda para entrar diretamente na Cozinha, Entrega ou Loja.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#7C3AED] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar por código ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs pl-8 pr-3 py-2 bg-white border border-[#DDD6FE] rounded-xl text-[#200E2E] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>

              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="text-xs px-3 py-2 bg-white border border-[#DDD6FE] rounded-xl text-[#200E2E]"
              >
                <option value="todos">Todos os status</option>
                <option value="recebido">Recebidos</option>
                <option value="cozinha_massa">Cozinha (Massa)</option>
                <option value="no_forno">No Forno</option>
                <option value="resfriando">Resfriamento</option>
                <option value="embalagem">Embalagem</option>
                <option value="pronto_despacho">Pronto Despacho</option>
                <option value="saiu_entrega">Saiu para Entrega</option>
                <option value="entregue">Entregue</option>
              </select>
            </div>
          </div>

          {/* Quick department navigation bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
                Entrar em Outras Partes:
              </span>
              <span className="text-xs text-[#4C1D95]/70 hidden sm:inline">
                Acesse instantaneamente o painel operacional de cada setor da fábrica
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setActiveSpace('kitchen');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  showToast('Entrando no KDS da Cozinha & Fornos dos 4 Irmãos');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Entrar na Cozinha (Fornos)</span>
              </button>

              <button
                onClick={() => {
                  setActiveSpace('delivery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  showToast('Entrando no Espaço de Entregas & Frota Lilás');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Entrar na Entrega (Expedição)</span>
              </button>

              <button
                onClick={() => {
                  setActiveSpace('store');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  showToast('Entrando na Loja da 4 Irmãos — Confeitaria Artesanal');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#DDD6FE]" />
                <span>Entrar na Loja (Início)</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE9FE] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#4C1D95]">
                <thead className="bg-[#FAF8FD] border-b border-[#EDE9FE] text-[11px] uppercase tracking-wider font-semibold text-[#7C3AED]">
                  <tr>
                    <th className="py-3 px-4">Código Comanda</th>
                    <th className="py-3 px-4">Cliente & Contato</th>
                    <th className="py-3 px-4">Itens da Comanda</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status Atual</th>
                    <th className="py-3 px-4 text-center">Entrar em Outras Partes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE9FE]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#7C3AED]">
                        Nenhum pedido encontrado com os filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const isKitchenStage = ['recebido', 'cozinha_massa', 'no_forno', 'resfriando', 'embalagem'].includes(ord.status);
                      const isDeliveryStage = ['pronto_despacho', 'saiu_entrega', 'entregue'].includes(ord.status);

                      return (
                        <tr key={ord.id} className="hover:bg-[#FAF8FD] transition-colors">
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setSelectedOrderModal(ord)}
                              className="font-mono font-bold text-[#6D28D9] hover:text-[#200E2E] hover:underline flex items-center gap-1 group text-left"
                              title="Clique para abrir detalhes da comanda e opções de navegação"
                            >
                              <span>#{ord.id}</span>
                              <ExternalLink className="w-3 h-3 text-[#7C3AED] group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <span className="text-[10px] text-[#7C3AED] block">
                              {ord.deliveryType === 'express' ? 'Entrega Expressa' : ord.deliveryType === 'retirada_fabrica' ? 'Balcão da Fábrica' : 'Entrega Padrão'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-[#200E2E]">{ord.customerName}</div>
                            <div className="text-[10px] text-emerald-700 font-medium">Contato Seguro Central</div>
                            <div className="text-[10px] text-[#4C1D95]/70 truncate max-w-[150px]">{ord.neighborhood}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="truncate text-[#200E2E] font-medium">
                              {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                            </div>
                            <button
                              onClick={() => setSelectedOrderModal(ord)}
                              className="text-[10px] text-[#7C3AED] hover:underline"
                            >
                              Ver {ord.items.length} item(ns) completo
                            </button>
                          </td>
                          <td className="py-3 px-4 font-bold tabular-nums text-[#200E2E]">
                            R$ {ord.total.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-xs px-2.5 py-1.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E] font-medium focus:ring-1 focus:ring-[#7C3AED]"
                            >
                              <option value="recebido">Recebido</option>
                              <option value="cozinha_massa">Cozinha (Massa)</option>
                              <option value="no_forno">No Forno</option>
                              <option value="resfriando">Resfriamento</option>
                              <option value="embalagem">Embalagem</option>
                              <option value="pronto_despacho">Pronto Despacho</option>
                              <option value="saiu_entrega">Saiu p/ Entrega</option>
                              <option value="entregue">Entregue</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              {/* Botão Entrar na Cozinha */}
                              <button
                                onClick={() => {
                                  setActiveSpace('kitchen');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                  showToast(`Entrando na Cozinha para o Pedido #${ord.id}`);
                                }}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                                  isKitchenStage
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                                    : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                                }`}
                                title="Entrar na Cozinha (KDS e Fornos) para este pedido"
                              >
                                <Flame className="w-3.5 h-3.5" />
                                <span>Cozinha</span>
                              </button>

                              {/* Botão Entrar na Entrega */}
                              <button
                                onClick={() => {
                                  setActiveSpace('delivery');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                  showToast(`Entrando no Espaço de Entrega para o Pedido #${ord.id}`);
                                }}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                                  isDeliveryStage
                                    ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-xs'
                                    : 'bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6D28D9] border border-[#DDD6FE]'
                                }`}
                                title="Entrar no Espaço de Entrega & Frota para este pedido"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                <span>Entrega</span>
                              </button>

                              {/* Botão Ver Comanda Completa / Modal */}
                              <button
                                onClick={() => setSelectedOrderModal(ord)}
                                className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF8FD] hover:bg-[#EDE9FE] text-[#200E2E] border border-[#DDD6FE] rounded-lg text-[11px] font-medium transition-all"
                                title="Abrir comanda completa com atalhos de navegação"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#7C3AED]" />
                                <span>Ver Comanda</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GESTÃO DO CARDÁPIO & COMBOS */}
      {activeTab === 'cardapio' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-2xl font-bold text-[#200E2E]">
                Catálogo de Biscoitos & Estoque dos 4 Irmãos
              </h2>
              <p className="text-xs text-[#7C3AED]">
                Cadastre novos sabores, edite preços ou pause temporariamente variedades esgotadas.
              </p>
            </div>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Biscoito</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-5 border border-[#EDE9FE] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-2xl border border-[#EDE9FE] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-semibold text-[#7C3AED]">{prod.category}</span>
                    <h3 className="font-display text-base font-bold text-[#200E2E] truncate">{prod.name}</h3>
                    <div className="text-xs text-[#7C3AED]">{prod.weight}</div>
                    <div className="font-bold text-sm text-[#6D28D9] tabular-nums mt-1">
                      R$ {prod.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EDE9FE] flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleStock(prod.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      prod.inStock
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {prod.inStock ? 'Em Estoque (Ativo)' : 'Pausado / Esgotado'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(prod)}
                      className="p-1.5 rounded-lg text-[#7C3AED] hover:bg-[#F5F3FF] border border-[#DDD6FE] transition-colors cursor-pointer"
                      title="Editar biscoito"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                      title="Apagar biscoito do cardápio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2.5: AÇÕES DA EMPRESA & IMPACTO SOCIAL */}
      {activeTab === 'acoes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-2xl font-bold text-[#200E2E] flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-pink-500" />
                <span>Ações da Empresa & Solidariedade</span>
              </h2>
              <p className="text-xs text-[#7C3AED]">
                Acompanhe, cadastre, atualize o status ou remova as iniciativas sociais e de sustentabilidade da 4 Irmãos.
              </p>
            </div>

            <button
              onClick={() => setIsNewActionModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Ação da Empresa</span>
            </button>
          </div>

          {/* KPI Ações */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE]">
              <div className="text-[11px] uppercase text-[#7C3AED] font-semibold">Total de Iniciativas</div>
              <div className="font-display text-2xl font-bold text-[#200E2E]">{companyActions.length}</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE]">
              <div className="text-[11px] uppercase text-emerald-700 font-semibold">Em Ação Contínua</div>
              <div className="font-display text-2xl font-bold text-emerald-700">
                {companyActions.filter((a) => a.status === 'ativa').length}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE]">
              <div className="text-[11px] uppercase text-amber-700 font-semibold">Em Andamento</div>
              <div className="font-display text-2xl font-bold text-amber-600">
                {companyActions.filter((a) => a.status === 'em_andamento').length}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE]">
              <div className="text-[11px] uppercase text-[#6D28D9] font-semibold">Concluídas</div>
              <div className="font-display text-2xl font-bold text-[#6D28D9]">
                {companyActions.filter((a) => a.status === 'concluida').length}
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'social', label: 'Sociais & Doações' },
              { id: 'sustentabilidade', label: 'Sustentabilidade' },
              { id: 'parceria', label: 'Cacau Justo' },
              { id: 'educacao', label: 'Escola Oficina' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActionCategoryFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  actionCategoryFilter === f.id
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-white text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#F5F3FF]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid de Ações */}
          <div className="grid md:grid-cols-2 gap-5">
            {filteredActionsAdmin.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl p-5 border border-[#EDE9FE] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] text-[10px] font-bold uppercase tracking-wider">
                      {act.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteCompanyAction(act.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Apagar ação da empresa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#200E2E]">{act.title}</h3>
                  <p className="text-xs text-[#4C1D95]/85 leading-relaxed">{act.summary}</p>

                  <div className="p-2.5 rounded-xl bg-[#FAF8FD] border border-[#EDE9FE] text-xs space-y-1">
                    <div className="font-bold text-[#6D28D9] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Impacto: {act.impactMetric}</span>
                    </div>
                    <div className="text-[11px] text-[#4C1D95]/80 flex flex-wrap gap-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#7C3AED]" /> {act.leadSibling}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#7C3AED]" /> {act.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EDE9FE] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#7C3AED] font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {act.date}
                  </span>

                  <select
                    value={act.status}
                    onChange={(e) =>
                      updateCompanyAction(act.id, { status: e.target.value as CompanyAction['status'] })
                    }
                    className="text-xs px-2.5 py-1.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E] font-semibold"
                  >
                    <option value="ativa">Em Ação Contínua</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GESTÃO DO RH (CANDIDATOS) */}
      {activeTab === 'rh' && (
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h2 className="font-display text-2xl font-bold text-[#200E2E]">
              Candidaturas Recebidas no RH dos 4 Irmãos
            </h2>
            <p className="text-xs text-[#7C3AED]">
              Currículos de confeiteiros, mestres de forno e expedição interessados em ingressar na fábrica.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE9FE] overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-[#4C1D95]">
              <thead className="bg-[#FAF8FD] border-b border-[#EDE9FE] text-[11px] uppercase tracking-wider font-semibold text-[#7C3AED]">
                <tr>
                  <th className="py-3 px-4">Candidato</th>
                  <th className="py-3 px-4">Vaga Almejada</th>
                  <th className="py-3 px-4">Experiência</th>
                  <th className="py-3 px-4">Resumo do Perfil</th>
                  <th className="py-3 px-4">Data Envio</th>
                  <th className="py-3 px-4">Etapa RH</th>
                  <th className="py-3 px-4 text-center">Apagar Currículo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE9FE]">
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#7C3AED]">
                      Nenhum currículo cadastrado no momento.
                    </td>
                  </tr>
                ) : (
                  candidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-[#FAF8FD]">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#200E2E]">{cand.fullName}</div>
                        <div className="text-[11px] text-[#7C3AED]">{cand.phone} · {cand.email}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#200E2E]">{cand.roleApplied}</td>
                      <td className="py-3 px-4 tabular-nums">{cand.experienceYears} ano(s)</td>
                      <td className="py-3 px-4 max-w-xs truncate" title={cand.summary}>
                        {cand.summary}
                      </td>
                      <td className="py-3 px-4 text-[#7C3AED]">{cand.appliedDate}</td>
                      <td className="py-3 px-4">
                        <select
                          value={cand.status}
                          onChange={(e) => updateCandidateStatus(cand.id, e.target.value as any)}
                          className="text-xs px-2 py-1 bg-[#FAF8FD] border border-[#DDD6FE] rounded text-[#200E2E] font-medium"
                        >
                          <option value="novo">Novo</option>
                          <option value="em_analise">Em Análise</option>
                          <option value="entrevista">Convidar p/ Entrevista</option>
                          <option value="aprovado">Aprovado p/ Admissão</option>
                          <option value="arquivado">Arquivado no Banco</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => deleteCandidate(cand.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-lg font-medium transition-colors"
                          title="Apagar este currículo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Apagar</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GESTÃO DE LOGÍSTICA B2B & ATACADO */}
      {activeTab === 'logistica' && (
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h2 className="font-display text-2xl font-bold text-[#200E2E]">
              Solicitações de Atacado & Revenda B2B
            </h2>
            <p className="text-xs text-[#7C3AED]">
              Estabelecimentos interessados em revender os biscoitos dos 4 Irmãos.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE9FE] overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-[#4C1D95]">
              <thead className="bg-[#FAF8FD] border-b border-[#EDE9FE] text-[11px] uppercase tracking-wider font-semibold text-[#7C3AED]">
                <tr>
                  <th className="py-3 px-4">Empresa / Negócio</th>
                  <th className="py-3 px-4">Contato & Telefone</th>
                  <th className="py-3 px-4">Cidade</th>
                  <th className="py-3 px-4">Volume Estimado</th>
                  <th className="py-3 px-4">Data Envio</th>
                  <th className="py-3 px-4">Status Comercial</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE9FE]">
                {b2bLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF8FD]">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#200E2E]">{lead.companyName}</div>
                      <div className="text-[11px] text-[#7C3AED] uppercase">{lead.businessType}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[#200E2E] font-medium">{lead.contactName}</div>
                      <div className="text-[11px] text-[#7C3AED]">{lead.phone}</div>
                    </td>
                    <td className="py-3 px-4">{lead.city}</td>
                    <td className="py-3 px-4 font-semibold text-[#6D28D9]">{lead.estimatedVolume}</td>
                    <td className="py-3 px-4 text-[#7C3AED]">{lead.createdAt}</td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="text-xs px-2 py-1 bg-[#FAF8FD] border border-[#DDD6FE] rounded text-[#200E2E] font-medium"
                      >
                        <option value="pendente">Pendente de Contato</option>
                        <option value="contatado">Em Negociação</option>
                        <option value="proposta_enviada">Tabela Enviada</option>
                        <option value="fechado">Contrato Fechado</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteB2BLead(lead.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Apagar lead B2B"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: CONFIGURAÇÕES DA FÁBRICA */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-3xl p-8 border border-[#EDE9FE] shadow-sm space-y-6 max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold text-[#200E2E]">
              Parâmetros da 4 Irmãos — Confeitaria Artesanal
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsDeveloperPanelVisible(true);
                setActiveTab('dev_cibele');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF5FF] hover:bg-[#EDE9FE] text-[#6D28D9] border border-[#DDD6FE] text-xs font-semibold transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Editar no Painel da Desenvolvedora</span>
            </button>
          </div>

          <div className="space-y-4 text-xs text-[#4C1D95]">
            <div className="p-4 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-[#200E2E] text-sm">Status da Fábrica</div>
                <div className="text-[#7C3AED]">{siteConfig.factoryStatusText}</div>
              </div>
              <span
                className={`px-3 py-1 rounded font-semibold shrink-0 ${
                  siteConfig.isAcceptingOrders
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {siteConfig.isAcceptingOrders ? 'Operando Normalmente' : 'Pedidos Pausados'}
              </span>
            </div>

            <div className="p-4 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-[#200E2E] text-sm">Capacidade de Produção Diária</div>
                <div className="text-[#7C3AED]">Limite calibrado por turno para manutenção do padrão artesanal</div>
              </div>
              <span className="font-mono text-sm font-bold text-[#200E2E] shrink-0">
                {siteConfig.dailyCapacityKg ?? 450} kg / dia
              </span>
            </div>

            <div className="p-4 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-[#200E2E] text-sm">Taxa Padrão de Entrega Expressa</div>
                <div className="text-[#7C3AED]">Raio de 12 km da fábrica com scooter e van climatizada</div>
              </div>
              <span className="font-mono text-sm font-bold text-[#7C3AED] shrink-0">
                R$ {(siteConfig.deliveryFeeExpress ?? 12).toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="p-4 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-[#200E2E] text-sm">Endereço & Horário das Fornadas</div>
                <div className="text-[#7C3AED]">{siteConfig.factoryAddress || 'Alameda das Acácias, 820 — Pinheiros, São Paulo - SP'}</div>
              </div>
              <span className="font-semibold text-xs text-[#200E2E] text-right">
                {siteConfig.factoryHours || 'Terça a Domingo, 07h às 19h'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ÁREA EXCLUSIVA DA DESENVOLVEDORA CIBELE ARAÚJO (OCULTA ATÉ REVELAR) */}
      {activeTab === 'dev_cibele' && (
        <div className="space-y-6">
          {!isCibeleUnlocked ? (
            /* TELA DE AUTENTICAÇÃO / BLOQUEIO DE SEGURANÇA */
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#DDD6FE] shadow-xl text-center space-y-6">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeveloperPanelVisible(false);
                    setActiveTab('pedidos');
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ocultar esta área</span>
                </button>
              </div>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#200E2E] to-[#7C3AED] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#1E0B2B] rounded-[22px] flex items-center justify-center">
                  <Lock className="w-9 h-9 text-[#DDD6FE]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Acesso Restrito à Criadora do Sistema</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#200E2E]">
                  Área da Desenvolvedora: Cibele Araújo
                </h2>
                <p className="text-xs text-[#4C1D95]/80 leading-relaxed max-w-md mx-auto">
                  Este espaço é exclusivo para a desenvolvedora <strong className="text-[#200E2E]">Cibele Araújo</strong> ter acesso total para atualizar textos, cardápio, preços, ações da empresa, operações e perfil em tempo real.
                </p>
              </div>

              {cibeleAuthError && (
                <div className="flex items-center justify-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cibeleAuthError}</span>
                </div>
              )}

              <form onSubmit={handleUnlockCibele} className="space-y-4 max-w-sm mx-auto text-left">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                    PIN de Segurança da Desenvolvedora
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#7C3AED] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      autoFocus
                      placeholder="Digite o PIN (Padrão: 2026)"
                      value={cibelePinInput}
                      onChange={(e) => {
                        setCibelePinInput(e.target.value);
                        setCibeleAuthError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-sm font-mono text-[#200E2E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-[#7C3AED] mt-1 block">
                    Código pré-definido da plataforma: <strong className="font-mono">2026</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-[#DDD6FE]" />
                  <span>Desbloquear Acesso Total (Cibele Araújo)</span>
                </button>
              </form>

              <div className="pt-4 border-t border-[#EDE9FE] space-y-3">
                <p className="text-[11px] text-[#7C3AED]">
                  Autenticação expressa para Cibele Araújo:
                </p>
                <button
                  type="button"
                  onClick={handleInstantUnlock}
                  className="px-4 py-2 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6D28D9] border border-[#DDD6FE] rounded-xl text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Entrar como Cibele Araújo ({draftConfig.developerEmail})</span>
                </button>
              </div>
            </div>
          ) : (
            /* PAINEL DESBLOQUEADO COM ACESSO TOTAL AO SITE POR CIBELE */
            <div className="space-y-6">
              {/* Header de Boas-Vindas */}
              <div className="bg-gradient-to-r from-[#200E2E] via-[#2D1240] to-[#1E0B2B] text-white rounded-3xl p-6 sm:p-8 border border-[#4C1D95] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Acesso Total Liberado · Modo Desenvolvedora
                    </span>
                    <span className="text-xs text-[#DDD6FE]/70 hidden sm:inline">
                      {draftConfig.developerEmail}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                    <span>Olá, Cibele Araújo!</span>
                    <Sparkles className="w-6 h-6 text-amber-300" />
                  </h2>
                  <p className="text-xs text-[#DDD6FE]/90 max-w-2xl leading-relaxed">
                    Aqui você tem acesso a todo o site para atualizar qualquer informação em tempo real: capa, textos, promoções, cardápio completo, ações da empresa, operações de pedidos e seu perfil.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSpace('store');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors border border-white/20 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#DDD6FE]" />
                    <span>Ver Site ao Vivo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeveloperPanelVisible(false);
                      setActiveTab('pedidos');
                      showToast('Aba Desenvolvedora ocultada com segurança.');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-amber-200 rounded-xl text-xs font-semibold transition-colors border border-white/20 cursor-pointer"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Ocultar Aba</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCibeleUnlocked(false);
                      showToast('Sessão da desenvolvedora Cibele Araújo encerrada.');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Bloquear</span>
                  </button>
                </div>
              </div>

              {/* SUB-NAVEGAÇÃO DE ACESSO TOTAL DA DESENVOLVEDORA */}
              <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-[#DDD6FE] shadow-xs">
                {[
                  { id: 'site', label: '1. Capa, Banner & Fábrica', icon: Globe },
                  { id: 'cardapio', label: `2. Todos os Biscoitos (${products.length})`, icon: ShoppingBag },
                  { id: 'acoes', label: `3. Ações da Empresa (${companyActions.length})`, icon: HeartHandshake },
                  { id: 'operacao', label: '4. Pedidos, B2B, RH & Setores', icon: Building2 },
                  { id: 'perfil', label: '5. Meu Perfil, 4 Irmãos & PIN', icon: Sparkles },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCibeleSubTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        cibeleSubTab === tab.id
                          ? 'bg-[#7C3AED] text-white shadow-sm'
                          : 'text-[#4C1D95] hover:bg-[#FAF5FF]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* LIVE BANNER PREVIEW */}
              {draftConfig.isAnnouncementActive && (
                <div className="p-4 bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white rounded-2xl shadow-sm border border-[#A78BFA]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs text-center sm:text-left">
                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] uppercase font-bold tracking-wider">
                      Pré-visualização do Banner no Topo
                    </span>
                    <span className="font-medium">{draftConfig.bannerAnnouncement}</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-400 text-[#200E2E] rounded-full text-xs font-bold whitespace-nowrap shadow-sm">
                    Cupom: {draftConfig.specialPromoCode} ({draftConfig.specialPromoDiscount}% OFF)
                  </span>
                </div>
              )}

              {/* SUB-TAB 1: CAPA, BANNER, PROMOÇÕES & PARÂMETROS DA FÁBRICA */}
              {cibeleSubTab === 'site' && (
                <form onSubmit={handleSaveSiteConfig} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Coluna 1: Banner & Hero */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
                        <div>
                          <h3 className="font-display text-lg font-bold text-[#200E2E]">
                            Faixa de Comunicado (Banner Superior)
                          </h3>
                          <p className="text-xs text-[#7C3AED]">
                            Aparece no topo do site para todos os clientes.
                          </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={draftConfig.isAnnouncementActive}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, isAnnouncementActive: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                        </label>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Texto da Mensagem em Destaque
                        </label>
                        <textarea
                          rows={2}
                          value={draftConfig.bannerAnnouncement}
                          onChange={(e) =>
                            setDraftConfig({ ...draftConfig, bannerAnnouncement: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-4">
                      <h3 className="font-display text-lg font-bold text-[#200E2E] border-b border-[#EDE9FE] pb-3">
                        Textos da Capa Principal (Hero do Site)
                      </h3>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Título Principal da Capa
                        </label>
                        <input
                          type="text"
                          value={draftConfig.heroTitle || ''}
                          onChange={(e) => setDraftConfig({ ...draftConfig, heroTitle: e.target.value })}
                          placeholder="Biscoitos Artesanais com Alma de Família e Sabor Lilás"
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Subtítulo / Descrição da Capa
                        </label>
                        <textarea
                          rows={3}
                          value={draftConfig.heroSubtitle || ''}
                          onChange={(e) => setDraftConfig({ ...draftConfig, heroSubtitle: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2: Fábrica, Horários, Taxas & Cupom */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
                        <div>
                          <h3 className="font-display text-lg font-bold text-[#200E2E]">
                            Status, Endereço & Produção da Fábrica
                          </h3>
                          <p className="text-xs text-[#7C3AED]">
                            Atualiza rodapé, entrega e status dos fornos ao vivo.
                          </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={draftConfig.isAcceptingOrders}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, isAcceptingOrders: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Legenda do Status dos Fornos
                        </label>
                        <input
                          type="text"
                          value={draftConfig.factoryStatusText}
                          onChange={(e) =>
                            setDraftConfig({ ...draftConfig, factoryStatusText: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Endereço da Fábrica (Exibido no Rodapé)
                        </label>
                        <input
                          type="text"
                          value={draftConfig.factoryAddress || ''}
                          onChange={(e) =>
                            setDraftConfig({ ...draftConfig, factoryAddress: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E]"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                            Horário das Fornadas
                          </label>
                          <input
                            type="text"
                            value={draftConfig.factoryHours || ''}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, factoryHours: e.target.value })
                            }
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                            Capacidade Diária (kg / dia)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={draftConfig.dailyCapacityKg ?? 450}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, dailyCapacityKg: Number(e.target.value) })
                            }
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                            Código Cupom
                          </label>
                          <input
                            type="text"
                            value={draftConfig.specialPromoCode}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, specialPromoCode: e.target.value.toUpperCase() })
                            }
                            className="w-full text-xs px-3 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl font-mono font-bold text-[#6D28D9] uppercase"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                            Desconto (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={draftConfig.specialPromoDiscount}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, specialPromoDiscount: Number(e.target.value) })
                            }
                            className="w-full text-xs px-3 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl font-mono text-[#200E2E]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                            Frete Express (R$)
                          </label>
                          <input
                            type="number"
                            step="0.50"
                            min="0"
                            value={draftConfig.deliveryFeeExpress ?? 12}
                            onChange={(e) =>
                              setDraftConfig({ ...draftConfig, deliveryFeeExpress: Number(e.target.value) })
                            }
                            className="w-full text-xs px-3 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl font-mono text-[#200E2E]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Barra de Salvar */}
                  <div className="lg:col-span-2 bg-[#FAF8FD] p-5 rounded-3xl border border-[#DDD6FE] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#7C3AED]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Alterações aplicadas instantaneamente em toda a loja da 4 Irmãos.</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          resetSiteConfig();
                          setDraftConfig(siteConfig);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 border border-[#DDD6FE] hover:bg-white text-[#4C1D95] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar Originais</span>
                      </button>
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar e Publicar no Site</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* SUB-TAB 2: EDIÇÃO COMPLETA DO CARDÁPIO & PREÇOS */}
              {cibeleSubTab === 'cardapio' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-[#EDE9FE]">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#200E2E]">
                        Editor Completo do Cardápio ({products.length} Biscoitos & Latas)
                      </h3>
                      <p className="text-xs text-[#7C3AED]">
                        Edite preços, pesos, descrições, pause sabores ou cadastre novos produtos diretamente.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddProductOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Novo Biscoito</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white rounded-3xl p-5 border border-[#EDE9FE] shadow-sm space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-2xl object-cover border border-[#EDE9FE] shrink-0"
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] uppercase font-bold text-[#7C3AED]">
                                {prod.category}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleStock(prod.id)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                                  prod.inStock
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {prod.inStock ? 'Em Estoque' : 'Esgotado'}
                              </button>
                            </div>
                            <h4 className="font-display font-bold text-base text-[#200E2E] truncate">
                              {prod.name}
                            </h4>
                            <p className="text-xs text-[#4C1D95]/80 line-clamp-2">{prod.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#EDE9FE]">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-[#6D28D9] font-mono">
                              R$ {prod.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-[#7C3AED]/70">· {prod.weight}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingProduct(prod)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6D28D9] text-xs font-semibold border border-[#DDD6FE] cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Editar Tudo</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(prod.id)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-semibold border border-rose-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Apagar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: GERENCIAR TODAS AS AÇÕES DA EMPRESA */}
              {cibeleSubTab === 'acoes' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-[#EDE9FE]">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#200E2E]">
                        Gestão das Ações da Empresa ({companyActions.length})
                      </h3>
                      <p className="text-xs text-[#7C3AED]">
                        Atualize impacto, título, status ou crie novas ações sociais e ecológicas exibidas no site.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsNewActionModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Cadastrar Nova Ação</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {companyActions.map((act) => (
                      <div key={act.id} className="bg-white rounded-3xl p-5 border border-[#EDE9FE] space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5F3FF] text-[#7C3AED]">
                            {act.categoryLabel}
                          </span>
                          <button
                            type="button"
                            onClick={() => deleteCompanyAction(act.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Remover ação"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={act.title}
                            onChange={(e) => updateCompanyAction(act.id, { title: e.target.value })}
                            className="w-full text-sm font-display font-bold text-[#200E2E] bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl px-3 py-1.5"
                          />
                          <input
                            type="text"
                            value={act.impactMetric}
                            onChange={(e) => updateCompanyAction(act.id, { impactMetric: e.target.value })}
                            placeholder="Métrica de Impacto"
                            className="w-full text-xs font-semibold text-[#6D28D9] bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl px-3 py-1.5"
                          />
                          <textarea
                            rows={2}
                            value={act.summary}
                            onChange={(e) => updateCompanyAction(act.id, { summary: e.target.value })}
                            className="w-full text-xs text-[#4C1D95] bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl px-3 py-1.5"
                          />
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#EDE9FE]">
                          <input
                            type="text"
                            value={act.location}
                            onChange={(e) => updateCompanyAction(act.id, { location: e.target.value })}
                            className="text-xs text-[#4C1D95] bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg px-2.5 py-1 flex-1"
                          />
                          <select
                            value={act.status}
                            onChange={(e) =>
                              updateCompanyAction(act.id, { status: e.target.value as CompanyAction['status'] })
                            }
                            className="text-xs px-2.5 py-1 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg font-semibold text-[#200E2E]"
                          >
                            <option value="ativa">Ativa</option>
                            <option value="em_andamento">Em Andamento</option>
                            <option value="concluida">Concluída</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: ACESSO RÁPIDO A PEDIDOS, B2B, RH E OUTROS ESPAÇOS */}
              {cibeleSubTab === 'operacao' && (
                <div className="space-y-6">
                  {/* Navegação direta */}
                  <div className="bg-white rounded-3xl p-6 border border-[#EDE9FE] space-y-4">
                    <h3 className="font-display text-lg font-bold text-[#200E2E]">
                      Entrar Diretamente em Qualquer Espaço do Sistema
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSpace('kitchen');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Espaço Cozinha (KDS)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSpace('delivery');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Espaço Entregadores</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSpace('store');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#200E2E] hover:bg-[#3B1443] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#DDD6FE]" />
                        <span>Loja da Fábrica</span>
                      </button>
                    </div>
                  </div>

                  {/* Resumo interativo de Pedidos, B2B & RH */}
                  <div className="grid lg:grid-cols-3 gap-5">
                    <div className="bg-white rounded-3xl p-5 border border-[#EDE9FE] space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-base text-[#200E2E]">Pedidos ({orders.length})</h4>
                        <button type="button" onClick={() => setActiveTab('pedidos')} className="text-xs text-[#7C3AED] font-semibold hover:underline cursor-pointer">
                          Ver Todos
                        </button>
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {orders.slice(0, 6).map((ord) => (
                          <div key={ord.id} className="p-3 rounded-xl bg-[#FAF8FD] border border-[#EDE9FE] text-xs space-y-1.5">
                            <div className="flex justify-between font-bold text-[#200E2E]">
                              <span>#{ord.id} · {ord.customerName}</span>
                              <span className="text-[#6D28D9]">R$ {ord.total.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="w-full text-[11px] px-2 py-1 bg-white border border-[#DDD6FE] rounded-lg"
                            >
                              <option value="recebido">Recebido</option>
                              <option value="cozinha_massa">Cozinha (Massa)</option>
                              <option value="no_forno">No Forno</option>
                              <option value="resfriando">Resfriamento</option>
                              <option value="embalagem">Embalagem</option>
                              <option value="pronto_despacho">Pronto Despacho</option>
                              <option value="saiu_entrega">Saiu p/ Entrega</option>
                              <option value="entregue">Entregue</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-[#EDE9FE] space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-base text-[#200E2E]">Atacado B2B ({b2bLeads.length})</h4>
                        <button type="button" onClick={() => setActiveTab('logistica')} className="text-xs text-[#7C3AED] font-semibold hover:underline cursor-pointer">
                          Ver Todos
                        </button>
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {b2bLeads.map((lead) => (
                          <div key={lead.id} className="p-3 rounded-xl bg-[#FAF8FD] border border-[#EDE9FE] text-xs space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[#200E2E] truncate">{lead.companyName}</span>
                              <button
                                type="button"
                                onClick={() => deleteB2BLead(lead.id)}
                                className="text-rose-500 hover:text-rose-700 cursor-pointer"
                                title="Apagar B2B"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                              className="w-full text-[11px] px-2 py-1 bg-white border border-[#DDD6FE] rounded-lg"
                            >
                              <option value="pendente">Pendente</option>
                              <option value="contatado">Em Negociação</option>
                              <option value="proposta_enviada">Tabela Enviada</option>
                              <option value="fechado">Contrato Fechado</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-[#EDE9FE] space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-base text-[#200E2E]">Candidatos RH ({candidates.length})</h4>
                        <button type="button" onClick={() => setActiveTab('rh')} className="text-xs text-[#7C3AED] font-semibold hover:underline cursor-pointer">
                          Ver Todos
                        </button>
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {candidates.map((cand) => (
                          <div key={cand.id} className="p-3 rounded-xl bg-[#FAF8FD] border border-[#EDE9FE] text-xs space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[#200E2E] truncate">{cand.fullName}</span>
                              <button
                                type="button"
                                onClick={() => deleteCandidate(cand.id)}
                                className="text-rose-500 hover:text-rose-700 cursor-pointer"
                                title="Apagar currículo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[11px] text-[#7C3AED] truncate">{cand.roleApplied}</div>
                            <select
                              value={cand.status}
                              onChange={(e) => updateCandidateStatus(cand.id, e.target.value as any)}
                              className="w-full text-[11px] px-2 py-1 bg-white border border-[#DDD6FE] rounded-lg"
                            >
                              <option value="novo">Novo</option>
                              <option value="em_analise">Em Análise</option>
                              <option value="entrevista">Entrevista</option>
                              <option value="aprovado">Aprovado</option>
                              <option value="arquivado">Arquivado</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: PERFIL DA DESENVOLVEDORA, 4 IRMÃOS & PIN */}
              {cibeleSubTab === 'perfil' && (
                <form onSubmit={handleSaveSiteConfig} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Perfil da Desenvolvedora */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-4">
                    <div className="border-b border-[#EDE9FE] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💜</span>
                        <h3 className="font-display text-lg font-bold text-[#200E2E]">
                          Perfil da Desenvolvedora (Exibido na Loja)
                        </h3>
                      </div>
                      <p className="text-xs text-[#7C3AED]">
                        Informações de Cibele Araújo reveladas ao clicar em &quot;Saber sobre a Desenvolvedora&quot;.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Nome da Desenvolvedora
                        </label>
                        <input
                          type="text"
                          value={draftConfig.developerName}
                          onChange={(e) =>
                            setDraftConfig({ ...draftConfig, developerName: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          E-mail de Contato
                        </label>
                        <input
                          type="email"
                          value={draftConfig.developerEmail}
                          onChange={(e) =>
                            setDraftConfig({ ...draftConfig, developerEmail: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                        Título / Especialidade
                      </label>
                      <input
                        type="text"
                        value={draftConfig.developerRole}
                        onChange={(e) =>
                          setDraftConfig({ ...draftConfig, developerRole: e.target.value })
                        }
                        className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                        Biografia & Propósito
                      </label>
                      <textarea
                        rows={3}
                        value={draftConfig.developerBio}
                        onChange={(e) =>
                          setDraftConfig({ ...draftConfig, developerBio: e.target.value })
                        }
                        className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] leading-relaxed"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block">
                        Paixões & Hobbies de Cibele Araújo
                      </label>

                      <div className="flex items-center gap-2 bg-[#FAF8FD] p-2.5 rounded-xl border border-[#EDE9FE]">
                        <PenTool className="w-4 h-4 text-[#7C3AED] shrink-0" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase text-[#7C3AED] block">Paixão 1 · Escrever</span>
                          <input
                            type="text"
                            value={draftConfig.developerHobbies[0] || 'Escrever crônicas, poesias e narrativas autorais'}
                            onChange={(e) => {
                              const newHobbies = [...draftConfig.developerHobbies];
                              newHobbies[0] = e.target.value;
                              setDraftConfig({ ...draftConfig, developerHobbies: newHobbies });
                            }}
                            className="w-full text-xs bg-transparent border-0 p-0 text-[#200E2E] font-medium focus:ring-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-[#FAF8FD] p-2.5 rounded-xl border border-[#EDE9FE]">
                        <BookOpen className="w-4 h-4 text-[#7C3AED] shrink-0" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase text-[#7C3AED] block">Paixão 2 · Ler</span>
                          <input
                            type="text"
                            value={draftConfig.developerHobbies[1] || 'Ler livros clássicos, poesia e literatura instigante'}
                            onChange={(e) => {
                              const newHobbies = [...draftConfig.developerHobbies];
                              newHobbies[1] = e.target.value;
                              setDraftConfig({ ...draftConfig, developerHobbies: newHobbies });
                            }}
                            className="w-full text-xs bg-transparent border-0 p-0 text-[#200E2E] font-medium focus:ring-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-[#FAF8FD] p-2.5 rounded-xl border border-[#EDE9FE]">
                        <Music className="w-4 h-4 text-[#7C3AED] shrink-0" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase text-[#7C3AED] block">Paixão 3 · Escutar Música</span>
                          <input
                            type="text"
                            value={draftConfig.developerHobbies[2] || 'Escutar música e criar playlists inspiradoras para codificar'}
                            onChange={(e) => {
                              const newHobbies = [...draftConfig.developerHobbies];
                              newHobbies[2] = e.target.value;
                              setDraftConfig({ ...draftConfig, developerHobbies: newHobbies });
                            }}
                            className="w-full text-xs bg-transparent border-0 p-0 text-[#200E2E] font-medium focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nomes dos 4 Irmãos & PIN */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
                        <h3 className="font-display text-lg font-bold text-[#200E2E] flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#7C3AED]" />
                          <span>Nomes dos 4 Irmãos Fundadores</span>
                        </h3>
                        <span className="text-[10px] uppercase font-bold bg-[#EDE9FE] text-[#6D28D9] px-2.5 py-1 rounded-full">
                          3 Irmãs + 1 Irmão
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1">
                            Irmã 1 · Confeitaria & Massas
                          </label>
                          <input
                            type="text"
                            value={draftConfig.siblings?.sister1 || 'Nicole'}
                            onChange={(e) => setDraftConfig({
                              ...draftConfig,
                              siblings: {
                                sister1: e.target.value,
                                sister2: draftConfig.siblings?.sister2 || 'Neudyelle',
                                sister3: draftConfig.siblings?.sister3 || 'Elizene',
                                brother: draftConfig.siblings?.brother || 'Adão',
                              }
                            })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1">
                            Irmã 2 · Pâtisserie & Recheios
                          </label>
                          <input
                            type="text"
                            value={draftConfig.siblings?.sister2 || 'Neudyelle'}
                            onChange={(e) => setDraftConfig({
                              ...draftConfig,
                              siblings: {
                                sister1: draftConfig.siblings?.sister1 || 'Nicole',
                                sister2: e.target.value,
                                sister3: draftConfig.siblings?.sister3 || 'Elizene',
                                brother: draftConfig.siblings?.brother || 'Adão',
                              }
                            })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1">
                            Irmã 3 · Qualidade & Nutrição
                          </label>
                          <input
                            type="text"
                            value={draftConfig.siblings?.sister3 || 'Elizene'}
                            onChange={(e) => setDraftConfig({
                              ...draftConfig,
                              siblings: {
                                sister1: draftConfig.siblings?.sister1 || 'Nicole',
                                sister2: draftConfig.siblings?.sister2 || 'Neudyelle',
                                sister3: e.target.value,
                                brother: draftConfig.siblings?.brother || 'Adão',
                              }
                            })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1">
                            Irmão Homem · Mestre dos Fornos
                          </label>
                          <input
                            type="text"
                            value={draftConfig.siblings?.brother || 'Adão'}
                            onChange={(e) => setDraftConfig({
                              ...draftConfig,
                              siblings: {
                                sister1: draftConfig.siblings?.sister1 || 'Nicole',
                                sister2: draftConfig.siblings?.sister2 || 'Neudyelle',
                                sister3: draftConfig.siblings?.sister3 || 'Elizene',
                                brother: e.target.value,
                              }
                            })}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl text-[#200E2E] font-medium"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDraftConfig({
                          ...draftConfig,
                          siblings: { sister1: 'Nicole', sister2: 'Neudyelle', sister3: 'Elizene', brother: 'Adão' }
                        })}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-[#FAF8FD] border border-[#DDD6FE] text-[#4C1D95] hover:bg-[#EDE9FE] cursor-pointer"
                      >
                        Restaurar: Nicole, Neudyelle, Elizene e Adão
                      </button>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-4">
                      <h3 className="font-display text-lg font-bold text-[#200E2E] border-b border-[#EDE9FE] pb-3 flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#7C3AED]" />
                        <span>Segurança & Código PIN de Acesso</span>
                      </h3>
                      <div>
                        <label className="text-[11px] font-bold uppercase text-[#4C1D95] tracking-wider block mb-1.5">
                          Novo PIN de Desenvolvedora
                        </label>
                        <input
                          type="text"
                          value={draftConfig.devPin}
                          onChange={(e) => setDraftConfig({ ...draftConfig, devPin: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-xl font-mono text-[#200E2E] font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Barra de Ação */}
                  <div className="lg:col-span-2 bg-[#FAF8FD] p-5 rounded-3xl border border-[#DDD6FE] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#7C3AED]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Perfil de Cibele, nomes dos 4 irmãos e PIN sincronizados em tempo real.</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          resetSiteConfig();
                          setDraftConfig(siteConfig);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 border border-[#DDD6FE] hover:bg-white text-[#4C1D95] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar Originais</span>
                      </button>
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar Perfil & Configurações</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}


      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/50 backdrop-blur-sm"
            onClick={() => setIsAddProductOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 z-10 border border-[#EDE9FE] shadow-2xl space-y-5">
            <h3 className="font-display text-2xl font-bold text-[#200E2E]">
              Cadastrar Novo Biscoito
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Nome do Biscoito *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sablé de Canela e Lavanda"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Categoria
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  >
                    <option value="amanteigados">Amanteigados Finos</option>
                    <option value="recheados">Recheados</option>
                    <option value="gourmet">Cookies Gourmet</option>
                    <option value="salgados">Salgados & Aperitivos</option>
                    <option value="combos">Combos & Latas</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Peso / Embalagem
                </label>
                <input
                  type="text"
                  placeholder="Ex: 300g (aprox. 24 un)"
                  value={newProdWeight}
                  onChange={(e) => setNewProdWeight(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Descrição Sensorial
                </label>
                <textarea
                  rows={2}
                  placeholder="Descreva a textura, aroma e notas gustativas..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Ingredientes Principais
                </label>
                <input
                  type="text"
                  placeholder="Ex: Manteiga pura, favas de baunilha..."
                  value={newProdIngr}
                  onChange={(e) => setNewProdIngr(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2.5 border border-[#DDD6FE] text-[#4C1D95] rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Salvar Biscoito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALHES DA COMANDA & ENTRADA EM OUTRAS PARTES */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/60 backdrop-blur-sm"
            onClick={() => setSelectedOrderModal(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 z-10 border border-[#EDE9FE] shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#EDE9FE] pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7C3AED] font-semibold">
                  Comanda Operacional · 4 Irmãos — Confeitaria Artesanal 🍪
                </span>
                <h3 className="font-display text-2xl font-bold text-[#200E2E]">
                  Pedido #{selectedOrderModal.id}
                </h3>
                <p className="text-xs text-[#7C3AED]">
                  {selectedOrderModal.customerName} · Entrega Oficial dos 4 Irmãos
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]">
                {selectedOrderModal.status.replace('_', ' ')}
              </span>
            </div>

            {/* Endereço e Entrega */}
            <div className="bg-[#FAF8FD] p-4 rounded-2xl border border-[#EDE9FE] space-y-2 text-xs text-[#4C1D95]">
              <div className="flex justify-between">
                <span className="font-bold text-[#200E2E]">Destino de Entrega:</span>
                <span className="uppercase font-semibold text-[#7C3AED]">{selectedOrderModal.deliveryType}</span>
              </div>
              <div>{selectedOrderModal.address} - {selectedOrderModal.neighborhood}, {selectedOrderModal.city}</div>
              {selectedOrderModal.driverName && (
                <div className="text-emerald-700 font-semibold pt-1 border-t border-[#EDE9FE]">
                  Entregador(a): {selectedOrderModal.driverName} ({selectedOrderModal.driverVehicle})
                </div>
              )}
            </div>

            {/* Lista de itens */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#200E2E]">
                Itens Solicitados:
              </div>
              <div className="max-h-40 overflow-y-auto divide-y divide-[#EDE9FE] border border-[#EDE9FE] rounded-2xl p-2 bg-[#FAF8FD]">
                {selectedOrderModal.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-2 px-2 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#200E2E]">{item.quantity}x</span>{' '}
                      <span className="text-[#4C1D95] font-medium">{item.name}</span>
                      <span className="text-[11px] text-[#7C3AED] block">{item.weight}</span>
                    </div>
                    <span className="font-mono font-bold text-[#200E2E]">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm font-bold text-[#200E2E] px-1 pt-1">
                <span>Total com Frete:</span>
                <span className="text-[#6D28D9]">
                  R$ {selectedOrderModal.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* SEÇÃO: ENTRAR EM OUTRAS PARTES DO SISTEMA */}
            <div className="space-y-2 pt-2 border-t border-[#EDE9FE]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                Entrar em Outras Partes para Este Pedido:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setSelectedOrderModal(null);
                    setActiveSpace('kitchen');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    showToast(`Entrando no KDS da Cozinha para o Pedido #${selectedOrderModal.id}`);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  <Flame className="w-4 h-4" />
                  <span>Entrar na Cozinha (Fornos)</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedOrderModal(null);
                    setActiveSpace('delivery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    showToast(`Entrando no Espaço de Entregadores para o Pedido #${selectedOrderModal.id}`);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  <Truck className="w-4 h-4" />
                  <span>Entrar na Entrega (Frota)</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedOrderModal(null);
                  setActiveSpace('store');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  showToast(`Visualizando na Loja da Fábrica`);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF8FD] hover:bg-[#EDE9FE] text-[#200E2E] border border-[#DDD6FE] rounded-xl text-xs font-semibold transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>Ver na Loja da Fábrica / Início</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrderModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#7C3AED] hover:text-[#200E2E] transition-colors"
              >
                Fechar Comanda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR BISCOITO */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/60 backdrop-blur-sm"
            onClick={() => setEditingProduct(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 z-10 border border-[#EDE9FE] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
              <h3 className="font-display text-2xl font-bold text-[#200E2E]">
                Editar Biscoito
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-[#7C3AED] hover:bg-[#FAF8FD]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedProduct} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Nome do Biscoito *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  >
                    <option value="amanteigados">Amanteigados Finos</option>
                    <option value="recheados">Recheados</option>
                    <option value="gourmet">Cookies Gourmet</option>
                    <option value="salgados">Salgados & Aperitivos</option>
                    <option value="combos">Combos & Latas</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Peso / Embalagem
                </label>
                <input
                  type="text"
                  value={editingProduct.weight}
                  onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Descrição Sensorial
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full text-xs px-3.5 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Ingredientes Principais
                </label>
                <input
                  type="text"
                  value={editingProduct.ingredients}
                  onChange={(e) => setEditingProduct({ ...editingProduct, ingredients: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div className="flex items-center justify-between bg-[#FAF8FD] p-3 rounded-xl border border-[#EDE9FE]">
                <span className="text-xs font-semibold text-[#200E2E]">Disponível em Estoque</span>
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 accent-[#7C3AED]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-2.5 border border-[#DDD6FE] text-[#4C1D95] rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVA AÇÃO DA EMPRESA */}
      {isNewActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/60 backdrop-blur-sm"
            onClick={() => setIsNewActionModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 z-10 border border-[#EDE9FE] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
              <h3 className="font-display text-2xl font-bold text-[#200E2E]">
                Nova Ação da Empresa
              </h3>
              <button
                type="button"
                onClick={() => setIsNewActionModalOpen(false)}
                className="p-1.5 rounded-lg text-[#7C3AED] hover:bg-[#FAF8FD]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAction} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Título da Ação *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Campanha Lata Solidária de Natal"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Categoria
                  </label>
                  <select
                    value={newActionCategory}
                    onChange={(e) => setNewActionCategory(e.target.value as CompanyAction['category'])}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  >
                    <option value="social">Solidariedade & Comunidade</option>
                    <option value="sustentabilidade">Sustentabilidade</option>
                    <option value="parceria">Cacau Justo & Produtores</option>
                    <option value="educacao">Escola de Confeitaria</option>
                    <option value="comunidade">Ação Comunitária</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Métrica de Impacto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 500 latas doadas"
                    value={newActionMetric}
                    onChange={(e) => setNewActionMetric(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Resumo Curto *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Descreva rapidamente o objetivo da iniciativa..."
                  value={newActionSummary}
                  onChange={(e) => setNewActionSummary(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Descrição Completa (Como Funciona)
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalhe como os clientes ou parceiros podem participar..."
                  value={newActionFullDesc}
                  onChange={(e) => setNewActionFullDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Irmão(ã) Responsável
                  </label>
                  <input
                    type="text"
                    value={newActionLead}
                    onChange={(e) => setNewActionLead(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Localidade
                  </label>
                  <input
                    type="text"
                    value={newActionLocation}
                    onChange={(e) => setNewActionLocation(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewActionModalOpen(false)}
                  className="flex-1 py-2.5 border border-[#DDD6FE] text-[#4C1D95] rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Publicar Ação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
