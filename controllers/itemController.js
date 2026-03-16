const { error } = require('node:console');
const {query} = require('../config/database');

const addItem = async(req,res) => {
    const {name,image,category, description, quantity,unit,expiry_date,bought_date,price,owner_id} = req.body;
    let updated_date = new Date().toISOString().split('T')[0];
    
    try{
        const result = await query(
            'INSERT INTO items (name,image,category ,description,quantity,unit,expiry_date,bought_date,updated_date,price,owner_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
            [name,image,category, description, quantity,unit,expiry_date,bought_date,updated_date,price,owner_id]
        );
        res.status(201).json(result.rows[0]);
     
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
    const { id}  = req.params;
    console.log(id);
    try {
        const result = await query(
            'DELETE FROM items WHERE id = $1 RETURNING *',
            [id]
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
    const { id } = req.params;
   
    const { name,image,category,description, quantity,unit,expiry_date,price} = req.body;
    let updated_date = new Date().toISOString().split('T')[0];
    console.log(req.body);

    try {
        const result = await query(
            'UPDATE items SET name = $1,image=$2,category=$3 ,description = $4, quantity = $5, unit = $6 ,expiry_date = $7 , updated_date = $8 , price=$9 WHERE id=$10 RETURNING *',
            [name,image,category,description,quantity, unit,expiry_date,updated_date,price,id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "That is not a product" });
        }
        res.json({ message: "Product is updated", item: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "There is an issue about updating" + " " + err.message});
    }
};

const getExpiringItems = async (req, res) => {
    try {
        const result = await query(
            `SELECT * FROM items 
             WHERE expiry_date >= CURRENT_DATE 
             AND expiry_date <= CURRENT_DATE + INTERVAL '3 days' 
             ORDER BY expiry_date ASC`
           
        );
        
        res.json({
            count: result.rows.length,
            items: result.rows
        });
    } catch (err) {
        res.status(500).json({ error: "Filtreleme sırasında hata oluştu." + " " + err.message});
    }
};


const filterWithName = async(req,res) => {

    let { name } = req.query; 
    name ="Alperen";
    try{
        const result = await query(
                  
            'SELECT * FROM items WHERE name ILIKE $1',
            [`%${name}%`]
           
        );
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({ error: "There is an error with filter." + " " + err.message});
    }
}

const filterWithCategory = async(req,res) =>{
    const { category } = req.query;
    try{
        const result = await query(
            'SELECT * FROM items WHERE category ILIKE $1',
            [`%${category}%`]

        );
        res.json(result.rows);
    }catch(err){
        res.status(500).json({error:"There is an error with filter."+" "+err.message})
    }
}


const getRecentlyBought = async(req,res) =>{
    try{
        const result = await query(
            "SELECT * FROM items ORDER BY id DESC LIMIT 20"
        );
        res.status(200).json(result.rows);
        
    }
    catch(err){
        console.log("There is an error about getting the datas" , err.message);
        res.status(500).json({error:"Couldnt take the datas"});
    }
};



const getRecentlyUpdated = async(req,res) => {
    try{
        const result = await query(
            "SELECT * FROM items ORDER BY updated_date DESC LIMIT 10"
        );
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log("There is an error about recentlyUpdated method" , err.message);
        res.status(500).json({error:"Couldnt get the recently_updated"});
    }
};


const getItem = async (req,res) =>{

    const { id } = req.params;
    try {
    const result = await query('SELECT * FROM items WHERE id=$1',
        [2]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "There is an issue with getting the items" });
  }

}


module.exports = { addItem, getItems, updateItem, deleteItem, getExpiringItems , filterWithName , filterWithCategory ,getRecentlyBought , getRecentlyUpdated ,getItem};



