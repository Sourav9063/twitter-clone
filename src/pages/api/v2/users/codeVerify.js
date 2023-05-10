import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";

export default async function handler(req, res) {
  console.log("hit codeVerity");
  if (req.method === "POST") {
    const { email, verifyString } = req.body;
    if (!email || !verifyString) {
      return res.status(400).json({ msg: "BAD REQUEST" });
    }
    try {
      await connectMongo();
      const [existingUser] = await Promise.all([
        UserDBV2.findOne({ email: email }),
      ]);
      if (existingUser && existingUser.isEmailVerified) {
        res.status(422).json({ msg: "User already exist. Please log in." });

        return;
      }
      if (existingUser && existingUser.verifyString == verifyString) {
        existingUser.isEmailVerified = true;
        await existingUser.save();
        return res.status(200).json({ msg: "MATCHED" });
      } else {
        return res.status(200).json({ msg: "NOT MATCHED" });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
