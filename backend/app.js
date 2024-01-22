const express = require('express');
const user = require("./routes/user");
const crawled = require("./routes/crawled");
const memberships = require("./routes/memberships")
const cookieParser = require("cookie-parser");
const cors = require("cors")
const app = express();

const path = require("path");
app.use(cors());



//using middlewares

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});
app.use(express.bodyParser());

//using routes
app.use("/api/v1",user);
app.use("/api/v1",crawled)
app.use("/api/v1",memberships)


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


module.exports=app;
