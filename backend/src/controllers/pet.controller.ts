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
  const { name, comments } = req.body;
  try {
    const pet = new PetApp({ name, comments});
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ message: err});
  }
};
// Delete a pet
export const deletePet = async (req:any, res:any) => {
  try {
    const petId = mongoose.Types.ObjectId(req.params.id); // Convert ID to ObjectId
    const deletedPet = await PetApp.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete pet" });
  }
};

// Update a pet
export const updatePet = async (req:any, res:any) => {
  const petId = mongoose.Types.ObjectId(req.params.id); // Convert ID to ObjectId
  const { name, comments } = req.body;
  try {
    const updatedPet = await PetApp.findByIdAndUpdate(
      petId,
      { name, comments },
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.status(200).json(updatedPet);
  } catch (e) {
    res.status(500).json({ error: "Failed to update pet" });
  }
};

// Export the controller functions
module.exports = {
  getAllPets,
  createPet,
  deletePet,
  updatePet
};
