import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    username: string | null;
    setUsername: (username: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username') ?? null);

    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
};

export { useAuth, AuthContextProvider };
