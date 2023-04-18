import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import MessageDBV2 from "@/db/modelsV2/messageModelV2";

//Get Messages
const getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    console.log(senderId, receiverId);
    // Find messages that match the sender ID and receiver ID
    const messages = await MessageDBV2.find({
      sender: senderId,
      receiver: receiverId,
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//post Message
const postMessages = async (req, res) => {
  try {
    const { senderEmail, receiverEmail, body } = req.body;
    const sender = await UserDBV2.findOne({ email: senderEmail });
    console.log(sender.username);
    const receiver = await UserDBV2.findOne({ email: receiverEmail });
    console.log(receiver.username);

    const existingMessage = await MessageDBV2.findOne({
      sender: sender._id,
      receiver: receiver._id,
    });

    if (existingMessage) {
      existingMessage.messages.push({
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
      });
      await existingMessage.save();
      res.status(200).json(existingMessage);
    } else {
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

      res.status(201).json(newMessage);
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Delete Message
const deleteMessages = async (req, res) => {
  try {
    const { messageId } = req.query;
    const { senderId, receiverId } = req.body;

    const message = await MessageDBV2.findOne({
      "messages._id": messageId,
      sender: senderId,
      receiver: receiverId,
    });
    console.log(message.sender, message.receiver);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    //console.log(message);
    message.messages = message.messages.filter(
      (msg) => msg._id.toString() !== messageId
    );

    await message.save();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
