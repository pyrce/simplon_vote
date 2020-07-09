module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return await db.createCollection('users_votes', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["user", "vote", "choice"],
          properties: {
            user: {
              bsonType: 'objectId'
            },
            vote: {
              bsonType: 'objectId'
            },
            choix: {
              bsonType: 'int'
            }
          }
        }
      },
      validationLevel: 'strict',
      validationAction: 'error',
    })
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return await db.collection('users_votes').drop()
  }
};
