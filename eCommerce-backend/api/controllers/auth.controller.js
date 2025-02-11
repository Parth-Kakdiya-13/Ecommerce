require("dotenv").config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodeMailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport');

// Ensure environment variable is correctly set
if (!process.env.SENDGRID_API_KEY) {
    console.error("Missing SENDGRID_API_KEY in .env file");
    process.exit(1); // Stop the server if API key is missing
}

const transporter = nodeMailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY
        }
    })
)


exports.postRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword })
            await newUser.save();
            res.status(200).json({ message: "User registered successfully!" });
        }
        res.status(409).json({ message: "user already exists." })
    } catch (err) {
        res.status(500).json({ error: "Error registering user" });
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Ensure email sending is handled properly
        try {
            await transporter.sendMail({
                to: email,
                from: 'parthrkakadiya@gmail.com',
                subject: "Login SuccessFull",
                html: '<h1>You successfully Login</h1>',
            });
        } catch (mailError) {
            console.error("Error sending mail:", mailError);
            return res.status(500).json({ message: "Failed to send email." });
        }

        req.session.user = user;

        return res.status(200).json({ message: "Login successful", user: req.session.user });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("logout", err);
        }
    });
    res.json({ message: "Logged Out" })
}



exports.checkSession = ("/session", (req, res) => {
    console.log(req.session);

    if (req.session) {
        res.json({ isAuthenticated: true, session: req.session });
    } else {
        res.json({ isAuthenticated: false });
    }
});

exports.postReset = async (req, res) => {
    console.log(req.body);

    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                console.log(err);
            }
            const token = buffer.toString('hex');
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(401).json({ message: "No Account with that email found." })
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 36000000;
            await user.save();
            await transporter.sendMail({
                to: req.body.email,
                from: 'parthrkakadiya@gmail.com',
                subject: "reset password",
                html: `Click This <a href=http://localhost:5173/reset/${token}>Link</a> to reset password`
            })
            res.status(200).json({ message: "email sent" })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.postNewPassword = async (req, res, next) => {
    console.log(req.body)
    const token = req.params.token;
    const newPassword = req.body.password
    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        if (!user) {
            res.status(409).json({ message: "user not found" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).json({ message: "password reset successfull" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}