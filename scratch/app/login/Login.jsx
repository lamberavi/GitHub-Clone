import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, LogIn, Mail, Lock } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { loginSchema } from '../../lib/utils/validators';
import GoogleLogin from './GoogleLogin';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [typedSubhead, setTypedSubhead] = useState('');
  
  const fullSubhead = "Sign in to continue to your workspace";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullSubhead.length) {
        setTypedSubhead(fullSubhead.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      if (err.message === 'UNVERIFIED_EMAIL') {
        navigate('/verify-email');
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      
      {/* Header Info */}
      <div className="text-center space-y-3">
        <Link to="/" className="inline-flex justify-center group">
          <div className="p-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-primary)] shadow-sm group-hover:border-[var(--accent-primary)] group-hover:scale-110 transition-all duration-500">
            <Github className="w-9 h-9 text-[var(--accent-primary)] transition-transform duration-700 group-hover:rotate-[360deg]" />
          </div>
        </Link>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Welcome Back
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] min-h-[20px] font-semibold">
            {typedSubhead}
            <span className="animate-pulse text-[var(--accent-primary)] font-bold">|</span>
          </p>
        </div>

      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
        
        {/* Email Input */}
        <Input
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="e.g. developer@github.com"
          {...register('email')}
          error={errors.email?.message}
          disabled={isLoading}
        />

        {/* Password Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-xs font-bold text-[var(--text-primary)]">Password</span>
            <Link 
              to="/forgot-password" 
              className="text-xs font-bold text-[var(--accent-primary)] hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            icon={Lock}
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            disabled={isLoading}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--border-primary)] bg-[var(--surface-canvas)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/40 transition-all cursor-pointer"
            />
            <span className="text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
              Keep me signed in
            </span>
          </label>
        </div>

        {/* Gradient Button */}
        <Button 
          type="submit" 
          variant="gradientBlue"
          className="w-full py-3 mt-3 text-sm font-bold" 
          isLoading={isLoading}
          icon={LogIn}
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-primary)]" />
        </div>
        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
          <span className="bg-[var(--surface-card)] px-3 text-[var(--text-muted)] rounded-full border border-[var(--border-primary)] py-0.5">
            OR CONTINUE WITH
          </span>
        </div>
      </div>

      {/* Google Login Component */}
      <GoogleLogin disabled={isLoading} onLoadChange={setIsLoading} />

      {/* Footer Switcher */}
      <p className="text-center text-xs text-[var(--text-muted)] pt-2 font-semibold">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          className="font-bold text-[var(--accent-primary)] hover:underline transition-colors inline-flex items-center gap-1"
        >
          <span>Create free account</span>
          <span>→</span>
        </Link>
      </p>

    </div>
  );
}
export { Login };
