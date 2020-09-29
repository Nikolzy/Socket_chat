const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({ name, text, id});

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    // check data validation (on server)
    if (!data.name || !data.room) {
      return cb('Invalid data')
    }
    // identify joined user to exact room
    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    // create userId => trigger cb on front
    cb({ userId: socket.id })
    // create first Welcome message
    socket.emit('newMessage', m('admin', `Welcome, ${data.name}!`))
    // remove current user and leave others in chat (and send message to users)
    socket.broadcast.to(data.room)
      .emit('newMessage', m('admin', `${data.name} joined the chat.`))
  })

  socket.on('createMessage', (data, cb) => {
    if(!data.text) {
      return cb('Empty input');
    }

    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    cb()
  })
})

module.exports = {
  app,
  server
}
