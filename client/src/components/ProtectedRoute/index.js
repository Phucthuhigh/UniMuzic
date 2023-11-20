import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner";
import { AuthContext } from "../../contexts";
import config from "../../config";

const ProtectedRoute = ({ children, ...passProps }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    console.log(isAuthenticated);

    return authLoading ? (
        <Spinner />
    ) : isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate {...passProps} to={config.routes.login} />
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
