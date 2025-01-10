'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User } from '@/types';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to get and set the Firebase ID token
  const updateToken = async (firebaseUser: FirebaseUser) => {
    try {
      // Get Firebase token
      const firebaseToken = await firebaseUser.getIdToken();
      console.log('Firebase Token:', firebaseToken); // Log Firebase token
      
      // Send Firebase token to backend to get our custom JWT
      const response = await axios.post(`${API_URL}/auth/firebase-login`, {
        token: firebaseToken
      });

      console.log('Backend Login Response:', response.data); // Log backend response
      const { access_token } = response.data;
      
      // Set our custom JWT in cookies and localStorage for redundancy
      Cookies.set('token', access_token, { expires: 7 }); // Token expires in 7 days
      localStorage.setItem('token', access_token);
      console.log('Token set in cookies and localStorage:', access_token);

      // Set the token in axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    } catch (error) {
      console.error('Error getting backend token:', error);
      // Clear any existing tokens if login fails
      Cookies.remove('token');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      // Optionally, add more detailed error handling
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      }
      throw error; // Rethrow to allow caller to handle
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Get and set the token
        await updateToken(firebaseUser);
        
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          image: firebaseUser.photoURL || '',
        };
        setUser(userData);
      } else {
        setUser(null);
        Cookies.remove('token');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await updateToken(result.user);
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('token');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
