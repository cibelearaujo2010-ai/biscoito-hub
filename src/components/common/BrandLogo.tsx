import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'icon-only';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  className = '',
}) => {
  // Sizing definitions
  const imageSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const titleSizes = {
    xs: 'text-base',
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const subtitleSizes = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-xs sm:text-sm',
    xl: 'text-sm',
  };

  const isLightMode = variant === 'light'; // Light text on dark bg

  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex shrink-0 ${className}`}>
        <img
          src="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
          alt="Logotipo Oficial 3 Irmãs & 1 Biscoito — 4 Irmãos Confeitaria Artesanal"
          referrerPolicy="no-referrer"
          className={`${imageSizes[size]} rounded-full object-cover shadow-sm ring-2 ring-[#A78BFA]/40 hover:ring-[#7C3AED] transition-all`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Crest Logo Emblem */}
      <div className="relative shrink-0 group">
        <img
          src="/assets/aistudio/IMG-20261118-WA0089_718f6124.jpg"
          alt="Logotipo Oficial 3 Irmãs & 1 Biscoito — 4 Irmãos Confeitaria Artesanal"
          referrerPolicy="no-referrer"
          className={`${imageSizes[size]} rounded-full object-cover shadow-md ring-2 ring-[#A78BFA]/40 group-hover:ring-[#7C3AED] group-hover:scale-105 transition-all duration-300`}
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center text-[8px] text-[#200E2E] font-bold shadow-sm">
          ★
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display font-bold tracking-tight transition-colors ${
              titleSizes[size]
            } ${isLightMode ? 'text-white' : 'text-[#200E2E]'}`}
          >
            4 Irmãos
          </span>
          <span
            className={`font-medium hidden sm:inline ${
              isLightMode ? 'text-[#DDD6FE]' : 'text-[#7C3AED]'
            } ${subtitleSizes[size]}`}
          >
            — Confeitaria Artesanal
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`uppercase tracking-widest font-semibold mt-0.5 ${
              subtitleSizes[size]
            } ${isLightMode ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}
          >
            Biscoitos Finos & Pâtisserie
          </span>
        )}
      </div>
    </div>
  );
};
