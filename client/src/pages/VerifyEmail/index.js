import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const { verifyEmail } = useContext(AuthContext);
    const [isVerified, setIsVerified] = useState({
        success: false,
        message: "",
    });
    useEffect(() => {
        const handleVerifyEmail = async () => {
            const res = await verifyEmail(token);
            setIsVerified(res);
        };
        handleVerifyEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <h1>{isVerified.message}</h1>;
};

export default VerifyEmail;
