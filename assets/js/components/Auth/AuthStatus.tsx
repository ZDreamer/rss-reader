import React from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthProvider";
import {Button} from "antd";

const AuthStatus = (): JSX.Element => {
    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <div>
            Welcome {auth.user.name}!{" "}

            <Button
                onClick={() => {
                    auth.signOut(() => navigate("/"));
                }}
            >Sign out</Button>
        </div>
    );
};

export default AuthStatus;
