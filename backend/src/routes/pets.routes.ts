// backend/routes/petRoutes.js
const express = require('express');
const router = express.Router();

import {createPet, getAllPets, deletePet, updatePet} from '../controllers/pet.controller';

// Route to get all pets
router.get('/pets', getAllPets);

// Route to create a new pet
router.post('/pets/create', createPet);

// Route to delete a pet
router.delete('/pets/del/:id', deletePet);

// Route to update a pet
router.put('/pets/upd/:id', updatePet);

export default router;
