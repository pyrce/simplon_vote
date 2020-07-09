var mongoose = require('mongoose');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return await db.collection('usersVotes').insertMany([
      {
        "_id": mongoose.Types.ObjectId("5f033d9a220832635062c9f7"),
        "user": mongoose.Types.ObjectId("5f03355d220832635062c9f0"),
        "vote": mongoose.Types.ObjectId("5f033bf1220832635062c9f5"),
        "choix": 1
    },
    {
        "_id": mongoose.Types.ObjectId("5f033d9a220832635062c9f8"),
        "user": mongoose.Types.ObjectId("5f03355d220832635062c9ef"),
        "vote": mongoose.Types.ObjectId("5f033bf1220832635062c9f6"),
        "choix": 1
    },
    {
        "_id": mongoose.Types.ObjectId("5f033d9a220832635062c9f9"),
        "user": mongoose.Types.ObjectId("5f03355d220832635062c9f0"),
        "vote": mongoose.Types.ObjectId("5f033bf1220832635062c9f6"),
        "choix": 1
    }
    
      ], {})
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return await db.collection('usersVotes').deleteMany({})
  }
};
