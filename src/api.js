const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Add CORS headers to all responses
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Define a route that proxies requests to the target API server
app.use('/api', createProxyMiddleware({
  target: 'https://paul.blueboxonline.com/api/v1',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}))

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`)
})
