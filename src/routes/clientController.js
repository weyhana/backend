const db = require('../config/database');

const addClient = async (req, res) => {
    try {
        const { Nom, Prenom, Telephone, Email, Ville } = req.body;

        const sql = `
            INSERT INTO Client (Nom, Prenom, Telephone, Email, Ville)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            Nom, Prenom, Telephone, Email, Ville
        ]);

        res.status(201).json({
            message: 'Client ajouté avec succès',
            IdClient: result.insertId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Prenom, Telephone, Email, Ville } = req.body;

        const sql = `
            UPDATE Client
            SET Nom = ?,
                Prenom = ?,
                Telephone = ?,
                Email = ?,
                Ville = ?
            WHERE IdClient = ?
        `;

        const [result] = await db.query(sql, [
            Nom, Prenom, Telephone, Email, Ville, id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Client introuvable'
            });
        }

        res.status(200).json({
            message: 'Client modifié avec succès'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = 'DELETE FROM Client WHERE IdClient = ?';

        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Client introuvable'
            });
        }

        res.status(200).json({
            message: 'Client supprimé avec succès'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getClients = async (req, res) => {
    try {
        const [clients] = await db.query(
            'SELECT * FROM Client'
        );

        res.status(200).json(clients);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    addClient,
    updateClient,
    deleteClient,
    getClients
};
