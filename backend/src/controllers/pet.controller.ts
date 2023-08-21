import { petReq } from "../types/pet.type";
import mongoose from "mongoose";

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
  try{
    const deletePet = await PetApp.findByIdAndDelete(req.params.id);
    //res.redirect('/');
    res.status(202).json(deletePet);
    }
    catch(err){
        res.status(500).json({ message: err });
    }
};

// Update a pet
export const updatePet = async (req:any, res:any) => {
  const {name, comments} = req.body;
    try{
    const petEdited = await PetApp.findByIdAndUpdate(req.params.id, 
        {name, comments});
    res.json(petEdited).status(200)
    }
    catch(err){
        res.status(500).json({ message: err });
    }
};

// Export the controller functions
module.exports = {
  getAllPets,
  createPet,
  deletePet,
  updatePet
};
