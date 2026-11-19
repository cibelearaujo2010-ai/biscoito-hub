import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  ChefHat, 
  Plus, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Thermometer, 
  Wind, 
  Package, 
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';

export const KitchenKDS: React.FC = () => {
  const { 
    batches, 
    updateBatchStatus, 
    addBatch, 
    adjustBatchTime,
    fastForwardBatch,
    adjustOvenTemp,
    orders, 
    updateOrderStatus, 
    setActiveSpace, 
    showToast,
    siteConfig
  } = useApp();

  const sister1 = siteConfig.siblings?.sister1 || 'Nicole';
  const sister2 = siteConfig.siblings?.sister2 || 'Neudyelle';
  const sister3 = siteConfig.siblings?.sister3 || 'Elizene';
  const brother = siteConfig.siblings?.brother || 'Adão';

  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);
  const [newCookieName, setNewCookieName] = useState('Sablé Imperial de Baunilha & Amêndoas dos 4 Irmãos');
  const [newOven, setNewOven] = useState(1);
  const [newTemp, setNewTemp] = useState(175);
  const [newUnits, setNewUnits] = useState(120);
  const [newMinutes, setNewMinutes] = useState(16);
  const [newBaker, setNewBaker] = useState(`Irmão ${brother} (Mestre dos Fornos)`);

  const kitchenOrders = orders.filter((o) =>
    ['recebido', 'cozinha_massa', 'no_forno', 'resfriando', 'embalagem'].includes(o.status)
  );

  const readyOrders = orders.filter((o) => o.status === 'pronto_despacho');

  const ovenStations = [
    {
      id: 1,
      name: 'Forno 01 · Lastro Ouro Refratário',
      type: 'Lastro Refratário a Vapor',
      idealFor: 'Sablés Imperial, Amanteigados Finos e Nata Colonial',
      defaultTemp: 175,
    },
    {
      id: 2,
      name: 'Forno 02 · Rotativo Convector a Vapor',
      type: 'Ar Forçado & Convecção',
      idealFor: 'Cookies Gourmet Belga, Cacau Double e Red Velvet',
      defaultTemp: 185,
    },
    {
      id: 3,
      name: 'Forno 03 · Estufa Douradora de Folhados',
      type: 'Calor Estático Seco',
      idealFor: 'Palmiers Folhados Caramelizados e Parmesão da Canastra',
      defaultTemp: 190,
    },
  ];

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    addBatch({
      cookieName: newCookieName,
      ovenNumber: Number(newOven),
      temperatureC: Number(newTemp),
      quantityUnits: Number(newUnits),
      totalMinutes: Number(newMinutes),
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'assando',
      masterBaker: newBaker,
    });
    setIsNewBatchModalOpen(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const advanceKitchenOrderStatus = (orderId: string, currentStatus: OrderStatus) => {
    switch (currentStatus) {
      case 'recebido':
        updateOrderStatus(orderId, 'cozinha_massa');
        break;
      case 'cozinha_massa':
        updateOrderStatus(orderId, 'no_forno');
        showToast(`Comanda #${orderId} colocada no Forno da Fábrica para assar!`);
        break;
      case 'no_forno':
        updateOrderStatus(orderId, 'resfriando');
        showToast(`Comanda #${orderId} retirada do forno e movida para esteira de resfriamento.`);
        break;
      case 'resfriando':
        updateOrderStatus(orderId, 'embalagem');
        break;
      case 'embalagem':
        updateOrderStatus(orderId, 'pronto_despacho');
        showToast(`Pedido #${orderId} finalizado e enviado ao Espaço de Entrega!`);
        break;
      default:
        break;
    }
  };

  const getBatchInOven = (ovenNum: number) => {
    return batches.find((b) => b.ovenNumber === ovenNum && b.status === 'assando');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Back to Home Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            setActiveSpace('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-5 py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md group active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4 text-[#DDD6FE] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para o Início / Loja da Fábrica</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewBatchModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Colocar Nova Fornada no Forno</span>
          </button>

          <button
            onClick={() => setActiveSpace('delivery')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#3B0764] border border-[#DDD6FE] rounded-xl text-xs font-medium transition-colors"
          >
            <span>Espaço de Entrega ({readyOrders.length} prontos)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED]" />
          </button>
        </div>
      </div>

      {/* KDS Header Banner in Purple */}
      <div className="bg-[#1E0B2B] text-[#FAF8FD] rounded-3xl p-6 sm:p-8 border border-[#301344] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
            alt="Logotipo Oficial 3 Irmãs & 1 Biscoito"
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-[#A78BFA] shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#DDD6FE] font-semibold uppercase tracking-wider">
              <ChefHat className="w-4 h-4 text-[#A78BFA]" />
              <span>KDS · Cozinha da 4 Irmãos — Confeitaria Artesanal</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Gestão dos Fornos & Fornadas em Cocção
            </h1>
            <p className="text-xs text-[#DDD6FE]/80">
              Monitore o calor dos fornos a vapor, ponto dourado exato e saída das fornadas para a esteira.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setActiveSpace('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold tracking-wider transition-colors border border-white/20"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#DDD6FE]" />
            <span>Voltar ao Início</span>
          </button>

          <div className="flex items-center gap-4 bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs text-[#DDD6FE]">
            <div>
              <div className="text-[10px] uppercase text-[#A78BFA] font-semibold">Temperatura</div>
              <div className="font-mono text-sm font-bold text-white">175°C a 190°C</div>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <div className="text-[10px] uppercase text-[#A78BFA] font-semibold">Fornos</div>
              <div className="font-mono text-sm font-bold text-white">3 Ativos</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: AS ESTAÇÕES DOS FORNOS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Estações de Forno em Tempo Real</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#200E2E]">
              Fornos da Fábrica & Tabuleiros em Cocção
            </h2>
          </div>
          <span className="text-xs text-[#7C3AED]">
            Controle de temperatura, temporizador regressivo e ponto do biscoito
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {ovenStations.map((station) => {
            const activeBatch = getBatchInOven(station.id);
            const isBaking = !!activeBatch;
            const isReadyToPull = activeBatch && activeBatch.remainingSeconds === 0;

            const totalSeconds = activeBatch ? activeBatch.totalMinutes * 60 : 1;
            const elapsedSeconds = activeBatch ? totalSeconds - activeBatch.remainingSeconds : 0;
            const progressPercent = activeBatch ? Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100)) : 0;

            return (
              <div
                key={station.id}
                className={`rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-5 shadow-sm ${
                  isReadyToPull
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                    : isBaking
                    ? 'bg-gradient-to-b from-white via-white to-[#F5F3FF] border-[#DDD6FE]'
                    : 'bg-white border-[#EDE9FE] opacity-90'
                }`}
              >
                {/* Oven Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#200E2E]">
                      <Flame className={`w-4 h-4 ${isBaking ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
                      <span>{station.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isBaking && (
                        <div className="flex items-center gap-1 bg-[#F5F3FF] border border-[#DDD6FE] px-2 py-0.5 rounded text-[11px] font-mono font-bold text-[#6D28D9]">
                          <Thermometer className="w-3 h-3 text-[#7C3AED]" />
                          <span>{activeBatch.temperatureC}°C</span>
                        </div>
                      )}
                      {!isBaking && (
                        <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                          Livre / Pré-aquecido
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#7C3AED] leading-tight">
                    {station.idealFor}
                  </p>
                </div>

                {/* Oven Window */}
                <div
                  className={`relative rounded-2xl p-4 border overflow-hidden flex flex-col justify-between min-h-[160px] ${
                    isReadyToPull
                      ? 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500 text-white shadow-inner animate-pulse'
                      : isBaking
                      ? 'bg-gradient-to-br from-[#1E0B2B] via-[#2F1342] to-[#1E0B2B] border-[#441C5E] text-white shadow-inner'
                      : 'bg-[#FAF8FD] border-[#EDE9FE] text-[#7C3AED]'
                  }`}
                >
                  {isBaking ? (
                    <>
                      {/* Oven Glass Glow Elements */}
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#DDD6FE]">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span className="font-semibold uppercase tracking-wider">
                            {isReadyToPull ? 'Fornada no Ponto!' : 'Assando no Lastro'}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-black/40 px-2 py-0.5 rounded text-amber-200">
                          #{activeBatch.id}
                        </span>
                      </div>

                      {/* Cookie batch name & baker inside oven */}
                      <div className="relative z-10 space-y-1 my-2">
                        <h4 className="font-display text-lg font-bold text-white leading-tight">
                          {activeBatch.cookieName}
                        </h4>
                        <div className="text-[11px] text-[#DDD6FE]/80 flex items-center gap-2">
                          <span>{activeBatch.quantityUnits} biscoitos no tabuleiro</span>
                          <span aria-hidden="true">·</span>
                          <span>{activeBatch.masterBaker}</span>
                        </div>
                      </div>

                      {/* Progress and live countdown */}
                      <div className="relative z-10 space-y-1.5 pt-1 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#DDD6FE] text-[11px]">
                            {isReadyToPull ? 'Tempo Esgotado' : `Progresso: ${progressPercent}%`}
                          </span>
                          <span className="text-lg font-bold text-white tabular-nums tracking-wide">
                            {formatTimer(activeBatch.remainingSeconds)}
                          </span>
                        </div>

                        {/* Baking Progress Bar */}
                        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              isReadyToPull ? 'bg-amber-300' : 'bg-gradient-to-r from-amber-400 to-[#A78BFA]'
                            }`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Empty Oven State */
                    <div className="flex flex-col items-center justify-center text-center h-full my-auto space-y-2 py-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#EDE9FE]">
                        <Flame className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="text-xs font-bold text-[#200E2E]">Forno Pronto para Receber Massa</div>
                      <p className="text-[11px] text-[#7C3AED] max-w-[200px]">
                        Temperatura calibrada a {station.defaultTemp}°C. Selecione uma comanda ou lance uma fornada.
                      </p>
                    </div>
                  )}
                </div>

                {/* Oven Action Controls */}
                <div className="space-y-2 pt-1">
                  {isBaking ? (
                    <>
                      {/* Pull out of oven button */}
                      <button
                        onClick={() => updateBatchStatus(activeBatch.id, 'resfriando')}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                          isReadyToPull
                            ? 'bg-amber-600 hover:bg-amber-700 text-white animate-bounce'
                            : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
                        }`}
                      >
                        <Wind className="w-4 h-4" />
                        <span>Retirar Tabuleiro do Forno (Resfriar)</span>
                      </button>

                      {/* Time and Temp fine tuning */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        <button
                          onClick={() => adjustBatchTime(activeBatch.id, 60)}
                          className="py-1.5 px-2 bg-white hover:bg-[#F5F3FF] text-[#200E2E] border border-[#DDD6FE] rounded-lg text-[11px] font-medium transition-colors"
                          title="Adicionar mais 1 minuto de forno para dourar mais"
                        >
                          +1 min
                        </button>
                        <button
                          onClick={() => adjustBatchTime(activeBatch.id, 300)}
                          className="py-1.5 px-2 bg-white hover:bg-[#F5F3FF] text-[#200E2E] border border-[#DDD6FE] rounded-lg text-[11px] font-medium transition-colors"
                          title="Adicionar 5 minutos de forno"
                        >
                          +5 min
                        </button>
                        <button
                          onClick={() => fastForwardBatch(activeBatch.id)}
                          className="py-1.5 px-2 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6D28D9] border border-[#DDD6FE] rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                          title="Concluir cocção agora para teste rápido"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Assar Já</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#7C3AED] pt-1">
                        <span>Ajuste Térmico:</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => adjustOvenTemp(activeBatch.id, -5)}
                            className="px-2 py-0.5 bg-white border border-[#EDE9FE] rounded text-[#200E2E] hover:bg-slate-50"
                          >
                            -5°C
                          </button>
                          <button
                            onClick={() => adjustOvenTemp(activeBatch.id, 5)}
                            className="px-2 py-0.5 bg-white border border-[#EDE9FE] rounded text-[#200E2E] hover:bg-slate-50"
                          >
                            +5°C
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setNewOven(station.id);
                        setNewTemp(station.defaultTemp);
                        setIsNewBatchModalOpen(true);
                      }}
                      className="w-full py-2.5 px-3 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#3B0764] border border-[#DDD6FE] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-[#7C3AED]" />
                      <span>Colocar Biscoitos Neste Forno</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: ESTEIRA DE RESFRIAMENTO & SELAGEM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE9FE] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE9FE] pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <Wind className="w-4 h-4 text-[#7C3AED]" />
              <span>Esteira de Resfriamento de Cobre & Montagem</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#200E2E]">
              Biscoitos Recém-Saídos do Forno (Aguardando Selagem)
            </h3>
          </div>
          <p className="text-xs text-[#7C3AED]">
            Os biscoitos devem esfriar por completo antes do envase hermético nas latas lilases para evitar perda da crocância.
          </p>
        </div>

        {batches.filter((b) => b.status === 'resfriando').length === 0 ? (
          <div className="text-center py-6 text-xs text-[#7C3AED]">
            Nenhum tabuleiro na esteira de resfriamento. Quando você retirar os biscoitos do forno, eles virão para cá.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches
              .filter((b) => b.status === 'resfriando')
              .map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-[#F5F3FF] rounded-2xl border border-[#DDD6FE] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#200E2E]">#{b.id}</span>
                      <span className="text-[11px] text-[#6D28D9] font-medium">Resfriando a 22°C</span>
                    </div>
                    <div className="font-display text-base font-bold text-[#200E2E]">{b.cookieName}</div>
                    <div className="text-xs text-[#4C1D95]">{b.quantityUnits} unidades · {b.masterBaker}</div>
                  </div>

                  <button
                    onClick={() => updateBatchStatus(b.id, 'embalado')}
                    className="w-full py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Acondicionar na Lata Lilás & Selar</span>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* SECTION: COMANDAS DE PEDIDOS DOS CLIENTES */}
      <div className="space-y-4 pt-4 border-t border-[#EDE9FE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h2 className="font-display text-2xl font-bold text-[#200E2E]">
              Comandas de Pedidos dos Clientes
            </h2>
            <p className="text-xs text-[#7C3AED]">
              Acompanhe o estágio de cada pedido: Massa &rarr; No Forno &rarr; Resfriamento &rarr; Lata Lilás &rarr; Despacho.
            </p>
          </div>
          <span className="text-xs font-bold text-[#6D28D9] bg-[#F5F3FF] px-3 py-1 rounded-full border border-[#DDD6FE]">
            {kitchenOrders.length} pedido(s) na cozinha
          </span>
        </div>

        {kitchenOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-[#EDE9FE] text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-display text-xl font-bold text-[#200E2E]">Todas as comandas foram finalizadas!</h3>
            <p className="text-xs text-[#7C3AED] max-w-sm mx-auto">
              Nenhum pedido pendente de forno neste momento. Faça um novo pedido na Loja para vê-lo chegar aqui instantaneamente.
            </p>
            <button
              onClick={() => {
                setActiveSpace('store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Ir para Loja & Fazer Pedido
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kitchenOrders.map((ord) => {
              const currentStep = ord.status;
              const isOrderInOven = currentStep === 'no_forno';

              const nextLabel = 
                currentStep === 'recebido' ? 'Iniciar Preparo de Massa' :
                currentStep === 'cozinha_massa' ? 'Colocar no Forno (Assar)' :
                currentStep === 'no_forno' ? 'Retirar do Forno & Resfriar' :
                currentStep === 'resfriando' ? 'Acondicionar em Lata Hermética' :
                'Liberar para Espaço de Entrega';

              return (
                <div
                  key={ord.id}
                  className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col justify-between space-y-5 transition-all ${
                    isOrderInOven
                      ? 'border-amber-300 ring-2 ring-amber-200 bg-amber-50/20'
                      : 'border-[#EDE9FE]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-3">
                      <div>
                        <span className="font-mono text-base font-bold text-[#200E2E]">#{ord.id}</span>
                        <div className="text-[11px] text-[#7C3AED]">Cliente: {ord.customerName}</div>
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                        isOrderInOven 
                          ? 'bg-amber-100 text-amber-900 border-amber-300' 
                          : 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]'
                      }`}>
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>

                    {isOrderInOven && (
                      <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-200 flex items-center gap-2 text-xs text-amber-900">
                        <Flame className="w-4 h-4 text-amber-700 animate-pulse shrink-0" />
                        <div>
                          <strong>Biscoitos no Forno da Fábrica!</strong>
                          <div className="text-[11px] text-amber-800">Cozinhando a 175°C com vapor controlado.</div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase text-[#4C1D95]">Itens a Produzir:</div>
                      <ul className="text-xs text-[#200E2E] space-y-1.5">
                        {ord.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between items-center bg-[#FAF8FD] px-2.5 py-1.5 rounded-lg border border-[#EDE9FE]">
                            <span className="font-medium truncate max-w-[200px]">{item.name}</span>
                            <span className="font-bold tabular-nums text-[#7C3AED]">{item.quantity} un ({item.weight})</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {ord.notes && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        <strong>Obs do cliente:</strong> {ord.notes}
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => advanceKitchenOrderStatus(ord.id, ord.status)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                        isOrderInOven
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-[#200E2E] hover:bg-[#3B1443] text-white'
                      }`}
                    >
                      <span>{nextLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#DDD6FE]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation & Return to Store */}
      <div className="pt-6 border-t border-[#EDE9FE] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EDE9FE] shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-[#200E2E]">Finalizou o acompanhamento da cozinha?</h4>
          <p className="text-xs text-[#7C3AED]">
            Retorne à vitrine principal para navegar pelo cardápio, combos e apresentação da 4 Irmãos — Confeitaria Artesanal.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveSpace('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 text-[#DDD6FE]" />
          <span>Voltar para o Início / Loja</span>
        </button>
      </div>

      {/* Floating Back to Home button for Kitchen Space */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            setActiveSpace('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-[0.98] border border-[#3A1853] group"
          aria-label="Voltar para a página inicial"
        >
          <ArrowLeft className="w-4 h-4 text-[#DDD6FE] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao Início</span>
        </button>
      </div>

      {/* NEW BATCH MODAL */}
      {isNewBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/50 backdrop-blur-sm"
            onClick={() => setIsNewBatchModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 z-10 border border-[#EDE9FE] shadow-2xl space-y-5">
            <h3 className="font-display text-2xl font-bold text-[#200E2E]">
              Colocar Nova Fornada no Forno
            </h3>

            <form onSubmit={handleCreateBatch} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Variedade do Biscoito *
                </label>
                <select
                  value={newCookieName}
                  onChange={(e) => setNewCookieName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                >
                  <option value="Sablé Imperial de Baunilha & Amêndoas dos 4 Irmãos">Sablé Imperial de Baunilha</option>
                  <option value="Casadinho Tradicional de Goiabada Cascão">Casadinho Tradicional de Goiabada</option>
                  <option value="Cookie Double Cacau com Flor de Sal dos 4 Irmãos">Cookie Double Cacau Belga</option>
                  <option value="Palmier Caramelizado Folhado Lilás">Palmier Caramelizado Folhado</option>
                  <option value="Flor de Nata Colonial da Fazenda">Flor de Nata Colonial</option>
                  <option value="Cookie Red Velvet com Cream Cheese">Cookie Red Velvet</option>
                  <option value="Biscoito de Queijo Canastra Curado & Alecrim">Parmesão da Canastra Salgado</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Número do Forno
                  </label>
                  <select
                    value={newOven}
                    onChange={(e) => {
                      const ov = Number(e.target.value);
                      setNewOven(ov);
                      if (ov === 1) setNewTemp(175);
                      if (ov === 2) setNewTemp(185);
                      if (ov === 3) setNewTemp(190);
                    }}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  >
                    <option value={1}>Forno 01 (Lastro Ouro)</option>
                    <option value={2}>Forno 02 (Rotativo Convector)</option>
                    <option value={3}>Forno 03 (Estufa Folhados)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Temperatura (°C)
                  </label>
                  <input
                    type="number"
                    value={newTemp}
                    onChange={(e) => setNewTemp(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Quantidade (unidades)
                  </label>
                  <input
                    type="number"
                    value={newUnits}
                    onChange={(e) => setNewUnits(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                    Tempo no Forno (minutos)
                  </label>
                  <input
                    type="number"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Mestre(a) Forneiro(a) / Confeiteiro(a) Responsável
                </label>
                <input
                  type="text"
                  value={newBaker}
                  onChange={(e) => setNewBaker(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    `Irmão ${brother} (Mestre dos Fornos)`,
                    `Irmã ${sister1} (Confeitaria & Massas)`,
                    `Irmã ${sister2} (Pâtisserie & Recheios)`,
                    `Irmã ${sister3} (Controle de Qualidade)`
                  ].map((bakerOption) => (
                    <button
                      key={bakerOption}
                      type="button"
                      onClick={() => setNewBaker(bakerOption)}
                      className={`text-[10px] px-2 py-1 rounded-md border transition-all ${
                        newBaker === bakerOption
                          ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                          : 'bg-[#FAF8FD] text-[#4C1D95] border-[#DDD6FE] hover:bg-[#EDE9FE]'
                      }`}
                    >
                      {bakerOption.split(' ')[1]} ({bakerOption.includes(brother) ? brother : bakerOption.split(' ')[1]})
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewBatchModalOpen(false)}
                  className="flex-1 py-2.5 border border-[#DDD6FE] text-[#4C1D95] rounded-xl text-xs font-semibold"
                >
                  Voltar / Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Ligar Forno & Iniciar Cocção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
