import { setCookie } from "cookies-next";
import connect from "../../../utils/connectMongo";
import passport from "../../../lib/passport";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function (req, res, next) {
  await connect();
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.redirect("https://mib4u.com/?a=auth_fail");
    }

    // set cookie and send redirect
    setCookie("token", info.token, {
      req,
      res,
    });
    res.redirect("https://mib4u.com/");
  })(req, res, next);
}