import { petReq } from "../types/pet.type";

// backend/controllers/petController.js
const PetApp = require('../models/pets.models');

// Controller function to get all pets
export const getAllPets = async (req:petReq, res:any) => {
  try {
    const pets = await PetApp.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Controller function to create a new pet
export const createPet = async (req:any, res:any) => {
  const { name, species, weight } = req.body;
  try {
    const pet = new PetApp({ name, species, weight });
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ message: err});
  }
};

// Export the controller functions
module.exports = {
  getAllPets,
  createPet,
};
