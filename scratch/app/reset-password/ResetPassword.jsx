import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Github, KeyRound } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ token: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formData.token) {
      nextErrors.token = 'Verification code is required';
    }
    
    if (!formData.password) {
      nextErrors.password = 'New password is required';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex justify-center mb-2">
          <Github className="w-10 h-10 text-github-light-text dark:text-github-dark-text" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight font-sans">Set new password</h2>
        <p className="text-sm text-github-light-textMuted dark:text-github-dark-textMuted">
          Please enter the secure verification code you received.
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Verification Code"
            name="token"
            placeholder="e.g. 840912"
            value={formData.token}
            onChange={handleChange}
            error={errors.token}
            required
          />

          <Input
            label="New Password"
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button 
            type="submit" 
            className="w-full py-2.5 mt-2" 
            isLoading={isLoading}
          >
            Update password
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="w-12 h-12 bg-github-light-success/15 dark:bg-github-dark-success/15 rounded-full flex items-center justify-center text-github-light-success dark:text-github-dark-success mx-auto text-xl">
            ✓
          </div>
          <h3 className="font-semibold text-lg">Password updated</h3>
          <p className="text-sm text-github-light-textMuted dark:text-github-dark-textMuted">
            Your login password has been successfully modified.
          </p>
          <Link to="/login">
            <Button className="w-full py-2.5 mt-4">Proceed to Sign In</Button>
          </Link>
        </div>
      )}

    </div>
  );
}
