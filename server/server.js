const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on("connection", socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on("send-message", ({ ids, text }) => {
    ids.forEach(recipient => {
      const newRecipients = ids.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.to(recipient).emit("receive-message", {
        ids: newRecipients,
        sender: id,
        text,
      })
    })
  })
})
