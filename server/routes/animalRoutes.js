const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/', animalController.createAnimal); // POST /animals
router.put('/:id', animalController.updateAnimal); // PUT /animals/:id
router.delete('/:id', animalController.deleteAnimal); // DELETE /animals/:id
router.get('/:id', animalController.getAnimal); // GET /animals/:id

module.exports = router;