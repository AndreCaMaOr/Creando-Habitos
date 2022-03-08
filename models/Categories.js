const mongoose = require("mongoose")

const CategoriesSchema = new mongoose.Schema({
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
}, {
    timestamps: true

})

module.exports= mongoose.model("Categories",CategoriesSchema )