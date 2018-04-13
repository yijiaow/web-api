const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

let db

MongoClient.connect('mongodb://localhost/notes', (err, client) => {
  if (err) throw err
  db = client.db('notes')
  app.listen(3000)
})

app.use(express.static(path.join(__dirname, '/')))
app.use(bodyParser.json())

app.post('/new-note', (req, res) => {
  db
    .collection('notes')
    .insertOne(req.body)
    .catch(() => {
      res.sendStatus(500)
    })
  res.sendStatus(201)
})

app.get('/all-notes', (req, res) => {
  db
    .collection('notes')
    .find()
    .toArray()
    .then(notes => res.send(notes))
    .catch(() => res.sendStatus(500))
})

app.put('/edit-note/:id', (req, res) => {
  const query = req.body
  delete query._id
  db
    .collection('notes')
    .updateOne({ _id: new ObjectID(req.params.id) }, { $set: query })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => res.sendStatus(500))
})
app.delete('/delete-note/:id', (req, res) => {
  db
    .collection('notes')
    .deleteOne({ _id: ObjectID(req.params.id) })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => res.sendStatus(500))
})
