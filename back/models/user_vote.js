const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

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
},{ collection: 'usersVotes' })

module.exports = mongoose.model('usersVotes', userVoteSchema)
