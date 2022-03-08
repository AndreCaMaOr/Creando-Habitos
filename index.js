require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const CategoriesRouter = require("./api/CategoriesRouter");
const ComentRouter = require("./api/ComentRouter");
const HabitsRouter = require("./api/HabitsRouter");
const UserRouter= require("./api/UserRouter")


const app = express()
app.use(express.json({extended: true}))
app.use(express.urlencoded())

//Routers
app.use("/api", UserRouter)
app.use("/api", CategoriesRouter)
app.use("/api", HabitsRouter)
app.use("/api", ComentRouter)

//Connect to MongoDB:
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
}).then(()=> {
        console.log("BD IS CONNECTED");
    })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})