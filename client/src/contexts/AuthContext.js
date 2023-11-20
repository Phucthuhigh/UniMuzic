import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers";
import * as httpRequest from "../utils/httpRequest";
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";
import { SET_AUTH } from "../reducers/constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]);
        }

        try {
            const res = await httpRequest.get("auth");
            if (res.success && res.user.isVerified) {
                dispatch({
                    type: SET_AUTH,
                    payload: { isAuthenticated: true, user: res.user },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    const loginUser = async (userForm = {}) => {
        try {
            const res = await httpRequest.post("auth/login", userForm);
            if (res.success)
                localStorage.setItem(
                    LOCAL_STORAGE_ACCESS_TOKEN_NAME,
                    res.accessToken
                );
            await loadUser();
            if (!authState.isVerified)
                return {
                    success: false,
                    message:
                        "This account is not verified. Please check your email!",
                };
            return {
                success: true,
                message: "Logged in successfully.",
            };
        } catch (error) {
            return (
                error.response.data || {
                    success: false,
                    message: error.message,
                }
            );
        }
    };

    const signupUser = async (userForm = {}) => {
        try {
            const res = await httpRequest.post("auth/register", userForm);
            if (res.success)
                localStorage.setItem(
                    LOCAL_STORAGE_ACCESS_TOKEN_NAME,
                    res.accessToken
                );
            await loadUser();
            if (!authState.isVerified)
                return {
                    success: true,
                    message:
                        "Sign up successfully. Please check your email to verify this account!",
                };
            return {
                success: true,
                message: "Sign up successfully.",
            };
        } catch (error) {
            return (
                error.response.data || {
                    success: false,
                    message: error.message,
                }
            );
        }
    };

    const logoutUser = async () => {
        if (localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]) {
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    const verifyEmail = async (token) => {
        try {
            const res = await httpRequest.post(`auth/verify-email`, {
                emailToken: token,
            });
            if (res.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_ACCESS_TOKEN_NAME,
                    res.accessToken
                );
                await loadUser();
                return {
                    success: true,
                    message: res.message,
                };
            }
        } catch (error) {
            return (
                error.response.data || {
                    success: false,
                    message: error.message,
                }
            );
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                loginUser,
                signupUser,
                logoutUser,
                verifyEmail,
                authState,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
