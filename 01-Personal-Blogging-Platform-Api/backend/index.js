import express from "express"
import dotenv from "dotenv"
import ConnectDb from "./src/config/db.js";

import userRoute from "./src/routes/auth.route.js"

import articleRoutes from "./src/routes/articleRoutes.js"


const app = express();
dotenv.config();

app.use(express.json()) ;


ConnectDb();

app.use('/api/auth' , userRoute)
app.use('/api/articles', articleRoutes);

app.listen(process.env.PORT , 
    () => console.log(`Server is running on port ${process.env.PORT}`)
    
)

export default app ;