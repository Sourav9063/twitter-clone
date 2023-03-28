import { Schema, SchemaType, model, models } from 'mongoose';

export const commentSchema = new Schema({
    comment: {
        type: String,
        required: [ true, "Comment cannot be empty." ],
    },
    commenterId: {
        type: Schema.Types.ObjectId,
        required: [ true, "Commenter ids needed." ],
        ref: "UserDB"
    },

    commenterUsername: {
        type: String,
        required: [ true, "Commenter username needed." ]

    },
    createdDate: {
        type: Date,
        immutable: true,
        default: Date.now(),
    },
    commentOfPostId: {
        type: Schema.Types.ObjectId,
        required: [ true, "Comment of post id needed." ],
        ref: "postDB"

    },
    likes: {
        type: Number,
        default: 0,
    },
    replyIds: [
        {
            type: Schema.Types.ObjectId,
            ref: "commentDB"
        }

    ]

})


const CommentDB = models.CommentDB || model("CommentDB", commentSchema)

export default CommentDB;