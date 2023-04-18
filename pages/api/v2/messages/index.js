import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import MessageDBV2 from "@/db/modelsV2/messageModelV2";
import service from "./service.json";
import * as admin from "firebase-admin";

//Get Messages
const getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    // Find messages that match the sender ID and receiver ID
    const messages = await MessageDBV2.find({
      "sender._id": senderId,
      "receiver._id": receiverId,
    });
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
    console.log(receiver.token);
    console.log(receiver);
    let existingMessage = await MessageDBV2.findOne({
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

      // res.status(200).json(existingMessage);
    } else {
      existingMessage = await MessageDBV2.create({
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
    }
    if (receiver.token) {
      if (admin.apps.length == 0) {
        admin.initializeApp({
          credential: admin.credential.cert(service),
        });
      }
      const messaging = admin.messaging();
      const msg = await messaging.send({
        token: receiver.token,
        data: {
          key: "value",
          name: "sourav",
          message: body,
        },
        webpush: {
          headers: {
            Urgency: "high",
          },
        },
      });
      console.log(msg);
    }
    res.status(201).json(existingMessage);
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
