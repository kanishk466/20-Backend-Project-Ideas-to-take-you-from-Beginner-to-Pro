import mongoose  from "mongoose";


const ConnectDb  = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('database Connected Successfully');
        
    } catch (error) {
        console.log( error.message );
        process.exit(1);

        
    }
}

export default ConnectDb ;