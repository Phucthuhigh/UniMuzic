import classNames from "classnames/bind";
import React, { useContext, useState, useEffect } from "react";
import styles from "./Login.module.scss";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import config from "../../config";
import AlertMessage from "../../components/AlertMessage";
import { FaCheckCircle } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";

const cx = classNames.bind(styles);

const Login = () => {
    const {
        loginUser,
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState(null);

    const { email, password } = loginForm;

    const handleLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line no-unused-vars
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                setAlert({
                    type: "success",
                    title: "Success",
                    icon: <FaCheckCircle />,
                    message: loginData.message,
                });
            } else {
                setAlert({
                    type: "error",
                    title: "Error",
                    icon: <BsExclamationCircleFill />,
                    message: loginData.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const id = setTimeout(() => setAlert(null), 5000);
        return () => {
            clearTimeout(id);
        };
    }, [alert]);

    const handleRemoveAlert = () => {
        setAlert(null);
    };

    return (
        <div className={cx("wrapper")}>
            {authLoading ? (
                <Spinner />
            ) : isAuthenticated ? (
                <Navigate to={config.routes.home} />
            ) : (
                <>
                    <i style={{ "--clr": "#fffd44" }}></i>
                    <i style={{ "--clr": "#f43f5e" }}></i>
                    <i style={{ "--clr": "#9333ea" }}></i>
                    <form className={cx("login")} onSubmit={handleSubmitLogin}>
                        <h2 className={cx("title")}>Đăng nhập</h2>
                        {alert && (
                            <AlertMessage
                                type={alert.type}
                                title={alert.title}
                                icon={alert.icon}
                                message={alert.message}
                                onClick={handleRemoveAlert}
                            />
                        )}
                        <Input
                            placeholder="Email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={handleLoginForm}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleLoginForm}
                        />
                        <Input value="Log in" type="submit" />
                        <div className={cx("links")}>
                            <Link className="link" to="/forgetpassword">
                                Quên mật khẩu?
                            </Link>
                            <Link to="/signup">Đăng ký</Link>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;
