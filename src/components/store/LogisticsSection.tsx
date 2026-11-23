import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
  PackageCheck, 
  Zap, 
  Thermometer, 
  Navigation, 
  RotateCcw,
  Boxes,
  Layers,
  ArrowRight,
  FileText,
  Trash2,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { B2BLead } from '../../types';

export const LogisticsSection: React.FC = () => {
  const { addB2BLead, deleteB2BLead, b2bLeads, showToast } = useApp();

  // B2B Form State
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState<'emporio' | 'hotel' | 'cafeteria' | 'supermercado' | 'eventos'>('cafeteria');
  const [volume, setVolume] = useState('30kg a 60kg/mês');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSentLead, setLastSentLead] = useState<B2BLead | null>(null);
  const [showRecentLeads, setShowRecentLeads] = useState(false);

  // Telemetry Simulator State
  const [selectedZone, setSelectedZone] = useState<'capital' | 'grande_sp' | 'interior' | 'nacional'>('capital');

  const zoneData = {
    capital: {
      title: 'São Paulo Capital (Raios Expressos)',
      leadTime: '35 a 55 minutos',
      vehicle: 'Scooter Elétrica Lilás Climatizada #03',
      temp: '18.2°C (Ideal para chocolate e manteiga)',
      packing: 'Lata Lilás com Selo Térmico ou Caixa Rígida Almofadada',
      coverage: 'Pinheiros, Jardins, Itaim, Moema, Perdizes, Vila Madalena e Centro Expandido',
      carbon: 'Zero Emissão Local de CO₂ (100% Elétrico)',
    },
    grande_sp: {
      title: 'Grande São Paulo & Região Metropolitana',
      leadTime: 'Same-Day (Entrega no mesmo dia até 17h)',
      vehicle: 'Van Isotérmica Refrigerada 4 Irmãos',
      temp: '17.5°C (Estabilizada em câmara refrigerada)',
      packing: 'Caixa Master com Berço Antichoque Biodegradável',
      coverage: 'Alphaville, Barueri, Santo André, São Bernardo, Osasco e Guarulhos',
      carbon: 'Frota Euro 6 com compensação florestal',
    },
    interior: {
      title: 'Interior Paulista & Litoral',
      leadTime: 'Até 24 horas úteis',
      vehicle: 'Transporte Rodoviário Expresso Climatizado',
      temp: '18.0°C (Registrador eletrônico de temperatura)',
      packing: 'Caixa Térmica Hermética com Barreira UV',
      coverage: 'Campinas, Jundiaí, Sorocaba, Santos, Riviera e Ribeirão Preto',
      carbon: 'Rastreamento satelital com telemetria ativa',
    },
    nacional: {
      title: 'Envio Aéreo Interestadual para Todo o Brasil',
      leadTime: '24h a 48h úteis',
      vehicle: 'Cadeia Aérea Expressa Prioritária',
      temp: '16.8°C a 19.0°C (Isolamento com bio-lã térmica)',
      packing: 'Latas Herméticas com Atmosfera Modificada (90 dias de crocância)',
      coverage: 'Rio de Janeiro, Belo Horizonte, Curitiba, Brasília, Salvador e todas as capitais',
      carbon: 'Embalagens 100% recicláveis de folha de flandres',
    },
  };

  const currentZone = zoneData[selectedZone];

  const handleB2bSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !contact.trim() || !phone.trim()) return;

    const createdLead = addB2BLead({
      companyName: company.trim(),
      contactName: contact.trim(),
      phone: phone.trim(),
      city: city.trim() || 'São Paulo - SP',
      businessType: businessType,
      estimatedVolume: volume,
    });

    setLastSentLead(createdLead);
    setIsSuccess(true);
    showToast('Proposta B2B enviada! Você pode apagar a solicitação no botão abaixo.');
  };

  const handleDeleteSentLead = () => {
    if (lastSentLead) {
      deleteB2BLead(lastSentLead.id);
    }
    setLastSentLead(null);
    setIsSuccess(false);
    setCompany('');
    setContact('');
    setPhone('');
    setCity('');
    showToast('🗑️ Solicitação B2B apagada e cancelada com sucesso!');
  };

  const handleResetForNewLead = () => {
    setCompany('');
    setContact('');
    setPhone('');
    setCity('');
    setIsSuccess(false);
    setLastSentLead(null);
  };

  const handleClearForm = () => {
    setCompany('');
    setContact('');
    setPhone('');
    setCity('');
    showToast('Campos de cotação apagados com sucesso.');
  };

  return (
    <section id="logistica" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24 space-y-10">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#DDD6FE] text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Distribuição & Logística Especializada</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#200E2E] tracking-tight">
            Logística dos 4 Irmãos: Da Fábrica à Sua Mesa com Máximo Frescor
          </h2>
          <p className="text-sm text-[#4C1D95]/80 leading-relaxed">
            Como nossos biscoitos levam manteiga nobre e chocolate puro belga, operamos uma cadeia logística com 
            controle de temperatura a 18°C e frotas próprias lilases para garantir que nenhum biscoito quebre ou perca a crocância.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="p-3 bg-white rounded-2xl border border-[#EDE9FE] shadow-sm flex items-center gap-2.5">
            <Thermometer className="w-4 h-4 text-[#7C3AED]" />
            <div>
              <span className="text-[10px] uppercase text-[#7C3AED] block font-bold">Temperatura Alvo</span>
              <span className="font-mono font-bold text-[#200E2E]">18°C Constante</span>
            </div>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-[#EDE9FE] shadow-sm flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-[10px] uppercase text-[#7C3AED] block font-bold">Frota Lilás</span>
              <span className="font-mono font-bold text-[#200E2E]">100% Elétrica</span>
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER DA FROTA LOGÍSTICA */}
      <div className="relative rounded-3xl overflow-hidden border border-[#EDE9FE] shadow-xl bg-[#190924] min-h-[360px] sm:min-h-[420px] flex items-end">
        <img
          src="/assets/images/cookie_logistics_fleet_1794236503598.jpg"
          alt="Frota de vans e scooters elétricas lilases da 4 Irmãos — Confeitaria Artesanal"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#190924] via-[#190924]/40 to-transparent" />

        {/* Floating Badges Overlay */}
        <div className="relative z-10 p-6 sm:p-10 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl space-y-2 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-[#EDE9FE] border border-white/20">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Frota Própria Elétrica & Isotérmica</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              Entregas Climatizadas que Preservam a Alquimia da Confeitaria.
            </h3>
            <p className="text-xs sm:text-sm text-[#DDD6FE] leading-relaxed">
              Nossas scooters lilases possuem baús isotérmicos com amortecimento especial para os sablés e casadinhos. 
              As vans abastecem diariamente empórios de luxo, cafeterias de café especial e hotéis 5 estrelas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            <div className="p-3.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 text-white space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-[#C4B5FD]">Tempo na Capital</div>
              <div className="font-display text-xl font-bold text-white">Até 45 min</div>
              <div className="text-[10px] text-white/70">Saída direta da fornada</div>
            </div>
            <div className="p-3.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 text-white space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-[#C4B5FD]">Validade Hermética</div>
              <div className="font-display text-xl font-bold text-white">90 Dias</div>
              <div className="text-[10px] text-white/70">Atmosfera modificada</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 PILARES DA LOGÍSTICA & EMBALAGEM */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED]">
            <Boxes className="w-5 h-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-[#200E2E]">
            Lata Lilás com Barreira de Oxigênio
          </h4>
          <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
            Folha de flandres nobre com anel de silicone de grau alimentício. Bloqueia raios UV e umidade externa, dispensando aditivos ou conservantes químicos.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED]">
            <Thermometer className="w-5 h-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-[#200E2E]">
            Cadeia Fria a 18°C Monitorada
          </h4>
          <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
            Dataloggers eletrônicos registram a curva térmica durante todo o percurso. Se a temperatura subir, o sistema alerta o motorista em tempo real.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE9FE] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED]">
            <PackageCheck className="w-5 h-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-[#200E2E]">
            Amortecimento 100% Biodegradável
          </h4>
          <p className="text-xs text-[#4C1D95]/80 leading-relaxed">
            Para envios interestaduais, utilizamos berços de celulose reciclada e flocos solúveis de amido de milho que acolhem cada biscoito contra vibrações.
          </p>
        </div>
      </div>

      {/* SIMULADOR INTERATIVO DE TELEMETRIA LOGÍSTICA & MODAIS */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE9FE] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE9FE] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <Navigation className="w-4 h-4 text-[#7C3AED]" />
              <span>Simulador de Rotas & Telemetria em Tempo Real</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#200E2E]">
              Consulte Como a Carga Chega na Sua Região
            </h3>
          </div>

          {/* Zone Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'capital', label: 'Capital SP (Express)' },
              { id: 'grande_sp', label: 'Grande São Paulo' },
              { id: 'interior', label: 'Interior & Litoral' },
              { id: 'nacional', label: 'Brasil (Aéreo)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedZone(tab.id as any)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  selectedZone === tab.id
                    ? 'bg-[#7C3AED] text-white shadow-sm'
                    : 'bg-[#FAF8FD] text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#EDE9FE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Zone Telemetry Display Card */}
        <div className="grid lg:grid-cols-12 gap-6 bg-[#FAF8FD] rounded-2xl p-6 border border-[#DDD6FE]">
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                Rota Selecionada
              </span>
              <h4 className="font-display text-xl font-bold text-[#200E2E]">
                {currentZone.title}
              </h4>
              <p className="text-xs text-[#4C1D95]/80">
                Cobertura: <strong className="text-[#200E2E]">{currentZone.coverage}</strong>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#EDE9FE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#7C3AED] block">Modal Operacional</span>
                <span className="font-semibold text-[#200E2E] block">{currentZone.vehicle}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE9FE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#7C3AED] block">Prazo de Trânsito</span>
                <span className="font-semibold text-emerald-700 block font-mono">{currentZone.leadTime}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE9FE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#7C3AED] block">Telemetria Térmica</span>
                <span className="font-semibold text-[#7C3AED] block font-mono">{currentZone.temp}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE9FE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#7C3AED] block">Impacto Ambiental</span>
                <span className="font-semibold text-emerald-800 block">{currentZone.carbon}</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#EDE9FE]/50 rounded-xl border border-[#DDD6FE] text-xs text-[#4C1D95] space-y-1">
              <span className="font-bold text-[#200E2E]">Embalagem Recomendada:</span>
              <p>{currentZone.packing}</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#DDD6FE] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-[#EDE9FE] pb-2">
                <span className="font-bold text-[#200E2E]">Centro de Expedição:</span>
                <span className="text-[#7C3AED] font-mono">Fábrica Pinheiros (SP)</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#4C1D95]">
                  <span>Status do Tráfego:</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Rotas Livres
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#4C1D95]">
                  <span>Controle de Choque:</span>
                  <span className="font-semibold text-[#200E2E]">Sensores Ativos (&lt; 1.2G)</span>
                </div>
                <div className="flex items-center justify-between text-[#4C1D95]">
                  <span>Atmosfera:</span>
                  <span className="font-semibold text-[#7C3AED]">Argônio/Nitrogênio Grau Alimentício</span>
                </div>
              </div>
            </div>

            <a
              href="#entrega"
              className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold uppercase tracking-wider rounded-xl text-center transition-colors shadow-sm block"
            >
              Rastrear Pedido Individual
            </a>
          </div>
        </div>
      </div>

      {/* ÁREA B2B & ABASTECIMENTO DE EMPÓRIOS/HOTÉIS */}
      <div className="bg-[#1E0B2B] text-[#FAF8FD] rounded-3xl p-8 sm:p-12 border border-[#301344] shadow-xl space-y-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: Wholesale Logistics details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#DDD6FE] font-semibold uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#A78BFA]" />
              <span>Logística & Atacado B2B</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Abastecimento Contínuo para Cafeterias, Empórios e Hotéis.
            </h3>
            <p className="text-sm text-[#DDD6FE]/80 leading-relaxed">
              Fornecemos displays lilases em comodato, latas personalizadas para quartos de hóspedes e fardos herméticos a vácuo para cafeterias de especialidade. 
              Faturamento faturado quinzenal ou mensal e logística pontual com substituição de estoque fresco.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-[#DDD6FE]/80">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                <div className="font-bold text-white text-sm">Fardos a Vácuo</div>
                <p className="text-[11px]">Pacotes herméticos de 1kg a 5kg para consumo em balcão.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                <div className="font-bold text-white text-sm">Displays Lilases</div>
                <p className="text-[11px]">Expositor elegante de madeira e acrílico fornecido sem custo.</p>
              </div>
            </div>
          </div>

          {/* Right: B2B Partnership Ingestion Form with Clear Fields Button */}
          <div className="lg:col-span-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display text-xl font-bold text-white">
                Solicitar Tabela de Atacado & Revenda
              </h4>
              {(company || contact || phone || city) && (
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-[11px] text-[#DDD6FE] hover:text-white underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>apagar campos</span>
                </button>
              )}
            </div>
            <p className="text-xs text-[#DDD6FE]/80 mb-5">
              Receba o catálogo corporativo com preços para revenda e solicite uma amostra de degustação.
            </p>

            {isSuccess && lastSentLead ? (
              <div className="p-6 bg-white/10 border border-[#A78BFA] rounded-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-base">Solicitação B2B Enviada com Sucesso!</div>
                  <p className="text-xs text-[#DDD6FE]/90">
                    Nossa equipe de logística dos 4 Irmãos recebeu os dados da sua empresa. Se você enviou por engano ou deseja cancelar, use o botão de apagar abaixo:
                  </p>
                </div>

                {/* Resumo do Pedido/Cotação B2B Enviado */}
                <div className="p-4 bg-black/40 rounded-xl border border-white/15 text-left space-y-2 text-xs text-[#DDD6FE]">
                  <div className="flex items-center justify-between text-[11px] text-[#A78BFA] border-b border-white/10 pb-1.5">
                    <span className="font-mono font-bold">Protocolo: {lastSentLead.id}</span>
                    <span>{lastSentLead.createdAt}</span>
                  </div>
                  <div className="text-white font-bold text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{lastSentLead.companyName}</span>
                    <span className="text-[10px] bg-[#7C3AED] px-2 py-0.5 rounded-full font-semibold uppercase text-white">
                      {lastSentLead.businessType}
                    </span>
                  </div>
                  <div className="text-xs grid grid-cols-1 sm:grid-cols-2 gap-1 text-[#DDD6FE]/90">
                    <div>Responsável: <strong className="text-white">{lastSentLead.contactName}</strong></div>
                    <div>Telefone: <strong className="text-white">{lastSentLead.phone}</strong></div>
                    <div>Volume: <strong className="text-amber-300">{lastSentLead.estimatedVolume}</strong></div>
                    <div>Local: <strong className="text-white">{lastSentLead.city}</strong></div>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO: APAGAR O QUE FOI ENVIADO OU NOVA COTAÇÃO */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleDeleteSentLead}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 hover:text-white border border-rose-500/50 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Apagar esta solicitação B2B enviada"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>Apagar Solicitação Enviada</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForNewLead}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Nova Cotação</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleB2bSubmit} className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] uppercase font-semibold text-[#DDD6FE]">
                      Nome da Empresa / Estabelecimento *
                    </label>
                    {company && (
                      <button
                        type="button"
                        onClick={() => setCompany('')}
                        className="text-[10px] text-purple-300 hover:underline cursor-pointer"
                      >
                        apagar
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Café das Flores ou Empório Gourmet"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#A78BFA]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] uppercase font-semibold text-[#DDD6FE]">
                        Nome do Responsável *
                      </label>
                      {contact && (
                        <button
                          type="button"
                          onClick={() => setContact('')}
                          className="text-[10px] text-purple-300 hover:underline cursor-pointer"
                        >
                          apagar
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Mendes"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#A78BFA]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] uppercase font-semibold text-[#DDD6FE]">
                        Telefone / WhatsApp *
                      </label>
                      {phone && (
                        <button
                          type="button"
                          onClick={() => setPhone('')}
                          className="text-[10px] text-purple-300 hover:underline cursor-pointer"
                        >
                          apagar
                        </button>
                      )}
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 98765-4321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#A78BFA]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#DDD6FE] block mb-1">
                      Tipo de Estabelecimento
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value as any)}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#1E0B2B] border border-white/20 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#A78BFA]"
                    >
                      <option value="cafeteria">Cafeteria / Bistrô</option>
                      <option value="emporio">Empório / Mercearia Fina</option>
                      <option value="hotel">Hotel Boutique / Pousada</option>
                      <option value="supermercado">Rede de Supermercados</option>
                      <option value="eventos">Buffet / Eventos Corporativos</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#DDD6FE] block mb-1">
                      Volume Estimado
                    </label>
                    <select
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#1E0B2B] border border-white/20 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#A78BFA]"
                    >
                      <option value="15kg a 30kg/mês">15kg a 30kg/mês</option>
                      <option value="30kg a 60kg/mês">30kg a 60kg/mês</option>
                      <option value="Mais de 100kg/mês">Mais de 100kg/mês</option>
                      <option value="Apenas Latinhas Lilases Presenteáveis">Apenas Latinhas Lilases</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Receber Catálogo Logístico B2B dos 4 Irmãos</span>
                </button>
              </form>
            )}

            {/* SEÇÃO EXPANSÍVEL: TODAS AS SOLICITAÇÕES B2B ENVIADAS COM BOTÃO DE APAGAR */}
            {b2bLeads.length > 0 && (
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowRecentLeads((prev) => !prev)}
                    className="text-xs text-[#DDD6FE] hover:text-white font-semibold flex items-center gap-1.5 cursor-pointer underline"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Ver solicitações B2B enviadas ({b2bLeads.length})</span>
                  </button>

                  {showRecentLeads && (
                    <span className="text-[10px] text-amber-300">
                      Toque em "Apagar" para excluir
                    </span>
                  )}
                </div>

                {showRecentLeads && (
                  <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar pr-1 pt-1">
                    {b2bLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="font-semibold text-white truncate flex items-center gap-1.5">
                            <span className="truncate">{lead.companyName}</span>
                            <span className="text-[9px] bg-[#7C3AED] text-white px-1.5 py-0.2 rounded font-mono shrink-0">
                              {lead.estimatedVolume}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#DDD6FE]/70 truncate">
                            {lead.contactName} ({lead.phone}) · {lead.createdAt}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            deleteB2BLead(lead.id);
                            if (lastSentLead?.id === lead.id) {
                              setLastSentLead(null);
                              setIsSuccess(false);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 hover:text-white border border-rose-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                          title="Apagar esta solicitação enviada"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Apagar</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
