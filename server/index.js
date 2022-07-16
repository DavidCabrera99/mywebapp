const mysql = require('mysql');
const express = require('express');

const app = express();
const PORT = 3002
app.use(express.json());

//Get All Users
app.get("/api/get/users", (req, res) => {
    connection.query("SELECT * FROM users",(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

//Add User
app.post("/api/add/user", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const age = req.body.age;
    
    console.log(`User ${username} email ${email} age ${age}`)
    
    connection.query("INSERT INTO users (name, age, email) VALUES (?, ?,?)",[username,age,email],(err, result)=>{
        if (err) {
            console.error(err);
            res.send(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
})


const mysql_user = {
    host: 'localhost',
    user: 'root',
    password: '1',
    database: 'myReactDB'
}
const connection = mysql.createConnection(mysql_user, {
    multipleStatements: true,
})


app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`)
})