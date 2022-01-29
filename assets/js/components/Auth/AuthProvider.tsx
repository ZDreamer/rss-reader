import React from 'react';
import ApiAuth from "../../api/ApiAuth";

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>({
        id: 1,
        name: 'Bob'
    });

    const signIn = (newUser: string, callback: VoidFunction) => {
        return ApiAuth.signIn(() => {
            setUser(newUser);
            callback();
        });
    };

    const signOut = (callback: VoidFunction) => {
        return ApiAuth.signOut(() => {
            setUser(null);
            callback();
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
