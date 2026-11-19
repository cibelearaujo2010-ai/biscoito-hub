import React from 'react';
import { ShoppingBag, ChefHat, Truck, ShieldCheck, Store, ArrowLeft } from 'lucide-react';
import { useApp, AppSpace } from '../context/AppContext';
import { BrandLogo } from './common/BrandLogo';

export const Navbar: React.FC = () => {
  const { activeSpace, setActiveSpace, cartCount, setIsCartOpen } = useApp();

  const navLinks = [
    { label: 'Início', href: '#topo' },
    { label: 'A Fábrica', href: '#fabrica' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Combos', href: '#combos' },
    { label: 'Ações', href: '#acoes' },
    { label: 'Logística', href: '#logistica' },
    { label: 'Mídia', href: '#midia' },
    { label: 'RH & Vagas', href: '#rh' },
    { label: 'Entrega', href: '#entrega' },
  ];

  const spaces: { id: AppSpace; label: string; icon: React.ReactNode }[] = [
    { id: 'store', label: 'Boutique & Fábrica', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'kitchen', label: 'Cozinha (KDS)', icon: <ChefHat className="w-3.5 h-3.5" /> },
    { id: 'delivery', label: 'Espaço Entrega', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Painel ADM', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      {/* Operational Space Switcher Banner */}
      <div className="bg-[#1E0B2B] text-[#EDE9FE] text-xs py-1.5 px-4 sm:px-8 border-b border-[#301344]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] text-[#DDD6FE]">
            <span>4 Irmãos — Confeitaria Artesanal</span>
            <span aria-hidden="true">·</span>
            <span>Fornos Operando a 180°C</span>
            <span aria-hidden="true">·</span>
            <span>Entregas em Tempo Real</span>
          </div>

          <div className="flex items-center gap-1 bg-[#14071D] p-0.5 rounded-lg border border-[#3A1853]">
            {spaces.map((sp) => {
              const isActive = activeSpace === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setActiveSpace(sp.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#7C3AED] text-white shadow-sm font-semibold'
                      : 'text-[#DDD6FE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sp.icon}
                  <span>{sp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EDE9FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault();
              setActiveSpace('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col whitespace-nowrap shrink-0 group text-left"
          >
            <BrandLogo size="sm" variant="dark" />
          </a>

          {/* Zone 2: concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs xl:text-sm font-medium text-[#4C1D95]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (activeSpace !== 'store') {
                    setActiveSpace('store');
                  }
                }}
                className="hover:text-[#6D28D9] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#7C3AED]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + return button if in operational space */}
          <div className="flex items-center gap-2.5 shrink-0">
            {activeSpace !== 'store' && (
              <button
                onClick={() => {
                  setActiveSpace('store');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#3B0764] bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] rounded-lg transition-all active:scale-[0.98] whitespace-nowrap shrink-0 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="hidden sm:inline">Voltar ao Início</span>
                <span className="sm:hidden">Início</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#200E2E] bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] rounded-lg transition-all active:scale-[0.98] whitespace-nowrap shrink-0 shadow-sm"
              aria-label="Abrir carrinho de compras"
            >
              <ShoppingBag className="w-4 h-4 text-[#7C3AED]" />
              <span>Bolsa da Fábrica</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#7C3AED] text-white rounded text-[11px] font-bold tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
