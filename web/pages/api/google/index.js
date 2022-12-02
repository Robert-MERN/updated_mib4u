import connect from "../../../utils/connectMongo";
import passport from "../../../lib/passport";

export default async function (req, res, next) {
    await connect();
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })(req, res, next);
}