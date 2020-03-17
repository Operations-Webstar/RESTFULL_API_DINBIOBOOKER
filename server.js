//henter pakker
const http = require('http');
const app = require('./app');

//sætter hvilken port, som vi vil gå igennem
const port = process.env.PORT || 3000;

//Laver en server
const server = http.createServer(app);

server.listen(port);