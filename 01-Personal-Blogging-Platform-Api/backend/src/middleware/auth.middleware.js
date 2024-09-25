import jwt from "jsonwebtoken"

 export const authMiddleware = (req,res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).send('Access Denied');
    }
    try {
        
        const verified = jwt.verify(token  , process.env.SECRET_KEY);
        req.user = verified ;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}



export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send('Access Denied');
        }
        next();
    }
}