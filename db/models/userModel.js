import { Schema, model, models } from "mongoose"


const follow = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    username: {
        type: String,
    }
})



const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [ true, "Email is required" ],
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address" ]
    },
    username: {
        type: String,
        required: [ true, "Full name is required" ],
        minLength: [ 4, "Full name should be atleast 4 characters long" ],
        maxLength: [ 30, "Full name should be less than 30 characters" ]
    },
    password: {
        type: String,
        required: [ true, "Password is required" ],
        select: false
    },
    image: {
        type: String,
        default: "https://api.dicebear.com/5.x/thumbs/svg?radius=50"
    },
    follower: { type: [ follow ], default: [] },
    following: { type: [ follow ], default: [] },
    posts: {
        type: [ Schema.Types.ObjectId ],
        default: [],
        ref: "postdbs"
    }
})

const UserDB = models.UserDB || model("UserDB", userSchema)

export default UserDB