// backend/routes/petRoutes.js
const express = require('express');
const router = express.Router();

import {createPet, getAllPets} from '../controllers/pet.controller';

// Route to get all pets
router.get('/pets', getAllPets);

// Route to create a new pet
router.post('/pets/create', createPet);

export default router;
