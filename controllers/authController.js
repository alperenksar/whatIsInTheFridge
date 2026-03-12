const {query} = require("../config/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const login = async(req ,res) => {
    const {username , password}=req.body;

    try{
        const result = await query('SELECT * FROM users WHERE username = $1' , [username]);

        if(result.rows.length === 0){
            return res.status(401).json({error:"Wrong username"});
        }

        const user = result.rows[0];

        const isTrue = await bcrypt.compare(password , user.password);
        if(!isTrue){
            return res.status(401).json({error:"Wrong password"});
        }

        const token = jwt.sign({
            id : user.id,
            username : user.username
        },
        process.env.JWT_SECRET,{
            expiresIn:'24h'
        });

        res.json({
            message:"Login succesful",
            token:token
        });


    }

    catch(err){
        console.log(err);
        res.status(500).json({error:"Not successful"});
    }


}







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
        res.status(500).json({error:"Error with newuser. " + err.message});
    }
};



const getUsers = async (req, res) => {
  try {
    const result = await query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "There is an issue with getting the items" });
    console.log(err);
  }
};

module.exports = {register ,login ,getUsers};