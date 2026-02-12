import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "../store/useAuthStore";

export const useBootstrapAuth = () => {
    const { setAuth, logout } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const { data } = await axiosInstance.get("/refresh-token");
                setAuth(data.user, data.accessToken);
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return loading;
};
