import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    userId: string | null;
    username: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    setUserId: (id: string | null) => void;
    setUsername: (username: string | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    checkSession:  () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const checkSession = async () => {
        try {
            const response = await fetch('https://devproj3ct.pl:9000/auth/session', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            setUserId(data.user_id);
            setUsername(data.username);
            setIsLoggedIn(data.isLoggedIn);
        } catch (error) {
            console.error("Error fetching session:", error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false); // Wyłączamy stan ładowania po sprawdzeniu sesji
        }
    };

    useEffect(() => {
        checkSession();
    }, [setUsername, setIsLoggedIn, isLoggedIn]);

    return (
        <AuthContext.Provider value={{ userId, username, isLoggedIn, loading, setUserId, setUsername, setIsLoggedIn, checkSession }}>
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
