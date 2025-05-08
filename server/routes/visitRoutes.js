const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

router.post('/', visitController.createVisit); // POST /visits
router.delete('/:id', visitController.deleteVisit); // DELETE /visits/:id
router.put('/:id', visitController.updateVisit); // PUT /visits/:id
router.get('/:id', visitController.getVisit); // GET /visits/:id

module.exports = router;