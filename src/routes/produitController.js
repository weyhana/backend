const db = require('../config/database');
const getProduits = async (req, res) => {
    try {
        const [produits] = await db.query('SELECT * FROM produit');
        res.status(200).json(produits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const addProduit = async (req, res) => {
    try {
        const { Nom, Prix, Stock } = req.body;

        const sql = `
            INSERT INTO produit (nom, prix, stock)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.query(sql, [Nom, Prix, Stock]);

        res.status(201).json({
            message: 'Produit ajouté avec succès',
            IdProduit: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Prix, Stock } = req.body;

        const sql = `
            UPDATE produit
            SET nom = ?,
                prix = ?,
                stock = ?
            WHERE id_produit = ?
        `;

        const [result] = await db.query(sql, [Nom, Prix, Stock, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }

        res.status(200).json({ message: 'Produit modifié avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM produit WHERE id_produit = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }

        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProduits,
    addProduit,
    updateProduit,
    deleteProduit
};