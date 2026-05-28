import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  loyaltyPoints: number;
  bookingHistory: Booking[];
  preferences: string[];
}

interface Booking {
  id: string;
  movieTitle: string;
  showTime: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  theatre: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('movieBookingUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call your backend
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isAdmin: email === 'admin@cinema.com',
      loyaltyPoints: Math.floor(Math.random() * 1000),
      bookingHistory: [],
      preferences: ['Action', 'Comedy', 'Drama']
    };
    
    setUser(mockUser);
    localStorage.setItem('movieBookingUser', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      loyaltyPoints: 100, // Welcome bonus
      bookingHistory: [],
      preferences: []
    };
    
    setUser(mockUser);
    localStorage.setItem('movieBookingUser', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieBookingUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('movieBookingUser', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}