const express = require('express');
require('dotenv').config();

const desaRoutes = require('./routes/desaRoutes');

const app = express();
app.use(express.json());

// endpoint base
app.use('/desa', desaRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server aktif di http://localhost:${PORT}`);
});
