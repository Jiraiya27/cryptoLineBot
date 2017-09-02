const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  roomType: { type: String, enum: [ 'user', 'group' ] },
  interval: { type: Number },
  lastRequest: { type: Date },
  status: { type: Boolean, default: false }
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room

