import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";

const handler = async (req, res) => {
    try {
        const { search } = req.query;
        const users = await UserDBV2.find({
          username: { $regex: search, $options: "i" },
        }).select({ username: 1, image: 1, email: 1 });
    
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

export default handler;