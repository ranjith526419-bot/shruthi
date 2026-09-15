import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, BloodGroup } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import { getStoredItem, setStoredItem, clearStoredItem, STORAGE_KEYS } from '../services/storage';

const sanitizeRole = (val: any): UserRole => {
  if (val === 'seeker' || val === 'hospital' || val === 'admin') return val;
  return 'donor';
};

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  isDemoMode: boolean;
  login: (email: string, password?: string, desiredRole?: UserRole) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: {
    displayName: string;
    email: string;
    role: UserRole;
    phone: string;
    city: string;
    bloodGroup?: BloodGroup;
    password?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = getStoredItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    return stored.map((u) => ({ ...u, role: sanitizeRole(u.role) }));
  });

  // Default to Donor persona (Elena) for an immediate rich experience, or the stored user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = getStoredItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (saved && saved.id) {
      return {
        ...saved,
        role: sanitizeRole(saved.role)
      };
    }
    return INITIAL_USERS[0]; // Elena Rostova (Donor)
  });

  useEffect(() => {
    if (currentUser) {
      setStoredItem(STORAGE_KEYS.CURRENT_USER, currentUser);
    } else {
      clearStoredItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.USERS, users);
  }, [users]);

  const login = async (email: string, _password?: string, desiredRole?: UserRole) => {
    const trimmed = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === trimmed);
    if (found) {
      const sanitized = { ...found, role: sanitizeRole(found.role) };
      setCurrentUser(sanitized);
      return { success: true };
    }

    // Create session user with sanitized safe role
    const safeRole: UserRole = sanitizeRole(desiredRole);
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: trimmed,
      displayName: trimmed.split('@')[0] || 'Member',
      role: safeRole,
      city: 'Seattle',
      state: 'WA',
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const signup = async (userData: {
    displayName: string;
    email: string;
    role: UserRole;
    phone: string;
    city: string;
    bloodGroup?: BloodGroup;
    password?: string;
  }) => {
    const trimmed = userData.email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmed);
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const safeRole: UserRole = sanitizeRole(userData.role);
    const newUser: User = {
      id: `user_${Date.now()}`,
      displayName: userData.displayName,
      email: trimmed,
      role: safeRole,
      phone: userData.phone,
      city: userData.city,
      state: 'WA',
      bloodGroup: userData.bloodGroup,
      isVerified: safeRole !== 'hospital', // Hospitals start unverified until admin review
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const resetPassword = async (_email: string) => {
    return { success: true, message: 'Password reset link sent to your email.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const safeTarget = sanitizeRole(targetRole);
    const roleUser = INITIAL_USERS.find((u) => u.role === safeTarget);
    if (roleUser) {
      setCurrentUser(roleUser);
    } else {
      const dummy: User = {
        id: `user_${safeTarget}_demo`,
        email: `${safeTarget}@lifedrop.org`,
        displayName: `${safeTarget.charAt(0).toUpperCase() + safeTarget.slice(1)} Demo User`,
        role: safeTarget,
        city: 'Seattle',
        isVerified: true,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(dummy);
    }
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...data,
      role: data.role ? sanitizeRole(data.role) : currentUser.role
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        role: sanitizeRole(currentUser?.role),
        isDemoMode: true,
        login,
        signup,
        resetPassword,
        logout,
        switchDemoRole,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
