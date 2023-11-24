import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import Input from "../../components/Input";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts";
import Spinner from "../../components/Spinner";
import config from "../../config";
import AlertMessage from "../../components/AlertMessage";
import { FaCheckCircle } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";

const cx = classNames.bind(styles);

const Signup = () => {
    const {
        signupUser,
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [alert, setAlert] = useState(null);

    const { username, email, phoneNumber, password, confirmPassword } =
        loginForm;

    const handleSignupForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line no-unused-vars
            const loginData = await signupUser(loginForm);
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
                    <form className={cx("signup")}>
                        <h2 className={cx("title")}>Đăng ký</h2>
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
                            onChange={handleSignupForm}
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={username}
                        />
                        <Input
                            onChange={handleSignupForm}
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={email}
                        />
                        <Input
                            onChange={handleSignupForm}
                            placeholder="Phone number"
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                        />
                        <Input
                            onChange={handleSignupForm}
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                        />
                        <Input
                            onChange={handleSignupForm}
                            placeholder="Confirm password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                        />
                        <Input
                            value="Sign up"
                            type="submit"
                            onClick={handleSubmitSignup}
                        />
                        <div className={cx("links")}>
                            <span>Bạn đã có tài khoản trước đó?</span>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Signup;
