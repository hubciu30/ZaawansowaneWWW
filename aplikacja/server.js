const express = require('express');
const http = require('http');
const app = express()

const httpServer = http.createServer(app);
const {port} = require('./app/config');

// aplication/json
app.use(express.json());
// aplication/urlencoded
app.use(express.urlencoded({ extended: true }));
// share public file
app.use(express.static(__dirname+"/app/public"))

// API import
require('./app/api/v1/login')(app);
require('./app/api/v1/signup')(app);
require('./app/api/v1/logout')(app);
require('./app/api/v1/home')(app);
require('./app/api/v1/users')(app);
require('./app/api/v1/categories')(app);
require('./app/api/v1/topics')(app);
require('./app/api/v1/posts')(app);


app.get('/', (req, res) => {
  res.redirect('/home');
})

httpServer.listen(port, () => {
  console.log(`Start serwera na porcie: ${port}`)
})
