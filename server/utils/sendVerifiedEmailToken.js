import transporter from "./createEmailTransporter.js";
import dotenv from "dotenv";
dotenv.config();

const sendVerifiedEmailToken = (user) => {
    const mailConfig = {
        from: "unimuzicapp@gmail.com",
        to: user.email,
        subject: "Kích hoạt email...",
        html: `
            <h1>Xin chào ${user.username} 🥳🔥</h1>
            <p>UniMuzic cảm ơn bạn đã đăng ký! Ấn vào liên kết dưới đây để xác nhận địa chỉ email của bạn:</p>
            <a href='${process.env.CLIENT_URL}/verify-email/${user.emailToken}'>Ấn vào đây để xác nhận email</a>
            <p>UniMuzic mãi iu bạn 💗</p>`,
    };
    transporter.sendMail(mailConfig, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Verification email sent.");
        }
    });
};

export default sendVerifiedEmailToken;
