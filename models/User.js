
const mongoose = require("mongoose")
const {
    Stream
} = require("stream")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    },
    habit:{
        type: mongoose.Types.ObjectId, 
        ref: "Habits"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)