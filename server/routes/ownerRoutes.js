const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.get('/', ownerController.getOwners); // GET /owners?lastName=Smith
router.post('/', ownerController.createOwner); // POST /owners
router.put('/:id', ownerController.updateOwner); // PUT /owners/:id
router.get('/:id/full', ownerController.getOwnerFull); // GET /owners/:id/full
router.delete('/:id', ownerController.deleteOwner); // DELETE /owners/:id

module.exports = router; 