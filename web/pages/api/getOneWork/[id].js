
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
        const FavoriteWork = await WorkModel.findById(req.query.id)
        res.status(200).json(FavoriteWork);
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: err });
    }

}