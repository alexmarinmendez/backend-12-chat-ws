const express = require('express')
const { Server } = require('socket.io')

const app = express()
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
const io = new Server(server)
app.use(express.static('./src/public'))

let history = []

io.on('connection', socket => {
    socket.on('message', data => {
        history.push(data)
        io.emit('history', history)
    })
    socket.on('registered', data => {
        socket.broadcast.emit('newUser', data)
        socket.emit('history', history)
    })
})