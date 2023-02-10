import axios from "axios";
import logger from "../server.js";
const getGoogleOauthToken = async (code) => {
    try {
        const url = "https://oauth2.googleapis.com/token";
        const options = {
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        };

        const qs = new URLSearchParams(options);

        const tokens = await axios({
            method: "post",
            url: url,
            data: qs.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        return tokens.data

    }
    catch (err) {
        logger.error(err, "Failed to fetch Google Oauth Tokens");
        throw new Error(err.message);
    }
}

const getGoogleUser = async ({ id_token, access_token }) => {
    try {
        const user =
            await axios({
                method: "get",
                url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            })
        return user.data;
    }
    catch (err) {
        logger.error(err, "Error finding the user");
        throw new Error(err.message);
    }
}

export { getGoogleOauthToken, getGoogleUser }