import User from "../models/userSchema.js";
import logger from "../server.js";
import jwt from 'jsonwebtoken';
import { getGoogleOauthToken, getGoogleUser } from "../utils/auth.util.js";

const getDetailsGoogle = async (req, res) => {
    const code = req.query.code;
    try {
        const { id_token, access_token } = await getGoogleOauthToken(code);

        const user = await getGoogleUser({ id_token, access_token });
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
            const newUser = await User.create({ email: user.email, name: user.name, isUpdated: false });
            await newUser.save();
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        console.log(user)
        return res.redirect(`${process.env.FRONTEND_URL}`);
    } catch (err) {
        logger.error(err, "Failed to authorize Google user");
        return res.json({message:"Error"});
    }
}

const loggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch (err) {
        return res.json(false);
    }
}

export { loggedIn, getDetailsGoogle };
