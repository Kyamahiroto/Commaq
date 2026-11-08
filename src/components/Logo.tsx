import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact';
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10 sm:h-12 w-auto',
  variant = 'full',
  alt = 'COM Centro Oeste - Máquinas e Manutenções'
}) => {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.svg"
        alt={alt}
        className="w-full h-full object-contain max-h-full drop-shadow-sm transition-transform duration-200 hover:scale-[1.02]"
        loading="eager"
      />
    </div>
  );
};
