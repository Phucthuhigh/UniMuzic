import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import config from "../../config";
import { AuthContext } from "../../contexts";

const Logout = () => {
    const { logoutUser } = useContext(AuthContext);
    useEffect(() => {
        logoutUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Navigate to={config.routes.home} />;
};

export default Logout;
