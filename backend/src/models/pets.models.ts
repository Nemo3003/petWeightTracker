const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const petSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  species: { 
    type: String, 
    required: true 
    },
  weight: { 
    type: Number, 
    required: true 
    },
  weightLog: [weightLogSchema], // Embedding an array of weight logs as subdocuments
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
