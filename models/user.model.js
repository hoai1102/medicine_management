const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
  },
  email: {
    type: String,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 6,
  },
});

module.exports = mongoose.model('User', userSchema);
