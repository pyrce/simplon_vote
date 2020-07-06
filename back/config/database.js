const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

let url = 'mongodb://localhost:27017/simplon_vote'

if (process.env.DB_URL) {
    url = process.env.DB_HOST
}

mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
}).then(() => {
  //connection established successfully
  console.log('connection established successfully')
}).catch();{
  //catch any error during the initial connection
};

module.exports = mongoose;