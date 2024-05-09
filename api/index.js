import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const PORT=3000;
app.listen(PORT,()=>
{
console.log(`Server is listening on PORT: ${PORT}`)
});
app.get("/",(req,res)=>
    {

        res.json({message:"API is working!"})
    });
mongoose.connect(process.env.MONGO_URL).
then(()=>

    {console.log("Connected to MONGODB")}

).catch((error)=>
{
    console.log(error)
})
