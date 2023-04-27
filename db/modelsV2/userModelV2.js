import { Schema, model, models } from "mongoose";

const userSchemaV2 = new Schema(
  {
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    username: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [4, "Full name should be atleast 4 characters long"],
      maxLength: [30, "Full name should be less than 30 characters"],
    },
    password: {
      type: String,
      // required: [ true, "Password is required" ],
      select: false,
    },
    image: {
      type: String,
      default: "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
    },
    coverImage: {
      type: String,
      default: "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
    },
    bio: {
      type: String,
      default: "This is my bio",
      maxLength: [200, "Bio should be less than 200 characters"],
    },

    dateOfBirth: {
      type: Date,
    },
    follower: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserDBV2",
        unique: true,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserDBV2",
        unique: true,
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "TweetDBV2",
      },
    ],
    likedPost: [
      {
        type: Schema.Types.ObjectId,
        ref: "TweetDBV2",
      },
    ],
    likedPostHashMap: {
      type: Map,
      of: Boolean,
    },
    commentedPost: [
      {
        type: Schema.Types.ObjectId,
        ref: "TweetDBV2",
      },
    ],
    token: {
      type: String,
    },
    notifications: [
      {
        chatID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2",
        },
        messageID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2.messages",
        },
        sender: {
          type: Schema.Types.ObjectId,
          ref: "UserDBV2",
          required: true,
        },
        cus_id: {
          type: String,
        },
        senderUsername: {
          type: String,
        },
        senderEmail: {
          type: String,
        },
        senderImage: {
          type: String,
        },
        body: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        seen: {
          type: Boolean,
          default: false,
        },
        seenAt: {
          type: Date,
        },
      },
    ],
    
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "UserDBV2",
          required: true,
          unique: true,
        },
        chatID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2",
        },
        messageID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2.messages",
        },
        cus_id: {
          type: String,
        },
        username: {
          type: String,
        },
        email: {
          type: String,
        },
        image: {
          type: String,
        },
        body: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserDBV2 = models.UserDBV2 || model("UserDBV2", userSchemaV2);

export default UserDBV2;
