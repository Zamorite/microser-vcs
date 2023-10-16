const express = require('express')
const bodyParser = require('body-parser')

const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())


const commentsById = {}


app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsById[req.params.id] || [])
})


app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsById[req.params.id] || []
    comments.push({
        id, content
    })

    commentsById[req.params.id] = comments

    res.status(201).send(commentsById[req.params.id])
})


app.listen(4001, () => {
    console.log('Listening on 4001')
})