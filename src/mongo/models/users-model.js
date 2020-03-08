const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  data: {
    type: { age: Number, isMale: Boolean }
  },
  role: { type: String, enum: ['admin', 'selter'], default: 'selter' }
});

module.exports = mongoose.model('User', userSchema);
