const express = require('express');
const User = require('../models/userModel');

const userRouter = express.Router();

// Middleware to parse JSON bodies
userRouter.use(express.json());

userRouter.post('/register', async (req, res) => { ///api/users/register
  const { name, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ email:req.body.email });
    if (existingUser) {
      return res.send({ success:false, message: 'Email already exists' });
    }
    const newuser = new User(req.body);
    await newuser.save();

    res.send({ success: true, message: 'User registered successfully' });
  // Optional: Verify MongoDB connection
  if (User.db && User.db.readyState === 1) {
    console.log('MongoDB connection is active');
  } else {
    console.warn('MongoDB connection is not active');
  }
}         
    catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Server error' });
    }
});

userRouter.post('/login', async (req, res) => { ///api/users/login
  const { email,password } = req.body;

  try {
    const user = await User.findOne({email:req.body.email});
    if (!user) {
      return res.send({success:false, message: 'User not found' });
    }   
    if(req.body.password !== user.password) {
      return res.send({success:false, message: 'Invalid password' });
    }
    res.send({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = userRouter;
// This code defines a user registration route using Express.js.