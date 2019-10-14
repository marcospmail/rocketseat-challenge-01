const express = require('express')
const server = express()

server.use(express.json())

var requestsCount = 0
const data = [];

function isValidId(req, res, next) {
    const project = data.find(project => project.id === req.params.id)
    if (!project) {
        return res.status(400).json({message: 'invalid id'})
    }

    return next()
}

server.use((req, res, next) => {
    requestsCount ++;
    console.log(requestsCount)

    next();
})

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    }

    data.push(project)

    res.json(project)
})

server.put('/projects/:id', isValidId, (req, res) => {
    const { id } = req.params
    const project = data.find(project => project.id === id)

    project.title = req.body.title

    res.json(project)
})

server.post('/projects/:id/tasks', isValidId, (req, res) => {
    const { id } = req.params;
    
    data[id].tasks.push(req.body.title)

    res.json(data[id].tasks)
})

server.get('/projects', (req, res) => {
    res.json(data)
})

server.listen(3000)
