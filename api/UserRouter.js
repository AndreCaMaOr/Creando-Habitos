const express = require("express")
const User = require("../models/User")
const UserRouter = express.Router();
const bcrypt= require("bcrypt");
const jwt= require ("jsonwebtoken")
const authAdmin=require ("../middleware/authAdmin")
const auth= require ("../middleware/auth")
// const salt= bcrypt.genSaltSync(10)// si dejamos esto hace el mismo codigo cuando es la misma contraseña

UserRouter.get("/user", authAdmin, async (req, res) => {
    let user = await User.find({})
    return res.status(200).send({
        success: true,
        user
    })
})
 
//buscar usuario por id ruta privada para el usuario 
UserRouter.get("/find/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        let user = await User.findById(id)
        res.status(200).send({
            success: true,
            message: "Usuario Encontrado",
            user
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
})

//registro usuario
UserRouter.post("/register", async (req, res) => {
    const {
        name,
        surname,
        email,
        password,
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(400).send({
                success: false,
                message: "este usuario ya esta registrado"
            })
        }

        if (name.length < 2) {
            return res.status(400).send({
                success: false,
                message: "nombre muy corto"
            })
        }

        if (!name || !surname || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "no has completado todos los campos"
            })
        }
        if (password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "Contraseña muy corta, minimo 6 caracteres"
            })
        }
//aqui va el hash de la contraseña
let passwordHash= bcrypt.hashSync(password, 10) //el 10 es las vueltas del salt

        const newUser = new User({
            name,
            surname,
            email,
            password: passwordHash
        })

        await newUser.save()
        return res.status(200).send({
            success: true,
            message: "usuario creado correctamente",
            newUser
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }

})

//login del usuario es un post para que compruebe las credenciales
UserRouter.post("/login", async(req, res)=>{
  const{email, password}= req.body
   try {
     let user= await User.findOne({email}) 
     if (!user) {
         return res.status(400).send({
             success:false,
             message:"Wrong credentials/e"
         })  
     } 
     if (!password) {
        return res.status(400).send({
            success:false,
            message:"Wrong credentials/p"
        })  
    }
    let passwordOk= await bcrypt.compare(password, user.password) 
    if (!passwordOk){
        return res.status(400).send({
            success:false,
            message:"Wrong credentials/password"
    })
}
const token= accessToken({id:user._id})
     return res.status(200).send({
         success:true,
         message:" Usuario logueado correctamente",
         token
     })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message
        })  
    }
})

const accessToken= (user)=> {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7d"} )
}

//delete user
UserRouter.delete("/delete/:id", async (req, res) => {
    const {id } = req.params
    try {
        await User.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "Usuario Borrado",   
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


module.exports = UserRouter