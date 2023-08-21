const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  
});

const petSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    },
  comments : {
    type: String,
    required: true
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    required: false
  }, // Embedding an array of weight logs as subdocuments
});

const PetApp = mongoose.model('PetApp', petSchema);

module.exports = PetApp;
