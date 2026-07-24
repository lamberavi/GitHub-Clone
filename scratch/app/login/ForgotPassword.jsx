import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { forgotPasswordSchema } from '../../lib/utils/validators';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setIsSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="text-center space-y-3">
        <Link to="/" className="inline-flex justify-center group">
          <div className="p-3 rounded-2xl bg-[#0D1117]/80 border border-[#58A6FF]/40 shadow-[0_0_25px_rgba(88,166,255,0.25)] group-hover:border-[#58A6FF] group-hover:scale-110 transition-all duration-500">
            <Github className="w-8 h-8 text-[#58A6FF] transition-transform duration-700 group-hover:rotate-[360deg]" />
          </div>
        </Link>

        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Reset Password
          </h2>
          <p className="text-xs text-[#8B949E] leading-relaxed max-w-sm mx-auto font-medium">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <Input
            label="Email address"
            type="email"
            icon={Mail}
            placeholder="e.g. developer@github.com"
            {...register('email')}
            error={errors.email?.message}
            disabled={isLoading}
          />

          <Button 
            type="submit" 
            variant="gradientBlue"
            className="w-full py-3 text-sm font-bold shadow-[0_0_20px_rgba(88,166,255,0.3)]" 
            isLoading={isLoading}
          >
            Send Recovery Link
          </Button>

          <Link to="/login" className="flex items-center justify-center gap-2 text-xs font-bold text-[#8B949E] hover:text-[#58A6FF] transition-colors pt-2">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </form>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="w-14 h-14 bg-[#238636]/20 border border-[#238636] rounded-full flex items-center justify-center text-[#3FB950] mx-auto text-2xl animate-bounce shadow-[0_0_20px_rgba(63,185,80,0.3)]">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-bold text-xl text-white">Check your inbox</h3>
          <p className="text-xs text-[#8B949E] leading-relaxed">
            Recovery instructions have been sent to <span className="font-bold text-white">{submittedEmail}</span>.
          </p>
          <Link to="/login">
            <Button variant="gradientBlue" className="w-full py-3 mt-4 text-sm font-bold">
              Proceed to Sign In
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}
export { ForgotPassword };
