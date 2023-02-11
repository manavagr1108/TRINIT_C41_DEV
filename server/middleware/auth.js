import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.email = verified.email;
        next();
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

export default auth;
