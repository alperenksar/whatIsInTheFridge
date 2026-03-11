const { error } = require('node:console');
const {query} = require('../config/database');

const addItem = async(req,res) => {
    const {name , description , quantity, expiry_date} = req.body;
    const ownerid = req.user.id;
    
    
    try{
        const result = await query(
            'INSERT INTO items (name, description,quantity,expiry_date,ownerid) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [name, description, quantity, expiry_date, ownerid]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        res.status(500).json({error:"Item didnt added" + err.message});
    }


};


const getItems = async (req, res) => {
  try {
    const result = await query('SELECT * FROM items WHERE owner_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Ürünler getirilirken hata oluştu." });
  }
};

module.exports = { addItem, getItems };