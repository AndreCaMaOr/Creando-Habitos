const express=require("express")
const Habits=require("../models/Habits")
const HabitsRouter=express.Router();
const authAdmin= require("../middleware/authAdmin")
const auth= require ("../middleware/auth")

HabitsRouter.get("/habit", auth, async (req,res)=>{
    let habit= await Habits.find({})
    return res.status(200).send({
        success:true,
        habit
    })  
})

HabitsRouter.post("/newHabit", authAdmin, async(req, res)=>{
    const {name, description, image}= req.body
    let habit= new Habits({
        name,
        description, 
        image
    })
    if(name.length<3){
        return res.status(400).send({
            success:false,
            message:"nombre muy corto"
        })
    }

    if(!name || !description){
        return res.status(400).send({
            success:false,
            message:"no has completado todos los campos"
        })
    }

    await habit.save()
    return res.status(200).send({
        success:true,
        habit
    })
})

//post habitclient, 
HabitsRouter.post("/habitClient", auth, async(req, res)=>{
    const {name, description}= req.body
    let habit= new Habits({
        name,
        description, 
        
    })
    if(name.length<3){
        return res.status(400).send({
            success:false,
            message:"nombre muy corto"
        })
    }

    if(!name || !description){
        return res.status(400).send({
            success:false,
            message:"no has completado todos los campos"
        })
    }

    await habit.save()
    return res.status(200).send({
        success:true,
        habit
    })
})

HabitsRouter.get("/findH/:id", authAdmin, async (req, res)=>{
    const{id}= req.params
    try {
        let habit= await Habits.findById(id)
        res.status(200).send({
            success: true,
            message: "Habito Encontrado",
            habit
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message: error.message
        }) 
    }
})

//update
HabitsRouter.put ("/updateH/:id", authAdmin, async (req,res)=>{
    const {id}=req.params
    const {habit}= req.params
    try {await Habits.findByIdAndUpdate(id, {habit})
    return res.status(200).send({
        success: true,
        message: "Habito actualizada",
        habit
    })
    } catch (error) {
        res.status(400).send({
            success:false,
            message: error.message 
        }) 
    }
})


//delete 
HabitsRouter.delete("/deleteH/:id", auth, authAdmin, async (req, res) => {
    const {id } = req.params
    try {
        await Habits.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "habito Borrado",   
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


module.exports= HabitsRouter