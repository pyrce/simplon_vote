const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{collection:"user"})

module.exports = mongoose.model('user', userSchema)
