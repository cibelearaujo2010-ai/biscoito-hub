import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Navigation, 
  UserCheck, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeliverySpace: React.FC = () => {
  const { orders, updateOrderStatus, assignDriver, setActiveSpace, showToast } = useApp();

  const [selectedDriver, setSelectedDriver] = useState('Lucas Ferreira');
  const [selectedVehicle, setSelectedVehicle] = useState('Scooter Elétrica Lilás #03');
  const [deliveringModalOrder, setDeliveringModalOrder] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState('');
  const [receiverDocument, setReceiverDocument] = useState('');

  const readyToShipOrders = orders.filter((o) => o.status === 'pronto_despacho');
  const inTransitOrders = orders.filter((o) => o.status === 'saiu_entrega');
  const completedOrders = orders.filter((o) => o.status === 'entregue');

  const availableDrivers = [
    { name: 'Lucas Ferreira', vehicle: 'Scooter Elétrica Lilás #03' },
    { name: 'Aline Vasconcellos', vehicle: 'Van Climatizada Roxa #01' },
    { name: 'Marcos Da Silva', vehicle: 'Moto Elétrica #02' },
  ];

  const handleStartDelivery = (orderId: string) => {
    assignDriver(orderId, selectedDriver, selectedVehicle);
  };

  const handleConfirmDelivered = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveringModalOrder) return;
    updateOrderStatus(deliveringModalOrder, 'entregue');
    showToast(`Pedido #${deliveringModalOrder} entregue com sucesso e assinado por ${receiverName || 'Cliente'}!`);
    setDeliveringModalOrder(null);
    setReceiverName('');
    setReceiverDocument('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Back to Home Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setActiveSpace('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] group"
        >
          <ArrowLeft className="w-4 h-4 text-[#DDD6FE] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para o Início / Loja da Fábrica</span>
        </button>

        <button
          onClick={() => setActiveSpace('kitchen')}
          className="text-xs text-[#7C3AED] hover:text-[#200E2E] font-semibold"
        >
          Ir para Espaço Cozinha (KDS) &rarr;
        </button>
      </div>

      {/* Delivery Header Banner in Purple */}
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
              <Truck className="w-4 h-4 text-[#A78BFA]" />
              <span>Frota dos 4 Irmãos & Central de Despacho</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Expedição, Rotas & Entregadores
            </h1>
            <p className="text-xs text-[#DDD6FE]/80">
              Saída da frota climatizada lilás e comprovação de entrega com assinatura digital.
            </p>
          </div>
        </div>

        {/* Quick Driver Assignment Picker */}
        <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl border border-white/20">
          <div className="text-left text-xs text-[#DDD6FE]">
            <span className="block text-[10px] uppercase font-semibold text-white">Entregador em Turno:</span>
            <select
              value={selectedDriver}
              onChange={(e) => {
                const driver = availableDrivers.find((d) => d.name === e.target.value);
                if (driver) {
                  setSelectedDriver(driver.name);
                  setSelectedVehicle(driver.vehicle);
                }
              }}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              {availableDrivers.map((d) => (
                <option key={d.name} value={d.name} className="bg-[#1E0B2B] text-white">
                  {d.name} ({d.vehicle})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI METRICS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Aguardando Coleta</div>
          <div className="font-display text-2xl font-bold text-[#6D28D9] tabular-nums mt-0.5">
            {readyToShipOrders.length}
          </div>
          <div className="text-[11px] text-[#7C3AED]">Prontos no balcão da fábrica</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Em Trânsito</div>
          <div className="font-display text-2xl font-bold text-amber-600 tabular-nums mt-0.5">
            {inTransitOrders.length}
          </div>
          <div className="text-[11px] text-[#7C3AED]">Com entregadores na rua</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Entregas Hoje</div>
          <div className="font-display text-2xl font-bold text-emerald-700 tabular-nums mt-0.5">
            {completedOrders.length}
          </div>
          <div className="text-[11px] text-[#7C3AED]">Comprovantes assinados</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <div className="text-[11px] uppercase text-[#7C3AED] font-medium">Frota Climatizada</div>
          <div className="font-display text-2xl font-bold text-[#200E2E] tabular-nums mt-0.5">
            100%
          </div>
          <div className="text-[11px] text-[#7C3AED]">Controle térmico de 20°C</div>
        </div>
      </div>

      {/* SECTION 1: AGUARDANDO DESPACHO / COLETAR NA COZINHA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="font-display text-2xl font-bold text-[#200E2E]">
              1. Pedidos Prontos para Despacho
            </h2>
            <p className="text-xs text-[#7C3AED]">
              Finalizados pela cozinha e embalados nas latas lilases herméticas. Atribua a rota para iniciar a entrega.
            </p>
          </div>
          <button
            onClick={() => setActiveSpace('kitchen')}
            className="text-xs text-[#7C3AED] hover:underline font-semibold"
          >
            Ver Cozinha (KDS) &rarr;
          </button>
        </div>

        {readyToShipOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#EDE9FE] text-center text-xs text-[#7C3AED]">
            Nenhum pedido aguardando despacho no momento. Assim que a cozinha selar as latas, eles aparecerão aqui.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readyToShipOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-[#DDD6FE] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-2.5">
                    <div>
                      <span className="font-mono text-base font-bold text-[#200E2E]">#{ord.id}</span>
                      <div className="text-xs font-semibold text-[#200E2E]">{ord.customerName}</div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Pronto no Balcão
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#4C1D95]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                      <span>{ord.address}, {ord.neighborhood} — {ord.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#7C3AED]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Contato protegido via Central 4 Irmãos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                      <span>Previsão: {ord.estimatedDeliveryTime}</span>
                    </div>
                  </div>

                  {ord.notes && (
                    <div className="text-[11px] bg-[#FAF8FD] p-2 rounded-lg border border-[#EDE9FE] text-[#4C1D95]">
                      <strong>Obs:</strong> {ord.notes}
                    </div>
                  )}

                  <div className="text-[11px] text-[#7C3AED] pt-1">
                    <strong>Itens: </strong>
                    {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleStartDelivery(ord.id)}
                    className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Iniciar Trajeto com {selectedDriver.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: PEDIDOS EM TRÂNSITO (SAIU PARA ENTREGA) */}
      <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
        <div className="space-y-0.5">
          <h2 className="font-display text-2xl font-bold text-[#200E2E]">
            2. Pedidos em Rota de Entrega (Na Rua)
          </h2>
          <p className="text-xs text-[#7C3AED]">
            Entregadores a caminho do endereço do cliente com as latas lacradas. Ao entregar, confirme a assinatura digital.
          </p>
        </div>

        {inTransitOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#EDE9FE] text-center text-xs text-[#7C3AED]">
            Nenhuma entrega em trânsito no momento.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inTransitOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-amber-300 ring-1 ring-amber-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#EDE9FE] pb-2.5">
                    <div>
                      <span className="font-mono text-base font-bold text-[#200E2E]">#{ord.id}</span>
                      <div className="text-xs font-semibold text-[#200E2E]">{ord.customerName}</div>
                    </div>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Em Rota
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8FD] rounded-xl border border-[#EDE9FE] space-y-1 text-xs">
                    <div className="text-[#7C3AED]">Condutor Responsável:</div>
                    <div className="font-bold text-[#200E2E] flex items-center justify-between">
                      <span>{ord.driverName || selectedDriver}</span>
                      <span className="text-[11px] font-normal text-[#6D28D9]">{ord.driverVehicle}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#4C1D95]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                      <span>{ord.address}, {ord.neighborhood}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#7C3AED]">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Contato protegido via Central</span>
                      </div>
                      <span className="text-[10px] text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded border border-[#DDD6FE]">
                        Canal Seguro Frota
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setDeliveringModalOrder(ord.id)}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar Entrega Realizada</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: HISTÓRICO DE ENTREGAS FINALIZADAS */}
      <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
        <div className="space-y-0.5">
          <h2 className="font-display text-2xl font-bold text-[#200E2E]">
            3. Entregas Concluídas com Sucesso
          </h2>
          <p className="text-xs text-[#7C3AED]">
            Histórico das fornadas dos 4 Irmãos que já chegaram aos clientes.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EDE9FE] overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs text-[#4C1D95]">
            <thead className="bg-[#FAF8FD] border-b border-[#EDE9FE] text-[11px] uppercase tracking-wider font-semibold text-[#7C3AED]">
              <tr>
                <th className="py-3 px-4">Pedido</th>
                <th className="py-3 px-4">Destinatário</th>
                <th className="py-3 px-4">Bairro / Destino</th>
                <th className="py-3 px-4">Entregador</th>
                <th className="py-3 px-4">Valor Total</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE9FE]">
              {completedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-[#7C3AED]">
                    Nenhuma entrega concluída ainda. Finalize uma das entregas acima para registrar.
                  </td>
                </tr>
              ) : (
                completedOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF8FD]">
                    <td className="py-3 px-4 font-mono font-bold text-[#200E2E]">#{ord.id}</td>
                    <td className="py-3 px-4 font-medium text-[#200E2E]">{ord.customerName}</td>
                    <td className="py-3 px-4">{ord.neighborhood}</td>
                    <td className="py-3 px-4">{ord.driverName || 'Lucas Ferreira'}</td>
                    <td className="py-3 px-4 font-bold tabular-nums text-[#200E2E]">
                      R$ {ord.total.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Entregue
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRM DELIVERY MODAL */}
      {deliveringModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#200E2E]/50 backdrop-blur-sm"
            onClick={() => setDeliveringModalOrder(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 z-10 border border-[#EDE9FE] shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#200E2E]">
                  Comprovante de Entrega
                </h3>
                <p className="text-xs text-[#7C3AED]">Pedido #{deliveringModalOrder}</p>
              </div>
            </div>

            <form onSubmit={handleConfirmDelivered} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  Nome de quem recebeu o pacote *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Próprio cliente, Porteiro José, Secretária"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-[#4C1D95] block mb-1">
                  RG / CPF do recebedor (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Documento para conferência"
                  value={receiverDocument}
                  onChange={(e) => setReceiverDocument(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg text-[#200E2E]"
                />
              </div>

              <div className="p-3 bg-[#F5F3FF] rounded-xl border border-[#DDD6FE] text-xs text-[#7C3AED] space-y-1">
                <div className="font-semibold text-[#200E2E]">Confirmação de Integridade:</div>
                <p className="text-[11px]">
                  O selo de segurança da lata lilás dos 4 Irmãos foi verificado intacto no momento da entrega ao cliente.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeliveringModalOrder(null)}
                  className="flex-1 py-2.5 border border-[#DDD6FE] text-[#4C1D95] rounded-xl text-xs font-semibold"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Assinar & Finalizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
