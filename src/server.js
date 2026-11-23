const express = require('express');

const app = express();

app.use(express.json());

const clientRoutes = require('./routes/client.routes');

app.use('/api/clients', clientRoutes);
app.use('/produit', require('./routes/produit.routes'));

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Express !');
});

const produitRoutes = require('./routes/produit.routes');
app.use('/api/produits', produitRoutes);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});