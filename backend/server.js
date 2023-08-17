const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv= require("dotenv").config();

const app= express();
const port = process.env.PORT || 5000;

connectDb()
app.use(express.json()) // to parse request body
app.use(errorHandler)

app.use("/api/contacts", require("./routes/contactRoutes"))

app.use("/api/users", require("./routes/userRoutes"))



app.listen(port,()=>{
    console.log(`server is up at ${port}`)
})