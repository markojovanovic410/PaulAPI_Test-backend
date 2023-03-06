"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require("axios");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors()) // Use this after the variable declaration

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

// router.post("/solc-compile", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   const result = solcCompile(req.body);
//   res.json(result);
// });

router.post("/login", async (req, res) => {
  try {
      let loginData = {
          username: req.body.email,
          password: req.body.password,
      }
      res.json("test login");
      // let response = await axios.post("https://paul.blueboxonline.com/api/v1/users/login",loginData)
      // // res.header("Access-Control-Allow-Origin", "*");
      // // res.header(
      // //   "Access-Control-Allow-Headers",
      // //   "Origin, X-Requested-With, Content-Type, Accept"
      // // );
      // res.json({success:true, message: response.headers['set-cookie']});
  } catch(e)  {
      // console.log(e);
      res.json({success: false, message: 'fail'});
  }    
});

router.post("/session", async(req, res) => {
  try {
      const cookie = req.body.cookie
      let response = await axios.get("https://paul.blueboxonline.com/api/v1/users/session",{
          headers: {
            'Cookie': cookie
          }
      })
      // res.header("Access-Control-Allow-Origin", "*");
      // res.header(
      //   "Access-Control-Allow-Headers",
      //   "Origin, X-Requested-With, Content-Type, Accept"
      // );
      res.json({success: true, message: response.data})
  } catch(e){
      res.json({success: false, message: ''})
  }
})

router.post("/table", async(req, res) => {
  try {
      const cookie = req.body.cookie
      let response = await axios.get("https://paul.blueboxonline.com/api/v1/app/tabledata",{
          headers: {
            'Cookie': cookie
          }
      })
      // res.header("Access-Control-Allow-Origin", "*");
      // res.header(
      //   "Access-Control-Allow-Headers",
      //   "Origin, X-Requested-With, Content-Type, Accept"
      // );
      res.json({success: true, message: response.data})
  } catch(e){
      console.log(e);
      res.json({success: false, message: ''})
  }
})

router.post("/logout", async(req, res) => {
  try {
      const cookie = req.body.cookie
      let response = await axios.get("https://paul.blueboxonline.com/api/v1/users/logout",{
          headers: {
            'Cookie': cookie
          }
      })
      // res.header("Access-Control-Allow-Origin", "*");
      // res.header(
      //   "Access-Control-Allow-Headers",
      //   "Origin, X-Requested-With, Content-Type, Accept"
      // );       
      res.json({success: true, message: response.data})
      } catch(e){
          console.log(e);
          res.json({success: false, message: ''})
      }
})

router.post("/report", async(req, res) => {
  try {
      const cookie = req.body.cookie;
      let reportData = req.body.reportData;
      let response = await axios.post("https://paul.blueboxonline.com/api/v1/app/report", reportData, {
          headers: {
            'Cookie': cookie
          }
      })
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
       res.json({success: true, message: response.data})
      } catch(e){
          console.log(e);
          res.json({success: false, message: ''})
      }
})


app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);