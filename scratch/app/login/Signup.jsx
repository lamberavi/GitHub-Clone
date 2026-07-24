import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, UserPlus, Mail, Lock, User, AtSign } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { signupSchema } from '../../lib/utils/validators';
import GoogleLogin from './GoogleLogin';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [typedSubhead, setTypedSubhead] = useState('');

  const fullSubhead = "Build software faster with AI power";

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
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const passwordVal = watch('password', '');

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (!pwd) return score;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(passwordVal);

  const getStrengthMeta = (score) => {
    if (score === 0) return { label: 'None', color: 'bg-[var(--border-primary)] w-0' };
    if (score <= 2) return { label: 'Weak', color: 'bg-[#F85149] w-1/3' };
    if (score === 3) return { label: 'Medium', color: 'bg-[#D29922] w-2/3' };
    return { label: 'Strong', color: 'bg-[#3FB950] w-full' };
  };

  const strengthMeta = getStrengthMeta(strengthScore);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signup(
        data.email, 
        data.password, 
        data.username, 
        data.firstName, 
        data.lastName
      );
      navigate('/verify-email');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-1 custom-scrollbar text-[var(--text-primary)]">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex justify-center group">
          <div className="p-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-primary)] shadow-sm group-hover:border-[var(--accent-primary)] group-hover:scale-110 transition-all duration-500">
            <Github className="w-8 h-8 text-[var(--accent-primary)] transition-transform duration-700 group-hover:rotate-[360deg]" />
          </div>
        </Link>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Create Account
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] min-h-[20px] font-semibold">
            {typedSubhead}
            <span className="animate-pulse text-[var(--accent-primary)] font-bold">|</span>
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-1">
        
        {/* Name Fields Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            icon={User}
            placeholder="John"
            {...register('firstName')}
            error={errors.firstName?.message}
            disabled={isLoading}
          />
          <Input
            label="Last Name"
            icon={User}
            placeholder="Doe"
            {...register('lastName')}
            error={errors.lastName?.message}
            disabled={isLoading}
          />
        </div>

        <Input
          label="Username"
          icon={AtSign}
          placeholder="e.g. johndoe_dev"
          {...register('username')}
          error={errors.username?.message}
          disabled={isLoading}
        />

        <Input
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="e.g. john@antigravity.io"
          {...register('email')}
          error={errors.email?.message}
          disabled={isLoading}
        />

        {/* Password input + Strength indicator */}
        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="At least 6 characters"
            {...register('password')}
            error={errors.password?.message}
            disabled={isLoading}
          />
          {passwordVal && (
            <div className="space-y-1.5 px-1 pt-1">
              <div className="h-1.5 w-full bg-[var(--surface-canvas)] rounded-full overflow-hidden border border-[var(--border-primary)]">
                <div className={`h-full transition-all duration-500 ${strengthMeta.color}`} />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-[var(--text-muted)] uppercase">
                <span>Strength: <strong className="text-[var(--text-primary)]">{strengthMeta.label}</strong></span>
                <span>(Caps, numbers & letters)</span>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />

        {/* Terms checkbox */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-[var(--border-primary)] bg-[var(--surface-canvas)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/40 cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs leading-relaxed select-none text-[var(--text-muted)] font-semibold">
            I agree to the{' '}
            <a href="#" className="font-bold text-[var(--accent-primary)] hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="font-bold text-[var(--accent-primary)] hover:underline">Privacy Statement</a>.
          </label>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="gradientBlue"
          className="w-full py-3 mt-2 text-sm font-bold" 
          isLoading={isLoading}
          icon={UserPlus}
        >
          Create Free Account
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-primary)]" />
        </div>
        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
          <span className="bg-[var(--surface-card)] px-3 text-[var(--text-muted)] rounded-full border border-[var(--border-primary)] py-0.5">
            OR REGISTER WITH
          </span>
        </div>
      </div>

      {/* Google Sign Up */}
      <GoogleLogin disabled={isLoading} onLoadChange={setIsLoading} />

      {/* Login Switcher */}
      <p className="text-center text-xs text-[var(--text-muted)] pt-1 font-semibold">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="font-bold text-[var(--accent-primary)] hover:underline transition-colors inline-flex items-center gap-1"
        >
          <span>Sign in</span>
          <span>→</span>
        </Link>
      </p>

    </div>
  );
}
export { Signup };
