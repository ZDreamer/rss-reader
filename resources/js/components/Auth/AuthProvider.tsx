import React from 'react';
import ApiAuth from "../../api/ApiAuth";

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let signIn = (newUser: string, callback: VoidFunction) => {
        return ApiAuth.signIn(() => {
            setUser(newUser);
            callback();
        });
    };

    let signOut = (callback: VoidFunction) => {
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
