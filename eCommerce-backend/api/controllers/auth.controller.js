const User = require('../models/user');
const bcrypt = require('bcrypt');



exports.postLogin = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(409).json({ message: "user not found" })
        }

        const doMatch = await bcrypt.compare(password, user.password);

        if (!doMatch) {
            return res.status(300).json({ message: "incorrect password. plz try again" })
        }

        req.session.user = user
        req.session.save(err => {
            console.log(err);
        });
        res.status(200).json({ message: 'user Login successfull.', sessionId: req.sessionId })


    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged Out" })
}

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {

        const isUser = await User.findOne({ email: email })
        if (isUser) {
            return res.status(201).json({ message: "user already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 12)

        const user = new User({ email, password: hashPassword });

        await user.save();
        res.status(201).json({ data: user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

exports.checkSession = ("/session", (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});
