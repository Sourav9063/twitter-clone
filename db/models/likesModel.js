const { Schema } = require("mongoose");

const likesSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "UserDB"
    },
    likedPost: [
        {
            type: Schema.Types.ObjectId,
            ref: "postDB"
        }
    ]
})

const LikedDB = models.LikedDB || model('LikedDB', likesSchema);

export default LikedDB;