const jwt= require ("jsonwebtoken")


const auth =(req, res, next)=>{
    try {
        const token= req.header ("Authorization")
if (!token) {
    return res.status(400).send({
        success:false,
        message: "Autentificación Invalida"
    })   
}

jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if(err) return res.status(400).send({
        success:false,
        message: "Invalid authentification"
})
    })
    req.user= user
        (next)// si todo esta correcto sigue 
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: error.message
        })
    }
}

module.exports= auth