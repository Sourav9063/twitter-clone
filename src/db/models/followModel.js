import { Schema, model, models } from "mongoose";

export const followSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "UserDB",
    unique: true,
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserDB",
      default: [],
    },
  ],
  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserDB",
      default: [],
    },
  ],
});

const FollowDB = models.FollowDB || model("FollowDB", followSchema);
export default FollowDB;
