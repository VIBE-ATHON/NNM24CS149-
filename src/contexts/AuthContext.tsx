import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  photo_url?: string;
  location?: string;
  timezone?: string;
  total_credits: number;
  current_rank: 'bronze' | 'silver' | 'gold';
  skills_teaching: string[];
  skills_learning: string[];
  badges: Badge[];
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Smith',
    bio: 'Full-stack developer passionate about teaching and learning new technologies.',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'San Francisco, CA',
    timezone: 'PST',
    total_credits: 1250,
    current_rank: 'gold',
    skills_teaching: ['React', 'Node.js', 'TypeScript'],
    skills_learning: ['Python', 'Machine Learning', 'DevOps'],
    badges: [
      { id: '1', name: 'First Teacher', description: 'Taught your first lesson', icon: '🎓', earned_at: '2024-01-15' },
      { id: '2', name: 'Helpful Mentor', description: 'Received 10+ positive reviews', icon: '⭐', earned_at: '2024-02-20' }
    ],
    created_at: '2024-01-01'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('skillswap-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('skillswap-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      bio: '',
      photo_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
      location: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      total_credits: 100,
      current_rank: 'bronze',
      skills_teaching: [],
      skills_learning: [],
      badges: [
        { id: '1', name: 'Welcome', description: 'Joined SkillSwap', icon: '👋', earned_at: new Date().toISOString() }
      ],
      created_at: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('skillswap-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillswap-user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('skillswap-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
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