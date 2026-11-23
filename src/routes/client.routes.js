const express = require('express');
const router = express.Router();

const {
    addClient,
    updateClient,
    deleteClient,
    getClients
} = require('./clientController');



router.get('/', getClients)
router.post('/', addClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;