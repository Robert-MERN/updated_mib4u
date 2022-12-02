import connectMongo from "../../utils/connectMongo";
import UserModel from "../../models/userModel";
import cryptojs from "crypto-js";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function registerUser(req, res) {
    console.log("Connecting with DB")
    try {
        await connectMongo();
        console.log("Successfuly conneted with DB");
        const { password, ...other } = req.body;
        const encrypted = cryptojs.AES.encrypt(password, process.env.CJS_KEY).toString();
        const user = new UserModel({ password: encrypted, ...other });
        await user.save()
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false, error: err.stack})
    }

}

