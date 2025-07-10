'use client';

import { createContext, useState } from "react";
import { User, AuthContextType } from "@/lib/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children : React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
