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
<<<<<<< HEAD
        type: Schema.Types.ObjectId,
        ref : 'user'
=======
        type: ObjectId,
        ref: 'user'
>>>>>>> 19572b07b5e2b4b3898d6b379a50b37744368232
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