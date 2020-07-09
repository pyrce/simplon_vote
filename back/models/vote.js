const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
    _id:{ type: ObjectId},
    subject: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : "{VALUE} n'est pas un entier"
        }
    },
    choices: {
        type: Array
    },
    nbVote: {
        type: Number,
        validate : {
            validator : Number.isInteger,
            message   : "{VALUE} n'est pas un entier"
        }
    },
    createdBy: {
        type: ObjectId,
        ref:"users"
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
    
},{collection:"vote"})

module.exports = mongoose.model('vote', voteSchema)