import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || '';
  const isAuthenticated = user ? true : false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      <Theme>
        {children}
      </Theme>
    </AuthContext.Provider>
  );
}