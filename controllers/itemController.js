const { error } = require('node:console');
const {query} = require('../config/database');

const addItem = async(req,res) => {
    const {name , description , quantity, expiry_date ,owner_id} = req.body;

      
    try{
        const result = await query(
            'INSERT INTO items (name, description,quantity,expiry_date,owner_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [name, description, quantity, expiry_date, owner_id]
        );
        res.status(201).json(result.rows[0]);
        console.log(owner_id);
    }catch(err){
        res.status(500).json({error:"Item didnt added" + err.message});
    }


};


const getItems = async (req, res) => {
  try {
    const result = await query('SELECT * FROM items WHERE owner_id = 2');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "There is an issue with getting the items" });
  }
};

module.exports = { addItem, getItems };