const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hi Backend is running");
});

app.listen(PORT,()=>{
    console.log(`server is listning on port ${PORT}`);
})