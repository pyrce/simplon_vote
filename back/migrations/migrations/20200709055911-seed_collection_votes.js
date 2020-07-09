var mongoose = require('mongoose');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return await db.collection('vote').insertMany([
      {
        "_id": mongoose.Types.ObjectId("5f033bf1220832635062c9f4"),
        "subject": "Aimez-vous boire du café ?",
        "quota": 2,
        "choices": [
            "oui",
            "non"
        ],
        "nbVote": 0,
        "createdBy": mongoose.Types.ObjectId("5f03355d220832635062c9ef"),
        "participants": [],
        "status": "created",
        "created": new Date(),
        "modified": new Date()
    },
    {
        "_id": mongoose.Types.ObjectId("5f033bf1220832635062c9f5"),
        "subject": "Vous êtes plus pour le chocolat ou la vanille ?",
        "quota": 2,
        "choices": [
            "chocolat",
            "vanille"
        ],
        "nbVote": 1,
        "createdBy": mongoose.Types.ObjectId("5f03355d220832635062c9f0"),
        "participants": [
          mongoose.Types.ObjectId("5f03355d220832635062c9f0"),
          mongoose.Types.ObjectId("5f03355d220832635062c9f1")
        ],
        "status": "inprogress",
        "created": new Date(),
        "modified": new Date()
    },
    {
        "_id": mongoose.Types.ObjectId("5f033bf1220832635062c9f6"),
        "subject": "Aimez-vous les sushis ?",
        "quota": 2,
        "choices": [
            "oui",
            "non"
        ],
        "nbVote": 2,
        "createdBy": mongoose.Types.ObjectId("5f03355d220832635062c9f1"),
        "participants": [
          mongoose.Types.ObjectId("5f03355d220832635062c9ef"),
          mongoose.Types.ObjectId("5f03355d220832635062c9f0")
        ],
        "status": "finished",
        "created": new Date(),
        "modified": new Date()
      }
      ], {})
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return await db.collection('vote').deleteMany({})
  }
};
