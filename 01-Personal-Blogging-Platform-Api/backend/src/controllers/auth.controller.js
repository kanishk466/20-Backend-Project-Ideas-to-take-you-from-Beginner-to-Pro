import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//  register                             



export const register =  async (req,res)=>{
 const {username  , email , password , role} = req.body

 try {
    
    let user = await User.findOne({email});

    if(user){
        return res.status(400).json({message : 'user is already registered'});

    }

    user = new User({email , username , password , role});

await user.save();

    res.status(201).json({user})
 } catch (error) {
    res.status(500).json({message : error});
 }


}

///////////////////////////////////////////////////////////


 export const login  = async ( req ,res) =>{
    const {email , password} = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid Email or Password');
     

        const isMatch = await  bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({message : 'credentials wrong'})
        }

       const payload = ({userId : user._id , role : user.role});
        const token = jwt.sign(payload , process.env.SECRET_KEY , {expiresIn:"15min"});

        res.header('Authorization', token).send({ token });


    } catch (error) {
        res.status(500).json({message : error});
    }
 }