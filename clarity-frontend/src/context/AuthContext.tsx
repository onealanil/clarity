import { createContext, ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { AuthContextType } from "../interfaces/auth/Auth";


export const AuthContext = createContext<AuthContextType>({
    user: null,
    accessToken: null,
    setAuth: () => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { user, accessToken, setAuth, logout } = useAuthStore();

    return (
        <AuthContext.Provider value={{ user, accessToken, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
