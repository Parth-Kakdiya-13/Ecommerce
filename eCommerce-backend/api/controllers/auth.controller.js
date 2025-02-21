require("dotenv").config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { promisify } = require('util');
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

if (!process.env.SENDGRID_API_KEY) {
    console.error("Missing SENDGRID_API_KEY in .env file");
    process.exit(1);
}

const transporter = nodeMailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY
        }
    })
);

exports.postRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            return res.status(200).json({ message: "User registered successfully!" });
        } else {
            return res.status(409).json({ message: "User already exists." });
        }
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error: "Error registering user" });
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        try {
            await transporter.sendMail({
                to: email,
                from: 'parthrkakadiya@gmail.com',
                subject: "Login Successful",
                html: '<h1>You have successfully logged in.</h1>',
            });
        } catch (mailError) {
            console.error("Error sending mail:", mailError);
            return res.status(500).json({ message: "Failed to send email." });
        }

        req.session.user = user;
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error" });
            }
            res.status(200).json({ message: "Login successful", user: req.session.user });
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Error logging out" });
        }
        res.json({ message: "Logged out successfully" });
    });
};

exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, session: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
};

exports.postReset = async (req, res) => {
    console.log(req.body);
    try {
        const randomBytesAsync = promisify(crypto.randomBytes);
        const buffer = await randomBytesAsync(32);
        const token = buffer.toString('hex');
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "No account with that email found." });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 36000000; // Adjust as needed
        await user.save();
        await transporter.sendMail({
            to: req.body.email,
            from: 'parthrkakadiya@gmail.com',
            subject: "Reset Password",
            html: `Click <a href="https://ecommerce-ql8y.vercel.app/reset/${token}">here</a> to reset your password`
        });
        res.status(200).json({ message: "Reset email sent" });
    } catch (error) {
        console.error("Reset error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.postNewPassword = async (req, res) => {
    console.log(req.body);
    const token = req.params.token;
    const newPassword = req.body.password;
    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found or token expired" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("New password error:", error);
        res.status(500).json({ message: error.message });
    }
};
