"use strict";
const express = require("express");
const serverless = require("serverless-http");
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require("axios");
const { createProxyMiddleware } = require('http-proxy-middleware')

const cors= require('cors');

const app = express()

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);