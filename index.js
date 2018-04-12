const express = require('express')
const { MongoClient } = require('mongodb')
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
  db.collection('notes').insertOne(req.body).catch((err) => {
    console.log(err)
  })
  res.sendStatus(201)
})

app.get('/all-notes', (req, res) => {
  db.collection('notes').find().toArray().then(notes => res.send(notes)).catch(() => res.sendStatus(500))
})
