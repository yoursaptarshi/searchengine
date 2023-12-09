const express = require('express');
const user = require("./routes/user");
const crawled = require("./routes/crawled");
const cookieParser = require("cookie-parser");
//const cors = require("cors");
const app = express();
require("dotenv").config({path:"../backend/config/config.env"})


//using middlewares
//app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//using routes
app.use("/api/v1",user);
app.use("/api/v1",crawled)

module.exports=app;