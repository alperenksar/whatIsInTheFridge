const { query } = require('../config/database');


const restartDatabase = async () => {
    try {
        console.log("DATABASE RESTART ");

        // 1. ADIM: Her şeyi kökten sil (Tabloları imha et)
        await query('DROP TABLE IF EXISTS items CASCADE');
        await query('DROP TABLE IF EXISTS users CASCADE');
        console.log("Eski tablolar ve tüm veriler imha edildi.");

        // 2. ADIM: Users Tablosunu Sıfırdan Kur
        await query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log("'users' tablosu yeniden inşa edildi.");

        // 3. ADIM: Items Tablosunu Sıfırdan Kur
        await query(`
            CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                image TEXT,
                category TEXT,
                description TEXT,
                unit TEXT,
                quantity VARCHAR(50),
                expiry_date DATE,
                owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        console.log("'items' tablosu yeniden inşa edildi.");

        console.log(" DATABASE RESTART TAMAMLANDI!");
        process.exit();
    } catch (err) {
        console.error("Restart sırasında hata oluştu:", err.message);
        process.exit(1);
    }
};

restartDatabase();

