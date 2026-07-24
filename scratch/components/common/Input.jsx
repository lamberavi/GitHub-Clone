import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-bold text-[var(--text-primary)] tracking-wide flex items-center justify-between">
          <span>
            {label} {required && <span className="text-[#F85149]">*</span>}
          </span>
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3.5'} ${isPassword ? 'pr-10' : 'pr-3.5'} py-2.5 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] placeholder-[var(--text-muted)] border border-[var(--border-primary)] rounded-xl outline-none transition-all duration-300 ${
            error
              ? 'border-[#F85149] shadow-[0_0_12px_rgba(248,81,73,0.3)] focus:border-[#F85149]'
              : 'hover:border-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-glow)]'
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors p-1 rounded-md cursor-pointer select-none"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-[#F85149] font-medium mt-0.5 animate-fade-in flex items-center gap-1">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}
export { Input };
