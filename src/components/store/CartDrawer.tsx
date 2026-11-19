import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, ChefHat, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    createOrder,
    setActiveSpace,
    showToast,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'express' | 'padrao' | 'retirada_fabrica'>('express');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [notes, setNotes] = useState('');
  const [createdOrderCode, setCreatedOrderCode] = useState<string | null>(null);

  const deliveryFees = {
    express: 12.0,
    padrao: 8.0,
    retirada_fabrica: 0.0,
  };

  const currentFee = deliveryFees[deliveryType];
  const grandTotal = cartTotal + (cart.length > 0 ? currentFee : 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName || !customerPhone) {
      showToast('Por favor, informe seu nome e telefone.');
      return;
    }
    if (deliveryType !== 'retirada_fabrica' && (!address || !neighborhood)) {
      showToast('Por favor, informe o endereço completo de entrega.');
      return;
    }

    const items = cart.map((c) => ({
      productId: c.product.id,
      name: c.product.name,
      price: c.product.price,
      quantity: c.quantity,
      weight: c.product.weight,
    }));

    const newOrder = createOrder({
      customerName,
      customerPhone,
      customerEmail,
      address: deliveryType === 'retirada_fabrica' ? 'Balcão da Fábrica' : address,
      neighborhood: deliveryType === 'retirada_fabrica' ? 'Sede 4 Irmãos' : neighborhood,
      city: 'São Paulo',
      zipCode: zipCode || '01420-000',
      deliveryType,
      deliveryFee: currentFee,
      items,
      total: grandTotal,
      estimatedDeliveryTime:
        deliveryType === 'express'
          ? '30-50 min (Fornada Quentinha)'
          : deliveryType === 'padrao'
          ? 'Hoje até às 18h'
          : 'Pronto em 20 min no balcão',
      notes,
    });

    setCreatedOrderCode(newOrder.id);
  };

  const handleResetAfterOrder = () => {
    setCreatedOrderCode(null);
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#200E2E]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-[#EDE9FE]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE9FE] bg-[#F5F3FF]">
          <div>
            <h2 className="font-display text-xl font-bold text-[#200E2E]">Bolsa dos 4 Irmãos 🍪</h2>
            <p className="text-xs text-[#7C3AED]">
              {cart.length === 0 ? 'Sua bolsa está vazia' : `${cart.length} item(s) artesanais selecionados`}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-[#7C3AED] hover:text-[#200E2E] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {createdOrderCode ? (
            /* Order Success View */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-[#EDE9FE] text-[#7C3AED] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#200E2E]">
                  Pedido Enviado à Fornada!
                </h3>
                <p className="text-xs text-[#7C3AED] mt-1 max-w-sm mx-auto">
                  A equipe da cozinha dos 4 Irmãos já recebeu sua comanda e iniciou a separação e o controle do forno.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8FD] border border-[#DDD6FE] rounded-2xl text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7C3AED]">
                  <span>Código de Rastreamento:</span>
                  <span className="font-mono text-sm font-bold text-[#200E2E]">{createdOrderCode}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7C3AED]">
                  <span>Tempo Estimado:</span>
                  <span className="font-medium text-[#200E2E]">
                    {deliveryType === 'express' ? '30 a 50 minutos' : 'Hoje até às 18h'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7C3AED]">
                  <span>Destino:</span>
                  <span className="font-medium text-[#200E2E] truncate max-w-[200px]">
                    {deliveryType === 'retirada_fabrica' ? 'Balcão da Fábrica' : address}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    handleResetAfterOrder();
                    setActiveSpace('kitchen');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Ver Pedido na Cozinha (KDS)</span>
                </button>

                <button
                  onClick={() => {
                    handleResetAfterOrder();
                    setActiveSpace('delivery');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#200E2E] font-medium rounded-xl text-xs tracking-wider transition-colors border border-[#DDD6FE]"
                >
                  <Truck className="w-4 h-4 text-[#7C3AED]" />
                  <span>Espaço de Entrega & Despacho</span>
                </button>

                <button
                  onClick={handleResetAfterOrder}
                  className="text-xs text-[#7C3AED] hover:text-[#200E2E] transition-colors underline pt-2 block mx-auto"
                >
                  Continuar navegando na confeitaria
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-[#F5F3FF] text-[#7C3AED] rounded-full mx-auto flex items-center justify-center">
                <ChefHat className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#200E2E]">Sua cesta está vazia</h3>
              <p className="text-xs text-[#7C3AED] max-w-xs mx-auto">
                Explore o cardápio dos 4 irmãos: amanteigados, cookies recheados e a icônica lata lilás colecionável.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-[#200E2E] text-white hover:bg-[#3B1443] rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Explorar Cardápio
              </button>
            </div>
          ) : (
            /* Cart Items + Form */
            <>
              {/* Product List */}
              <div className="divide-y divide-[#EDE9FE]">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-xl border border-[#EDE9FE] bg-[#F5F3FF] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#200E2E] truncate">{product.name}</h4>
                      <p className="text-[11px] text-[#7C3AED]">{product.weight}</p>
                      <div className="text-xs font-medium text-[#6D28D9] tabular-nums mt-0.5">
                        R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#F5F3FF] border border-[#DDD6FE] rounded-lg p-1 shrink-0">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1 hover:text-[#7C3AED] transition-colors"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-medium tabular-nums">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="p-1 hover:text-[#7C3AED] transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors shrink-0"
                      aria-label="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Selection */}
              <div className="space-y-2 pt-2 border-t border-[#EDE9FE]">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95] block">
                  Modalidade de Entrega
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('express')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryType === 'express'
                        ? 'border-[#7C3AED] bg-[#F5F3FF] text-[#200E2E] shadow-sm'
                        : 'border-[#EDE9FE] bg-white text-[#4C1D95] hover:bg-[#FAF8FD]'
                    }`}
                  >
                    <div className="text-[11px] font-bold">Expressa</div>
                    <div className="text-[10px] text-[#7C3AED]">30 a 50 min</div>
                    <div className="text-xs font-semibold tabular-nums mt-1 text-[#6D28D9]">R$ 12,00</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('padrao')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryType === 'padrao'
                        ? 'border-[#7C3AED] bg-[#F5F3FF] text-[#200E2E] shadow-sm'
                        : 'border-[#EDE9FE] bg-white text-[#4C1D95] hover:bg-[#FAF8FD]'
                    }`}
                  >
                    <div className="text-[11px] font-bold">Padrão</div>
                    <div className="text-[10px] text-[#7C3AED]">Hoje até 18h</div>
                    <div className="text-xs font-semibold tabular-nums mt-1 text-[#6D28D9]">R$ 8,00</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('retirada_fabrica')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryType === 'retirada_fabrica'
                        ? 'border-[#7C3AED] bg-[#F5F3FF] text-[#200E2E] shadow-sm'
                        : 'border-[#EDE9FE] bg-white text-[#4C1D95] hover:bg-[#FAF8FD]'
                    }`}
                  >
                    <div className="text-[11px] font-bold">Na Fábrica</div>
                    <div className="text-[10px] text-[#7C3AED]">Balcão café</div>
                    <div className="text-xs font-semibold tabular-nums mt-1 text-emerald-700">Grátis</div>
                  </button>
                </div>
              </div>

              {/* Checkout Form */}
              <form id="cart-form" onSubmit={handleSubmitOrder} className="space-y-3 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95] block">
                  Dados para Entrega & Contato
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome completo *"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp *"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                    />
                  </div>
                </div>

                {deliveryType !== 'retirada_fabrica' && (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Endereço e Número *"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Bairro *"
                          required
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="CEP (ex: 01420-001)"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                      />
                      <input
                        type="email"
                        placeholder="E-mail (recibo)"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <textarea
                    rows={2}
                    placeholder="Observações especiais (ex: embalagem lilás para presente, instruções para o entregador...)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#FAF8FD] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-[#200E2E]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer / Total & Checkout CTA */}
        {!createdOrderCode && cart.length > 0 && (
          <div className="p-6 border-t border-[#EDE9FE] bg-[#F5F3FF] space-y-3">
            <div className="space-y-1.5 text-xs text-[#4C1D95]">
              <div className="flex justify-between">
                <span>Subtotal dos biscoitos</span>
                <span className="tabular-nums font-medium text-[#200E2E]">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Entrega</span>
                <span className="tabular-nums font-medium text-[#200E2E]">
                  {currentFee === 0 ? 'Grátis' : `R$ ${currentFee.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#200E2E] pt-2 border-t border-[#DDD6FE]">
                <span>Total do Pedido</span>
                <span className="tabular-nums text-base text-[#6D28D9]">
                  R$ {grandTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="cart-form"
              className="w-full py-3 px-4 bg-[#200E2E] hover:bg-[#3B1443] text-white rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md"
            >
              <span>Confirmar Pedido de Biscoitos</span>
              <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#7C3AED]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Embalagem lacrada com atmosfera controlada para crocância perfeita</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
