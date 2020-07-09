const mongoose = require('mongoose')
var ObjectId=mongoose.Schema.Types.ObjectId;
const userSchema = mongoose.Schema({
    _id:{ type: ObjectId},
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{collection:"users"})

module.exports = mongoose.model('users', userSchema)