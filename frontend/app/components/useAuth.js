"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAuthOptions, setShowAuthOptions] = useState(false);
    const router = useRouter();
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    useEffect(() => {
        if (!storedUser || !token) {
            localStorage.removeItem("token"); 
            localStorage.removeItem("user"); 
            setLoading(false);
            setShowAuthOptions(true); 
            router.push("/login");
            return; 
        }

        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (token && parsedUser) {
            axios.get(`http://localhost:3000/api/user/profile?id=${parsedUser.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                if (response.data) {
                    setUser(response.data.user);
                    setShowAuthOptions(false); 
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setShowAuthOptions(true);
                    router.push("/login");
                }
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setShowAuthOptions(true);
                router.push("/login");
            })
            .finally(() => setLoading(false));
        }
    }, [token, storedUser]);

    return { user, loading, showAuthOptions };
}

export default useAuth;