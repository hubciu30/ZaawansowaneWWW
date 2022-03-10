const express = require('express');
const http = require('http');
const app = express()

const httpServer = http.createServer(app);
const {port} = require('./app/config');

// aplication/json
app.use(express.json());

// API import
require('./app/api/v1/login.js')(app);
require('./app/api/v1/signup.js')(app);
require('./app/api/v1/home.js')(app);


app.get('/', (req, res) => {
  res.redirect('/home');
})

httpServer.listen(port, () => {
  console.log(`Start serwera na porcie: ${port}`)
})
