const { MongoClient } = require('mongodb')

module.exports = (data) => {
  MongoClient.connect('mongodb://localhost/notes', (err, client) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const db = client.db('notes')
    const collection = db.collection('notes')
    collection.insertOne(data, (err) => {
      if (err) throw err
      client.close()
    })
  })
}
