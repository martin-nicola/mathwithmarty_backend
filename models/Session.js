const mongoose = require("mongoose")
const { Schema } = mongoose;

const sessionSchema = new Schema({
  start:  Date,
  end: Date,
  course_id: Number,
  admin_id: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
  }, {
    timestamp: true,
});

module.exports = mongoose.model('Session', sessionSchema)