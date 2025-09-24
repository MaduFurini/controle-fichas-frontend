import { createContext, useContext, useState, useEffect } from 'react';
import { encryptData, decryptData } from '../utils/crypto';
import authService from '../services/authService';
import { useApp } from './AppContext';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const { setUserData, updateDadosUsuarioLocalStorage } = useApp();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const encryptedToken = localStorage.getItem('authToken');
                if (encryptedToken) {
                    const token = decryptData(encryptedToken);
                    const userData = await authService.validateToken(token);

                    setUser(userData);
                    updateDadosUsuarioLocalStorage(userData);
                }
            } catch (error) {
                localStorage.removeItem('authToken');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            const { token, user: userData } = response.data;

            const encryptedToken = encryptData(token);
            localStorage.setItem('authToken', encryptedToken);

            setUser(userData);
            updateDadosUsuarioLocalStorage(userData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro no login'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        updateDadosUsuarioLocalStorage({});
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
