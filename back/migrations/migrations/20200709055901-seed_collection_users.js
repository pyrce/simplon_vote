var mongoose = require('mongoose');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return await db.collection('users').insertMany([
    {
        "_id": mongoose.Types.ObjectId("5f03355d220832635062c9ef"),
        "login": "test1",
        "email": "test1@test.com",
        "password": "123456"
    },
    {
        "_id": mongoose.Types.ObjectId("5f03355d220832635062c9f0"),
        "login": "test2",
        "email": "test2@test.com",
        "password": "123456"
    },
    {
        "_id": mongoose.Types.ObjectId("5f03355d220832635062c9f1"),
        "login": "test3",
        "email": "test3@test.com",
        "password": "123456"
    } 
    ], {})
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return await db.collection('users').deleteMany({})
  }
};
