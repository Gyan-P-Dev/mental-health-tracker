const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const http = require('http');
const logRoutes = require('./routes/logs');
const { setupSocket, getSocketInstance } = require('./utils/socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/', logRoutes);

setupSocket(io);

app.use(function (req, res, next) {
    req.io = io;
    next();
  });
module.exports.io = io;
  

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
