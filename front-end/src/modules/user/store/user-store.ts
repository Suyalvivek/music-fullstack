import { create } from "zustand";

type User = {
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
};

type UserStore = {
  user: User;
  login: (role: string, token: string) => void;
  logout: () => void;
  checkAuthStatus: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: {
    isLoggedIn: false,
    role: null,
    token: null,
  },
  
  login: (role, token) => {
    // Store in localStorage
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    
    // Update state
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: true,
        role,
        token,
      },
    }));
  },
  
  logout: () => {
    // Clear localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    
    // Update state
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: false,
        role: null,
        token: null,
      },
    }));
  },
  
  checkAuthStatus: () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token && role) {
      set((state) => ({
        user: {
          ...state.user,
          isLoggedIn: true,
          role,
          token,
        },
      }));
    }
  },
}));