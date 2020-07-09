module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return await db.createCollection('vote', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['subject', 'quota', 'choices', 'nbVote', 'participants', 'createdBy', 'status'],
          properties: {
              subject: {
                bsonType: 'string'
              },
              quota: {
                bsonType: 'int'
              },
              choices: {
                  // array string ex: ['oui', 'non', 'peut être']
                  bsonType: 'array'
              },
              nbVote: {
                bsonType: 'int'
              },
              createdBy: {
                  // Object ID de l'utilisateur qui a créer le sujet de vote
                  bsonType: 'objectId',
              },
              participants: {
                // Array des Object ID des utilisateurs qui participent au vote
                bsonType: 'array',
              },
              status: {
                  // On peut avoir 3 valeurs : created,inprogress,finished
                  bsonType: 'string'
              }
          }
      },
  },
  validationLevel: 'strict',
  validationAction: 'error',
    })
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return await db.collection('vote').drop()
  }
};
