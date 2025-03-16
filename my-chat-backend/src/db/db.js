const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lokhanderohit2020:ZgCNjJYkl4GgUaj8@cluster0.6rcqd.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;