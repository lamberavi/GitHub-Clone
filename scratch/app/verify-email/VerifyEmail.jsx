import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, RefreshCw, LogOut, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export function VerifyEmail() {
  const { user, logout, verifyEmailToken, resendVerificationToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [verifyState, setVerifyState] = useState(token ? 'verifying' : 'waiting'); // waiting, verifying, success, failed
  const [errorMessage, setErrorMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  // Handle Token verification on load
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        setVerifyState('verifying');
        try {
          await verifyEmailToken(token);
          setVerifyState('success');
          toast.success('Your email has been verified successfully!');
        } catch (err) {
          setVerifyState('failed');
          setErrorMessage(err.message || 'Verification link is invalid or has expired.');
          toast.error(err.message || 'Verification failed.');
        }
      };
      
      // Delay slightly for high-fidelity loading effect
      const t = setTimeout(verifyToken, 1200);
      return () => clearTimeout(t);
    }
  }, [token]);

  // Manage resend cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    const targetEmail = user?.email;
    if (!targetEmail) {
      toast.error('Could not find active email. Please login again.');
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationToken(targetEmail);
      toast.success('New verification link dispatched to your email.');
      setCooldown(60); // 60s throttle cooldown
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (verifyState) {
      case 'verifying':
        return (
          <motion.div 
            key="verifying"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-6"
          >
            <div className="flex justify-center">
              <Loader2 className="w-12 h-12 text-github-dark-accent animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Verifying account</h3>
              <p className="text-xs text-[#8b949e] max-w-xs mx-auto leading-relaxed">
                Checking secure tokens against authentication vaults. Please hold on.
              </p>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-4"
          >
            <div className="flex justify-center">
              <CheckCircle className="w-14 h-14 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Verification successful!</h3>
              <p className="text-xs text-[#8b949e] max-w-xs mx-auto leading-relaxed">
                Your email address has been activated. You are ready to log into the workspace.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/login" className="block w-full">
                <Button variant="primary" className="w-full py-2.5 font-bold">
                  Continue to Login
                </Button>
              </Link>
            </div>
          </motion.div>
        );

      case 'failed':
        return (
          <motion.div 
            key="failed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-4"
          >
            <div className="flex justify-center">
              <AlertTriangle className="w-14 h-14 text-red-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Verification link failed</h3>
              <p className="text-xs text-[#f85149] font-semibold bg-red-950/20 border border-red-500/20 p-2.5 rounded-lg max-w-sm mx-auto leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={handleResend}
                isLoading={isResending}
                disabled={cooldown > 0}
                icon={RefreshCw}
                className="w-full py-2.5"
              >
                {cooldown > 0 ? `Resend link in ${cooldown}s` : 'Resend Verification Link'}
              </Button>
              <button 
                onClick={handleLogout}
                className="w-full border border-[#30363d] hover:bg-neutral-800/40 text-[#8b949e] hover:text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut size={14} />
                <span>Go to Login / Sign In</span>
              </button>
            </div>
          </motion.div>
        );

      case 'waiting':
      default:
        return (
          <motion.div 
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Context Notice */}
            <div className="glass-panel p-5 border border-[#30363d]/60 bg-[#161b22]/30 rounded-xl space-y-4">
              <div className="flex gap-3 items-start text-xs leading-relaxed text-[#8b949e]">
                <Mail className="w-5 h-5 text-github-dark-accent shrink-0 mt-0.5" />
                <p>
                  Please click the link inside the verification email to activate your account. Once verified, reload this page or log in again to access the dashboard.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={handleResend} 
                isLoading={isResending}
                disabled={cooldown > 0}
                icon={RefreshCw}
                className="w-full py-2.5"
              >
                {cooldown > 0 ? `Resend link in ${cooldown}s` : 'Resend Verification Link'}
              </Button>

              <button 
                onClick={handleLogout}
                className="w-full border border-[#30363d] hover:bg-neutral-800/40 text-[#8b949e] hover:text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sign Out / Use different email</span>
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="space-y-6 select-none max-w-sm mx-auto">
      {/* Header Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex justify-center mb-2">
          <Github className="w-11 h-11 text-white animate-pulse-slow" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">Verify your email</h2>
        {verifyState === 'waiting' && (
          <p className="text-xs text-[#8b949e]">
            We sent a verification link to <span className="font-bold text-white">{user?.email || 'your address'}</span>.
          </p>
        )}
      </div>

      {/* Render selected state card content */}
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}
export default VerifyEmail;
