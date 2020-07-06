const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    sujet: {
        type: String,
        required :true
    },
    quota: {
        type: Number,
        required :true
    },
    choix: {
        type: Array
    },
    nbVote: {
        type: Number
    },
    creator: {
        type: {
            String
        }
    },
    participants: {
        type: Array,
    },
    Status: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('vote', voteSchema)
