const express = require('express');
const http = require('http');
require('./db/db.js');  // Establish MongoDB connection
const { setupSocket } = require('./socket');

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.get('/', (req, res) => {
    res.send('Chat backend is running with MongoDB');
});

const PORT = 3000;
server.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});