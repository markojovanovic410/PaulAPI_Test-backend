const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cookie = require("cookie");
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
axios.defaults.withCredentials = true;
const CircularJSON = require('circular-json');
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://paul.blueboxonline.com';



app.post("/login", async (req, res) => {
    try {
        let loginData = {
            username: req.body.email,
            password: req.body.password,
        }
        console.log(loginData)
        let response = await axios.post("https://paul.blueboxonline.com/api/v1/users/login",loginData)
        res.json({success:true, message: response.headers['set-cookie']});
    } catch(e)  {
        // console.log(e);
        res.json({success: false, message: 'fail'});
    }    
});

app.post("/session", async(req, res) => {
    try {
        const cookie = req.body.cookie
        let response = await axios.get("https://paul.blueboxonline.com/api/v1/users/session",{
            headers: {
              'Cookie': cookie
            }
        })
        console.log(response)
         res.json({success: true, message: response.data})
    } catch(e){
        console.log(e);
        res.json({success: false, message: ''})
    }
})

app.post("/table", async(req, res) => {
    try {
        const cookie = req.body.cookie
        let response = await axios.get("https://paul.blueboxonline.com/api/v1/app/tabledata",{
            headers: {
              'Cookie': cookie
            }
        })
        console.log(response)
         res.json({success: true, message: response.data})
    } catch(e){
        console.log(e);
        res.json({success: false, message: ''})
    }
})

app.post("/logout", async(req, res) => {
    try {
        const cookie = req.body.cookie
        let response = await axios.get("https://paul.blueboxonline.com/api/v1/users/logout",{
            headers: {
              'Cookie': cookie
            }
        })
        console.log(response)
         res.json({success: true, message: response.data})
        } catch(e){
            console.log(e);
            res.json({success: false, message: ''})
        }
})

app.post("/report", async(req, res) => {
    try {
        const cookie = req.body.cookie;
        let reportData = req.body.reportData;
        console.log(cookie)
        console.log(reportData)
        let response = await axios.post("https://paul.blueboxonline.com/api/v1/app/report", reportData, {
            headers: {
              'Cookie': cookie
            }
        })
         console.log(response)
         res.json({success: true, message: response.data})
        } catch(e){
            console.log(e);
            res.json({success: false, message: ''})
        }
})


app.get("/", async(req, res) => {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
