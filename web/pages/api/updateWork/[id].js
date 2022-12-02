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
        if (req.query.favorite === "like") {
            await WorkModel.findByIdAndUpdate(req.query.id, { $push: { favorite: req.body.favorite } });

            res.status(200).json({ success: true, message: "You liked the work." });
        } else if (req.query.favorite === "dislike") {
            await WorkModel.findByIdAndUpdate(req.query.id, { $pull: { favorite: req.body.favorite } });

            res.status(200).json({ success: true, message: "You disliked the work." });
        } else {
            var objForUpdate = {};
            if (req.body.title) objForUpdate.title = req.body.title;
            if (req.body.about) objForUpdate.about = req.body.about;
            if (req.body.status) objForUpdate.status = req.body.status;
            if (req.body.price) objForUpdate.price = req.body.price;
            if (req.body.deletedPrice) objForUpdate.deletedPrice = req.body.deletedPrice;
            if (req.body.image) objForUpdate.image = req.body.image;
            if (req.body.category) objForUpdate.category = req.body.category;
            if (req.body.favorite) objForUpdate.favorite = req.body.favorite;
            if (req.body.size) objForUpdate.size = req.body.size;

            await WorkModel.findByIdAndUpdate(req.query.id, { $set: objForUpdate });
            res.status(200).json({ success: true, message: "The work has been updated." });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: err });
    }
}