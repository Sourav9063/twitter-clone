import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import { parseForm } from "@/helper/backend/parseForm";
import { hashPassword } from "@/helper/encrypt/hashPassword";
import makeId from "@/helper/helperFunc/makeId";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method == "POST") {
    // const { username, email, password, image } = req.body;
    try {
      const client = await connectMongo();
      const { fields, files } = await parseForm(req, "profiles");

      const image = files.image
        ? "/images/profiles/" + files.image?.newFilename
        : null;

      const { username, email, password } = fields;
      if (
        !email ||
        !email.includes("@") ||
        !password ||
        password.trim().length < 6
      ) {
        res
          .status(422)
          .json({ msg: "Email is not valid or Password is too short" });
        return;
      }

      // const hashPass = await hashPassword(password);
      // const existingUser = await UserDB.findOne({ email: email });

      const [hashPass, existingUser] = await Promise.all([
        hashPassword(password),
        UserDBV2.findOne({ email: email }),
      ]);

      if (!existingUser.isEmailVerified) {
        res.status(422).json({ msg: "Please verify your email." });

        return;
      }
      const data = {
        username,
        email,
        password: hashPass,
      };

      if (image) {
        data.image = image;
      }
      existingUser.password = hashPass;
      if (image) {
        existingUser.image = image;
      }
      await existingUser.save();

      return res.status(201).json({ msg: "Sign Up Successful", existingUser });
    } catch (e) {
      res.status(500).json({ msg: "Server Error", e });
    }
  }
}
