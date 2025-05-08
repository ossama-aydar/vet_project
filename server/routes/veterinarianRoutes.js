const express = require('express');
const router = express.Router();
const veterinarianController = require('../controllers/veterinarianController');

router.get('/', veterinarianController.getVeterinarians); // GET /veterinarians
router.get('/:id', veterinarianController.getVeterinarian); // GET /veterinarians/:id
router.post('/', veterinarianController.createVeterinarian); // POST /veterinarians
router.put('/:id', veterinarianController.updateVeterinarian); // PUT /veterinarians/:id
router.delete('/:id', veterinarianController.deleteVeterinarian); // DELETE /veterinarians/:id

module.exports = router;