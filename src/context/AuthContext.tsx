import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserRole {
  role: 'Super Admin' | 'Admin' | 'Manager' | 'Editor' | 'Customer';
}

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch role
        try {
          const roleDoc = await getDoc(doc(db, 'roles', currentUser.uid));
          if (roleDoc.exists()) {
            setRole(roleDoc.data().role);
          } else if (currentUser.email === 'fayhalim2007@gmail.com') {
            // Auto super admin for main creator
            await setDoc(doc(db, 'roles', currentUser.uid), { role: 'Super Admin', email: currentUser.email });
            setRole('Super Admin');
          } else {
            setRole('Customer');
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setRole('Customer');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
