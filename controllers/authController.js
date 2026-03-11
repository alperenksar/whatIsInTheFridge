const {query} = require("../config/database");
const bcrypt = require('bcrypt');



const register = async (req,res) => {
    const {username , password} = req.body;

    try{
        const cryptedPassword = await bcrypt.hash(password,10);

        const newUser = await query(
            'INSERT INTO users (username, password) VALUES ($1,$2) RETURNING id, username',
            [username, cryptedPassword] 
        );

        res.status(201).json({
            message:"New user is created succesfully",
            user:newUser.rows[0]
        });
    }
    catch(err){
        res.status(500).json({error:"Error with newuser."});
    }
};

module.exports = {register};