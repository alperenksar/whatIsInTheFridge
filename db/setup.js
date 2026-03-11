const { query } = require('../config/database');

const createTables = async () => {
    try {
        // Users table
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        // Products (Things) Table 
        await query(`
            CREATE TABLE IF NOT EXISTS items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                quantity VARCHAR(50), -- Gramaj bilgisi [cite: 88]
                expiry_date DATE, -- Son kullanma tarihi
                owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        console.log("Tablolar başarıyla oluşturuldu! ");
        process.exit();
    } catch (err) {
        console.error("Tablo oluşturulurken hata çıktı: ", err);
        process.exit(1);
    }
};

createTables();