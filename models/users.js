const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema definition
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, ' First Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },

  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    // select: false 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // If password wasn't changed, skip
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
  