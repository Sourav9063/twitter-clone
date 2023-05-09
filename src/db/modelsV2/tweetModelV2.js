import { Schema, SchemaType, model, models } from "mongoose";

const tweetSchemaV2 = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "UserDBV2",
      required: [true, "tweet owner required"],
    },
    tweetImage: {
      type: String,
    },
    tweetImages: [{ type: String }],
    tweetText: {
      type: String,
      required: [true, "tweet required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserDBV2",
      },
    ],
    likedByHashMap: {
      type: Map,
      of: Boolean,
      default: {},
    },
    retweets: {
      type: Number,
      default: 0,
    },
    retweetedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserDBV2",
      },
    ],
    retweetedByHashMap: {
      type: Map,
      of: Boolean,
      default: {},
    },
    comments: {
      type: Number,
      default: 0,
    },
    commentsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "TweetDBV2",
      },
    ],
    commentByHashMap: {
      type: Map,
      of: Boolean,

      default: {},
    },

    //linked
    type: {
      type: String,
      enum: ["tweet", "comment", "reply", "retweet"],
      default: "tweet",
    },
    mainParent: {
      type: Schema.Types.ObjectId,
      ref: "TweetDBV2",
    },
    head: {
      type: Schema.Types.ObjectId,
      ref: "TweetDBV2",
    },
    nodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "TweetDBV2",
      },
    ],
  },
  { timestamps: true }
);

const TweetDBV2 = models.TweetDBV2 || model("TweetDBV2", tweetSchemaV2);

export default TweetDBV2;
