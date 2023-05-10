import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import { BASE_URL } from "@/helper/constStrings";
import makeId from "@/helper/helperFunc/makeId";
import { transporter } from "@/helper/nodemailer/nodemailer";

export default async function handler(req, res) {
  console.log("hit");
  if (req.method === "POST") {
    const { email, username } = req.body;
    const verifyString = makeId(6);

    await connectMongo();
    const [existingUser] = await Promise.all([
      UserDBV2.findOne({ email: email }),
    ]);

    if (existingUser && existingUser.isEmailVerified) {
      res.status(422).json({ msg: "User already exist. Please log in." });

      return;
    } else {
      if (existingUser) {
        existingUser.verifyString = verifyString;
        await existingUser.save();
      } else {
        await UserDBV2.create({
          email: email,
          username: username,
          verifyString: verifyString,
        });
      }
    }

    try {
      let info = await transporter.sendMail({
        from: '"Twitter Clone" <sourav.shellbeehaken@gmail.com>',
        to: email,
        subject: "Email verification for Twitter Clone.",
        text:
          "Your verification code: " +
          verifyString +
          `.\n Or \n Click this link: ${BASE_URL}/?modal=verify&verifyString=` +
          verifyString,
        html: `<div><h2>Your verification code: </h2>
        <h1>${verifyString}</h1>
        <hr />
        <h2>Or</h2>
        <h2>Click this link:</h2>
        <a href="${BASE_URL}?modal=verify&verifyString=${verifyString}&email=${email}&username=${username}">${BASE_URL}?modal=verify&verifyString=${verifyString}&email=${email}&username=${username}</a>
        <p style="color:red;">If you didn't signup for <a href="${BASE_URL}">Twitter Clone</a> then ignore this email</p>
        </div>`,
      });
      console.log("Message sent: %s", info.messageId);
      return res
        .status(200)
        .json({ msg: "Email sent. Check you email and spam folder" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Error", e });
    }
  }
}
