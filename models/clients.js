const mongoose = require('mongoose');

// Define the user schema
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true // trims whitespace from the beginning and end of the string
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true 
  },
  message: {
    type: String,
    trim: true,
    
}
}, {
  timestamps: true 
});

// Create a User model using the user schema
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
