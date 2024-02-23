import jwt from "jsonwebtoken"

export const verifyJWT = async(req,res,next)=>{
    try {
        let token = req.headers["authorization"]
        if(!token){
             return res.status(403).send("Access Denied")
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token,process.env.SECREAT_KEY);
        req.user = verified;
        next()
    } catch (error) {
        res.status(500).json({msg:`${error.message} error from verigyJWT`})
    }
}