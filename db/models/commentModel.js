import { Schema, SchemaType, model, models } from 'mongoose';

export const commentSchema = new Schema({
    head: {
        type: Schema.Types.ObjectId,
        // required: [ true, "Comment of post id needed." ],
        ref: "PostDB",
        // unique: true,
    },
    body: {
        type: String,
        // required: [ true, "Comment cannot be empty." ],
    },
    nodes: [
        {
            type: Schema.Types.ObjectId,
            ref: "CommentDB"
        }

    ],
    owner: {
        type: Schema.Types.ObjectId,
        // required: [ true, "Commenter ids needed." ],
        ref: "UserDB"
    },

    ownerusername: {
        type: String,
        // required: [ true, "Commenter username needed." ]

    },
    ownerimage: {
        type: String,
        // required: [ true, "Commenter image needed." ]

    },
    createdDate: {
        type: Date,
        immutable: true,
        default: Date.now(),
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserDB"
        }
    ]

})


const CommentDB = models.CommentDB || model("CommentDB", commentSchema)

export default CommentDB;