import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login as reduxLogin, logout as reduxLogout } from '../redux/slices/authSlice';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../../services/firebase';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Helper to update both React Context State and Redux state simultaneously
  const updateUserState = (userData, tokenStr) => {
    setUser(userData);
    if (tokenStr) {
      localStorage.setItem('token', tokenStr);
    }
    if (userData && (userData.isVerified || userData.emailVerified)) {
      dispatch(reduxLogin({ user: userData, token: tokenStr || localStorage.getItem('token') }));
    } else if (!userData) {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      dispatch(reduxLogout());
    }
  };

  // Helper to destroy old sessions before creating new ones (Phase 10 & 11)
  const clearSession = async () => {
    try {
      localStorage.removeItem('mock_user');
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      await api.post('/api/auth/logout').catch(() => {});
      updateUserState(null);
    } catch (err) {
      console.warn('Session clearance warning:', err.message);
    }
  };

  // Check if Firebase configuration keys are placeholders
  const isMockMode = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === '';

  // Monitor Auth session persistence
  useEffect(() => {
    if (isMockMode) {
      const savedUser = localStorage.getItem('mock_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        const savedToken = localStorage.getItem('token') || ('mock_jwt_token_' + parsed.uid);
        updateUserState(parsed, savedToken);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const response = await api.post('/api/auth/login', { uid: firebaseUser.uid });
          const tokenStr = response.data?.token || response.data?.accessToken || ('mock_jwt_token_' + firebaseUser.uid);
          updateUserState({
            ...response.data.user,
            emailVerified: firebaseUser.emailVerified
          }, tokenStr);
        } else {
          updateUserState(null);
        }
      } catch (error) {
        console.error('Session persistence check error:', error.message);
        updateUserState(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isMockMode]);

  // Sign up
  const signup = async (email, password, username, firstName, lastName) => {
    setLoading(true);
    try {
      await clearSession();

      if (isMockMode) {
        const mockUid = 'mock_uid_' + Math.floor(Math.random() * 100000);
        const newUser = {
          id: 'mock_mongo_id_' + mockUid,
          uid: mockUid,
          username,
          firstName,
          lastName,
          email,
          photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          provider: 'email',
          isVerified: false,
          role: 'user',
          emailVerified: false
        };

        try {
          const res = await api.post('/api/auth/register', newUser);
          const syncedUser = { ...res.data.user, emailVerified: false };
          setUser(syncedUser);
          localStorage.setItem('mock_user', JSON.stringify(syncedUser));
        } catch (dbErr) {
          console.warn('Express backend offline, running in mock frontend state.');
          setUser(newUser);
          localStorage.setItem('mock_user', JSON.stringify(newUser));
        }

        toast.success('Registration successful! Check console/inbox for verification link.');
        return true;
      }

      // Real Firebase Register
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Sync to MongoDB Backend (sends NodeMailer email)
      const res = await api.post('/api/auth/register', {
        uid: firebaseUser.uid,
        email,
        username,
        firstName,
        lastName,
        photo: firebaseUser.photoURL || undefined,
        provider: 'email'
      });

      setUser({
        ...res.data.user,
        emailVerified: false
      });
      
      toast.success('Verification link sent! Please check your email.');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Login Restrictions (Phase 10)
  const login = async (email, password) => {
    setLoading(true);
    try {
      await clearSession();

      if (isMockMode) {
        try {
          // If express is active, query database
          const res = await api.post('/api/auth/login', { uid: 'mock_uid_developer' });
          updateUserState(res.data.user);
          localStorage.setItem('mock_user', JSON.stringify(res.data.user));
          toast.success('Logged in successfully!');
          return true;
        } catch (dbErr) {
          if (dbErr.response?.status === 403 && dbErr.response?.data?.isUnverified) {
            toast.error(dbErr.response.data.message);
            setUser({
              email: dbErr.response.data.email,
              isVerified: false,
              emailVerified: false
            });
            throw new Error('UNVERIFIED_EMAIL');
          }

          // Static fallback user
          const mockUser = {
            id: 'mock_mongo_id_dev',
            uid: 'mock_uid_dev',
            username: 'ravil_developer',
            firstName: 'Ravil',
            lastName: 'Developer',
            email,
            photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            provider: 'email',
            isVerified: true,
            role: 'admin',
            emailVerified: true
          };
          updateUserState(mockUser);
          localStorage.setItem('mock_user', JSON.stringify(mockUser));
          toast.success('Logged in successfully (Mock Mode)!');
          return true;
        }
      }

      // Real Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      try {
        // Sync & login check on MongoDB backend
        const res = await api.post('/api/auth/login', { uid: firebaseUser.uid });
        updateUserState({
          ...res.data.user,
          emailVerified: firebaseUser.emailVerified
        });
        toast.success('Logged in successfully!');
        return true;
      } catch (dbErr) {
        if (dbErr.response?.status === 403 && dbErr.response?.data?.isUnverified) {
          toast.error(dbErr.response.data.message);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isVerified: false,
            emailVerified: false
          });
          throw new Error('UNVERIFIED_EMAIL');
        }
        throw dbErr;
      }
    } catch (error) {
      if (error.message !== 'UNVERIFIED_EMAIL') {
        toast.error(error.response?.data?.message || error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Login
  const googleLogin = async () => {
    setLoading(true);
    try {
      await clearSession();

      if (isMockMode) {
        const googleMockUser = {
          id: 'mock_mongo_id_google_123',
          uid: 'mock_uid_google_123',
          username: 'google_user',
          firstName: 'Google',
          lastName: 'OAuth User',
          email: 'google.auth@gmail.com',
          photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          provider: 'google',
          isVerified: true,
          role: 'user',
          emailVerified: true
        };
        updateUserState(googleMockUser);
        localStorage.setItem('mock_user', JSON.stringify(googleMockUser));
        toast.success('Google login simulation successful!');
        return true;
      }

      // Real Google Firebase Auth Popup
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const res = await api.post('/api/auth/google', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      });

      updateUserState({
        ...res.data.user,
        emailVerified: true
      });

      toast.success('Signed in with Google!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Secure Token Email Verification Action
  const verifyEmailToken = async (token) => {
    try {
      const res = await api.post('/api/auth/verify-email', { token });
      if (user) {
        const verifiedUser = { ...user, isVerified: true, emailVerified: true };
        updateUserState(verifiedUser);
        if (isMockMode) {
          localStorage.setItem('mock_user', JSON.stringify(verifiedUser));
        }
      }
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  // Secure Token Resend Request Action
  const resendVerificationToken = async (email) => {
    try {
      const res = await api.post('/api/auth/resend-verification', { email });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      if (!isMockMode) {
        await signOut(auth);
      }
      await clearSession();
      toast.success('Logged out successfully.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      if (isMockMode) {
        toast.success('Reset email simulated successfully!');
        return true;
      }
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check inbox.');
      return true;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    googleLogin,
    logout,
    forgotPassword,
    clearSession,
    verifyEmailToken,
    resendVerificationToken,
    isMockMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContext;
