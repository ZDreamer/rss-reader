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
        <div>
            Welcome {auth.user.name}!{" "}
            <button
                style={{height: '32px'}}
                onClick={() => {
                    auth.signOut(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </div>
    );
};

export default AuthStatus;
