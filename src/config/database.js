const mongooes = require('mongoose');

const connect = async () => {
    try {
        await mongooes.connect('mongodb://localhost:27017/APPNITC');
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
    }
}

module.exports = {connect};