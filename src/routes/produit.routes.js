const express = require('express');
const router = express.Router();
const {
    getProduits,
    addProduit,
    updateProduit,
    deleteProduit
} = require('./produitController');

router.get('/', getProduits);
router.post('/', addProduit);
router.put('/:id', updateProduit);
router.delete('/:id', deleteProduit);

module.exports = router;