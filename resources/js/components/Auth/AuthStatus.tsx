import React from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthProvider";

const AuthStatus = (): JSX.Element => {
    let auth = React.useContext(AuthContext);
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signOut(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
};

export default AuthStatus;
