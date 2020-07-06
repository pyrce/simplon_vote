const mongoose = require('mongoose')

const userVoteSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    vote: {
        type: ObjectId,
        required: true
    },
    
    choix: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('userVote', userVoteSchema)
