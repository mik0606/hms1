import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, Admin, Doctor, Pharmacist, Pathologist } from '../types';

interface AuthContextType {
    user: User | Admin | Doctor | Pharmacist | Pathologist | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | Admin | Doctor | Pharmacist | Pathologist | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const authResult = await authService.getUserData();

            if (authResult) {
                setUser(authResult.user);
                setToken(authResult.token);
            } else {
                setUser(null);
                setToken(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const authResult = await authService.signIn(email, password);
            setUser(authResult.user);
            setToken(authResult.token);
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await authService.signOut();
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        signIn,
        signOut,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
