import React from 'react';
import { ChefHat, Truck, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './common/BrandLogo';

export const Footer: React.FC = () => {
  const { setActiveSpace, setIsDeveloperBioOpen, siteConfig } = useApp();
  const sister1 = siteConfig.siblings?.sister1 || 'Nicole';
  const sister2 = siteConfig.siblings?.sister2 || 'Neudyelle';
  const sister3 = siteConfig.siblings?.sister3 || 'Elizene';
  const brother = siteConfig.siblings?.brother || 'Adão';

  return (
    <footer className="bg-[#190924] text-[#FAF8FD] border-t border-[#2A103D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Factory Address */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="sm" variant="light" />
            <p className="text-xs text-[#DDD6FE]/80 leading-relaxed">
              Confeitaria e boutique artesanal de biscoitos finos fundada por 4 irmãos (as irmãs {sister1}, {sister2} e {sister3}, e o irmão {brother} mestre dos fornos) apaixonados pela receita familiar que transformou tradição em arte.
            </p>
            <div className="text-xs text-[#DDD6FE]/70 space-y-1 pt-1">
              <p>{siteConfig.factoryAddress || 'Alameda das Acácias, 820 — Pinheiros, São Paulo — SP'}</p>
              <p>CEP 05422-000 | Confeitaria Artesanal</p>
              <p>Fornadas: {siteConfig.factoryHours || 'Terça a Domingo, das 07h às 19h'}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">
              Navegação
            </div>
            <ul className="space-y-2 text-xs text-[#DDD6FE]/80">
              <li>
                <a href="#fabrica" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  Apresentação dos 4 Irmãos
                </a>
              </li>
              <li>
                <a href="#cardapio" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  Cardápio de Biscoitos
                </a>
              </li>
              <li>
                <a href="#combos" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  Lata Lilás & Combos
                </a>
              </li>
              <li>
                <a href="#entrega" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  Entrega & Rastreamento
                </a>
              </li>
              <li>
                <a href="#midia" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  Mídia & Sala de Imprensa
                </a>
              </li>
              <li>
                <a href="#acoes" onClick={() => setActiveSpace('store')} className="hover:text-white text-pink-300 font-semibold transition-colors">
                  Ações da Empresa & Solidariedade
                </a>
              </li>
              <li>
                <a 
                  href="#desenvolvedora" 
                  onClick={() => {
                    setActiveSpace('store');
                    setIsDeveloperBioOpen(true);
                  }} 
                  className="hover:text-white text-[#C4B5FD] font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Desenvolvedora: Cibele Araújo</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional: HR & Logistics */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">
              Institucional & B2B
            </div>
            <ul className="space-y-2 text-xs text-[#DDD6FE]/80">
              <li>
                <a href="#rh" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  RH: Trabalhe com os 4 Irmãos
                </a>
              </li>
              <li>
                <a href="#logistica" onClick={() => setActiveSpace('store')} className="hover:text-white transition-colors">
                  Logística & Atacado B2B
                </a>
              </li>
              <li>
                <span className="text-[#A78BFA]/60">Tabela de Displays Lilases</span>
              </li>
              <li>
                <span className="text-[#A78BFA]/60">Controle de Qualidade {sister3} Prado</span>
              </li>
            </ul>
          </div>

          {/* Operational Spaces Access */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">
              Espaços da Equipe
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveSpace('kitchen');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#FAF8FD] transition-colors border border-white/10"
              >
                <ChefHat className="w-4 h-4 text-[#A78BFA]" />
                <span>Espaço da Cozinha (KDS)</span>
              </button>

              <button
                onClick={() => {
                  setActiveSpace('delivery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#FAF8FD] transition-colors border border-white/10"
              >
                <Truck className="w-4 h-4 text-[#A78BFA]" />
                <span>Espaço dos Entregadores</span>
              </button>

              <button
                onClick={() => {
                  setActiveSpace('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#FAF8FD] transition-colors border border-white/10"
              >
                <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                <span>Painel de ADM & Gestão</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and quiet metadata */}
        <div className="pt-8 border-t border-[#2A103D] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DDD6FE]/70">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 4 Irmãos — Confeitaria Artesanal Ltda.</span>
            <span aria-hidden="true">·</span>
            <span>CNPJ 42.891.310/0001-44</span>
            <span aria-hidden="true">·</span>
            <span>Feito com amor de família e manteiga pura 💜</span>
          </div>

          <div className="flex items-center gap-2 text-[#DDD6FE]">
            <span>Criado e desenvolvido por <strong className="text-white font-semibold">Cibele Araújo</strong></span>
            <span className="text-[11px] text-[#A78BFA] hidden sm:inline">(Escrever, Ler e Música 🎧)</span>
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
