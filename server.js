const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Yazdığımız rotayı içe aktarıyoruz

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors()); 
app.use(express.json()); 


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('Dolapta Ne Var API Çalışıyor!');
});

// --- Sunucuyu Başlat ---
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde yayında!`);
});