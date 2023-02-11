import User from "../models/userSchema.js";
import DataSchema from "../models/storeData.js";
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
        return res.redirect(`${process.env.FRONTEND_URL}/profile`);
    } catch (err) {
        logger.error(err, "Failed to authorize Google user");
        return res.json({ message: "Error" });
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
const storeDataGlobal = async (req, res) => {
    try {
        const tabId = req.body.tabId;
        const sum = req.body.sum;
        let index = -1;
        for (let i = 0; i < sum.length; i++) {
            if (tabId == sum[i].tabId) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            console.log(typeof (sum[index].sum), sum[index].sum)
            const currentPage = await DataSchema.findOne({ url: sum[index].url[0] });
            if (!currentPage) {
                const newEntry = await DataSchema.create({
                    url: sum[index].url[0],
                    dataSent: sum[index].sum
                });
                await newEntry.save();
                return res.send.json({ message: "Successfully updated" });
            }
            const currentSum = currentPage.dataSent;
            await DataSchema.updateOne({ url: sum[index].url[0] }, { dataSent: currentSum + sum[index].sum });
            return res.json({ message: "Updated successfully" });
        }

        return res.json({ message: "Invalid Data" });
    } catch (err) {
        return res.status(404).json({ message: "Failed" });
    }
}

const getAllDetails = async (req, res) => {
    try {
        const getAllUrls = await DataSchema.find({});
        return res.json({ data: getAllUrls });
    } catch {
        return res.status(404).json({ message: "Failed" });
    }
}

const logout= (req,res)=>{
    try{
        res.cookie('token',"",{
            maxAge:1,
            httpOnly: true,
            secure: true,
            sameSite: "none",});
        return res.send();
    }catch{
        return res.send();
    }
}
export { loggedIn, getDetailsGoogle, storeDataGlobal, getAllDetails,logout };
