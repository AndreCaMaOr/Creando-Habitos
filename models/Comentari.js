const mongoose = require("mongoose")

const ComentarioSchema = new mongoose.Schema({
    Coment: {
        type: String,
        require: true
    },
    habit:{
        type: mongoose.Types.ObjectId, 
        ref: "Habits"
    }
}, {
    timestamps: true

})


module.exports= mongoose.model("Comentari",ComentarioSchema)