import { Schema, SchemaType, model, models } from 'mongoose';

export const commentSchema = new Schema({
    comment: {
        type: String,
        required: [ true, "Comment cannot be empty." ],
    },
    commenter: {
        // type: Schema.Types.ObjectId,
        type: String,
        required: [ true, "Commenter Id needed." ]

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
    commentOf: {
        type: String,
        default: "the_post"
    }
})


const commentDB = models.commentDB || model("commentDB", commentSchema)

export default commentDB;