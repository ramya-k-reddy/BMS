const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin','partner'],
    default: 'user',
    required: true,
  },
}, 
);

const userModel = moongoose.model('users', userSchema);
module.exports = userModel;