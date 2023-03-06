const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors= require('cors');

const app = express()

app.use(cors({
  // origin: process.env.ORIGIN
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());