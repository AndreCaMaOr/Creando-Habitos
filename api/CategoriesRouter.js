const express=require("express")
const Categories=require("../models/Categories")
const CategoriesRouter=express.Router();
const authAdmin=require ("../middleware/authAdmin");
const req = require("express/lib/request");

CategoriesRouter.get("/categories", async (req, res)=>{
    let categ= await Categories.find ({})
    return res.status(200).send({
        success: true,
        categ
    })
})

//nueva cate
CategoriesRouter.post("/new", async(req, res)=>{
    const {name, description}= req.body
    let categ= new Categories({
        name,
        description
        
    })

    if(!name || !description ){
        return res.status(400).send({
            success:false,
            message:"no has completado todos los campos"
        })
    }

    await categ.save()
    return res.status(200).send({
        success:true,
        categ
    })
})

CategoriesRouter.get("/findC/:id", async (req, res)=>{
    const{id}= req.params
    try {
        let categ= await Categories.findById(id)
        res.status(200).send({
            success: true,
            message: "Categoria Encontrada",
            categ
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message: error.message
        }) 
    }
})

//update cat
CategoriesRouter.put ("/update/:id", authAdmin, async (req,res)=>{
    const {id}=req.params
    const {categ}= req.params
    try {await Categories.findByIdAndUpdate(id, {categ})
    return res.status(200).send({
        success: true,
        message: "Categoria actualizada",
        categ
    })
    } catch (error) {
        res.status(400).send({
            success:false,
            message: error.message 
        }) 
    }
})


//delete 
CategoriesRouter.delete("/deleteCat/:id", authAdmin, async (req, res) => {
    const {id } = req.params
    try {
        await Categories.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "Categoria Borrada",   
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

module.exports= CategoriesRouter