import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  isSuccess = false,
  isDisabled = false,
  className = '',
  icon: Icon,
  loadingText
}) {
  const baseStyle = 'relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer overflow-hidden transform';
  
  const variants = {
    primary: 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] hover:shadow-glow hover:-translate-y-0.5 hover:scale-[1.01] border border-transparent',
    gradientBlue: 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] hover:shadow-[0_0_25px_var(--accent-glow)] hover:-translate-y-0.5 hover:scale-[1.01] border border-transparent',
    secondary: 'bg-[var(--surface-secondary)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-primary)] hover:-translate-y-0.5 shadow-sm',
    outline: 'bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
    success: 'bg-[#238636] dark:bg-[#238636] light:bg-[#1a7f37] text-white hover:opacity-90',
    danger: 'bg-[#cf222e] dark:bg-[#da3633] text-white hover:opacity-90',
    ghost: 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  return (
    <motion.button
      whileTap={{ scale: isDisabled || isLoading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-current shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}

      {isSuccess && (
        <svg className="h-5 w-5 text-current shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      )}

      {!isLoading && !isSuccess && Icon && (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="shrink-0 transition-transform group-hover:scale-110" />
      )}

      <span className="relative z-10">{isLoading ? (loadingText || 'Processing...') : isSuccess ? 'Success!' : children}</span>
    </motion.button>
  );
}
export { Button };
