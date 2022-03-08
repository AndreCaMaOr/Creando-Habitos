const express = require("express")
const Comentari = require("../models/Comentari")
const ComentRouter = express.Router();
const authAdmin= require("../middleware/authAdmin")
const auth= require ("../middleware/auth")

//Get:
ComentRouter.get("/user/:coment", authAdmin, auth, async (req, res) => {
    const {
        coment
    } = req.params
    try {
        let coment = await Comentari.findById(id)
        res.status(200).send({
            success: true,
            message: "comentario creado exitosamente",
            coment
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
})

//post:
ComentRouter.post("/newcoment", auth, async (req, res) => {
    const {
        coment
    } = req.body
    try {
        if (!coment) {
            return res.status(400).send({
                success: false,
                message: "Escribe como te fue"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Cometario creado exitosamente",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


module.exports = ComentRouter