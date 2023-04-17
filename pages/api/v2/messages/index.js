import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import MessageDBV2 from "@/db/modelsV2/messageModelV2";

//Get Messages
const getAllMessages = async (req, res) => {};

//post Message
const postMessages = async (req, res) => {
  try {
    const { senderEmail, receiverEmail, body } = req.body;
    const sender = await UserDBV2.findOne({ email: senderEmail });
    console.log(sender.username);
    const receiver = await UserDBV2.findOne({ email: receiverEmail });
    console.log(receiver.username);

    const newMessage = await MessageDBV2.create({
      sender: sender._id,
      receiver: receiver._id,
      messages: [
        {
          sender: sender._id,
          receiver: receiver._id,
          senderUsername: sender.username,
          senderEmail,
          senderImage: sender.image,
          receiverUsername: receiver.username,
          receiverEmail,
          receiverImage: receiver.image,
          body: body,
          //image,
        },
      ],
    });

    // Save the message to the database
    const savedMessage = await newMessage
      .save()
      .then(() => console.log("message created"));

    res.status(201).json({ status: true, data: savedMessage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Delete Message
const deleteMessages = async (req, res) => {};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method == "GET") {
    await getAllMessages(req, res);
  } else if (req.method == "POST") {
    await postMessages(req, res);
  } else if (req.method == "DELETE") {
    await deleteMessages(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
