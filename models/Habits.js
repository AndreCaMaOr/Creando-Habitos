const mongoose = require("mongoose")

const HabitsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: {
        type: Object,
        
    },
    comentari:{
        type: mongoose.Types.ObjectId, 
        ref: "Comentari"
    }, 
    categoria: {
        type: mongoose.Types.ObjectId,
        ref: "Categories"
    }
}, {
    timestamps: true

})

module.exports= mongoose.model("Habits",HabitsSchema )