// import connectMongo from "@/db/dbConnect";
// import UserDB from "@/db/models/userModel";

// export default async function handler(req, res) {

//     if (req.methode === "GET") {
//         const { id = '', email = '' } = req.body;
//
//         try {
//             await connectMongo();
//             const user = await UserDB.findOne({
//                 $or: [
//                     { id: id },
//                     { email: email }
//                 ]
//             })

//             if (!user) {
//                 return res.status(400).json({ msg: "User not found" })
//             }

//             return res.status(200).json({ user })

//         }
//         catch (e) {
//             return res.status(500).json({ msg: "Server Error" })
//         }
//     }

// }
