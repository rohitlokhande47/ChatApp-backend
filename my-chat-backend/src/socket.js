const ChatMessage = require('./models/Message.models.js');

exports.setupSocket = (server) => {
    const io = require('socket.io')(server);

    function sendUserList() {
        const users = Array.from(io.sockets.sockets.keys());
        io.emit("user_list", users);
    }

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        sendUserList();

        socket.on('chat message', (msg) => {
            console.log('Message received:', msg);
            // Save to MongoDB
            new ChatMessage({ sender: socket.id, content: msg }).save()
            .then(() => console.log('Message saved'))
            .catch(err => console.error('Error saving message:', err));

            io.emit('chat message', msg);
        });

        socket.on('private message', ({ target, message }) => {
            console.log(`Private message from ${socket.id} to ${target}: ${message}`);
            socket.to(target).emit('private message', { from: socket.id, message });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            sendUserList();
        });
    });
};