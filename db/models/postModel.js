import { Schema, SchemaType, model, models } from 'mongoose';
import commentDB, { commentSchema } from './commentModel';

// const commentSchema = new Schema({
//     comment: {
//         type: String,
//         required: [ true, "Comment cannot be empty." ],
//     },
//     commenter: {
//         // type: Schema.Types.ObjectId,
//         type: String,
//         required: [ true, "Commenter Id needed." ]

//     },
//     commenterUsername: {
//         type: String,
//         required: [ true, "Commenter username needed." ]

//     },
//     createdDate: {
//         type: Date,
//         immutable: true,
//         default: Date.now(),
//     },
//     commentOf: {
//         type: String,
//         default: "the_post"
//     }
// })

const postSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "UserDB",
        required: [ true, "Post owner required" ]
    },
    postImage: {
        type: String,
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: Date.now(),
    },
    postText: {
        type: String,
        required: [ true, "Post required" ]

    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CommentDB',
        },

    ]

});

const PostDB = models.PostDB || model('PostDB', postSchema);

export default PostDB;



// {
//     commentBy: {
//         type: String,
//         required: [ true, "Commenter's ID needed" ]
//     },
//     commentByUserName: {
//         type: String,

//     },
//     comment: {
//         type: String,
//         required: [ true, "Empty comment." ]
//     },
//     likes: {
//         type: Number,
//         default: 0,

//     }
// } 