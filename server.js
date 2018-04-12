const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const create = require('./db.js')

const app = express()

const newNote = []
app.use(express.static(path.join(__dirname, '/')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/new-note', (req, res) => {
  console.log(req.body)
  create(req.body)
  console.log(newNote)
  res.sendStatus(201)
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})

exports = newNote
