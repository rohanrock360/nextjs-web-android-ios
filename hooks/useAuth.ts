'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getSession,
  clearSession,
  getAuthenticatedUser,
  setSession,
} from '@/lib/auth';

export interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check session on mount
  useEffect(() => {
    const checkSession = () => {
      const session = getSession();
      if (session) {
        setAuthState({
          user: session.email,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = useCallback((email: string) => {
    setSession(email);
    setAuthState({
      user: email,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearSession();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
}
