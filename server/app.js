const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({ name, text, id});

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    // check data validation (on server)
    if (!data.name || !data.room) {
      return cb('Invalid data')
    }
    // identify joined user to exact room
    socket.join(data.room)
    // create userId => trigger cb on front
    cb({ userId: socket.id })
    // create first Welcome message
    socket.emit('newMessage', m('admin', `Welcome, ${data.name}!`))
    // remove current user and leave others in chat (and send message to users)
    socket.broadcast.to(data.room)
      .emit('newMessage', m('admin', `${data.name} joined the chat.`))
  })

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' SERVER'
      })
    }, 500)
  })
})

module.exports = {
  app,
  server
}
