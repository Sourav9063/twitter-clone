import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  emailVerified: {
    type: Schema.Types.Boolean,
    default: false,
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
    default: "Say something about you.",
    maxLength: [200, "Bio should be less than 100 characters"],
  },

  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserDB",
      unique: true,
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserDB",
      unique: true,
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "PostDB",
    },
  ],
});

const UserDB = models.UserDB || model("UserDB", userSchema);

export default UserDB;
