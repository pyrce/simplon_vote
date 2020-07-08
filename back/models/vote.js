const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true
    },
    choices: {
        type: Array
    },
    nbVote: {
        type: Number
    },
    createdBy: {
        
        type: Schema.Types.ObjectId,
        ref : 'user'

    },
    participants: {
        type: Array,
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'inprogress', 'finished'],
        default: "created"
    },
    
})

module.exports = mongoose.model('vote', voteSchema)