import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import * as admin from "firebase-admin";
import { NOTIFICATION_TYPE_SEEN } from "@/helper/constStrings";
import get_cus_id from "@/helper/helperFunc/get_cus_id";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id, type, sender } = req.query;

    await connectMongo();
    try {
      const user = await UserDBV2.findById(id)
        .select({
          notifications: 1,
        })
        .sort({ "notifications.createdAt": -1 });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (type == "unseen") {
        const cus_id = id >= sender ? id + sender : sender + id;
        const notifications = user.notifications.filter(
          (notification) => notification.cus_id == cus_id
        );
        return res
          .status(200)
          .json({ msg: "Success", notifications: notifications });
      }
      return res
        .status(200)
        .json({ msg: "Success", notifications: user.notifications });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
  if (req.method == "DELETE") {
    const { id, sender } = req.query;
    let deleted_msg = null;

    try {
      if (!id) {
        return res.status(404).json({ msg: "User not found" });
      }

      // const user = await UserDBV2.findById(id);
      const [session, user, senderDB] = await Promise.all([
        getServerSession(req, res, authOptions(req)),
        UserDBV2.findById(id).select({ notifications: 1, username: 1 }),
        UserDBV2.findById(sender).select({ token: 1, username: 1 }),
      ]);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // if (session?.user?.id != id) {
      //   return res.status(401).json({ msg: "Not authorized" });
      // }

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const willSendNotification = user.notifications.some(
        (notification) => notification.cus_id == get_cus_id(id, sender)
      );
      if (!sender) {
        user.notifications = [];
        const newUser = await user.save();
      } else {
        deleted_msg = user.notifications.pull({ sender: sender });
        const newUser = await user.save();

        const sendNotification = async () => {
          if (senderDB.token) {
            if (admin.apps.length == 0) {
              admin.initializeApp({
                credential: admin.credential.cert(
                  JSON.parse(process.env.FIREBASE_ADMIN_CONFIG)
                ),
              });
            }
            const messaging = admin.messaging();
            const msg = await messaging.send({
              token: senderDB.token,
              notification: {
                title: `${user.username} has seen your message`,
                body: `Seen`,
              },
              data: {
                key: "value",
                name: "sourav",
                message: JSON.stringify({
                  mainData: {
                    receiver: id,
                    sender: sender,
                    cus_id: id >= sender ? id + sender : sender + id,
                  },
                  notificationType: NOTIFICATION_TYPE_SEEN,
                }),
              },
              webpush: {
                headers: {
                  Urgency: "high",
                },
                fcm_options: {
                  link:
                    process.env.NODE_ENV == "development"
                      ? `http://localhost:3000`
                      : `https://twitterbysourav.vercel.app` +
                        `http://localhost:3000/message?senderId=${id}&receiverId=${sender}`,
                },
              },
            });
          }
        };
        if (willSendNotification) {
          await sendNotification();
        }
      }

      return res.status(200).json({
        msg: "Notifications deleted successfully",
        // notifications: newUser.notifications,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
