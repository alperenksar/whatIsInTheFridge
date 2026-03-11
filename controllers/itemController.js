const { error } = require('node:console');
const {query} = require('../config/database');

const addItem = async(req,res) => {
    const {name , description , quantity,unit ,expiry_date ,owner_id} = req.body;

      
    try{
        const result = await query(
            'INSERT INTO items (name, description,quantity,unit,expiry_date,owner_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [name, description, quantity,unit,expiry_date, owner_id]
        );
        res.status(201).json(result.rows[0]);
        console.log(owner_id);
    }catch(err){
        res.status(500).json({error:"Item didnt added " + err.message});
    }


};


const getItems = async (req, res) => {
  try {
    const result = await query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "There is an issue with getting the items" });
  }
};



const deleteItem = async (req,res) =>{
    try {
        const result = await query(
            'DELETE FROM items WHERE name = $1 RETURNING *',
            ["Milk"]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ürün bulunamadı." });
        }
        res.json({ message: "Item is deleted!!" });
    } catch (err) {
        res.status(500).json({ error: "There is an issue about deleting." + " " + err.message });
    }
};


const updateItem = async (req, res) => {
    //const { id } = req.params;
    let productName = "Milk"
    const { name, description, quantity, unit,expiry_date } = req.body;
    console.log(req.body);

    try {
        const result = await query(
            'UPDATE items SET name = $1, description = $2, quantity = $3, unit = $4 ,expiry_date = $5 WHERE name=$6 RETURNING *',
            [name, description, quantity, unit,expiry_date,productName]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "That is not a product" });
        }
        res.json({ message: "Product is updated", item: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "There is an issue about updating" + " " + err.message});
    }
};


module.exports = { addItem, getItems ,deleteItem ,updateItem};
