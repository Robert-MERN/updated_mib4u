
import WorkModel from "../../../models/WorkModel";
import connectMongo from "../../../utils/connectMongo";

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

        const Work = await WorkModel.find({ favorite: { $in: { userId: req.query.id } } }).sort({ createdAt: -1 });
        res.status(200).json(Work);
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: err });
    }

}