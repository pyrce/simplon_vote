const mongoose = require('mongoose')
var ObjectId=mongoose.Schema.Types.ObjectId;
const voteSchema = mongoose.Schema({
    _id:{ type: ObjectId},
    subject: {
        type: String,
        required :true
    },
    quota: {
        type: Number,
        required :true
    },
    choices: {
        type: Array
    },
    nbVote: {
        type: Number
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
