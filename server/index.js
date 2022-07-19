const mysql = require('mysql');
const express = require('express');
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');

const app = express();
const PORT = 3002
app.use('/img',express.static(path.join(__dirname, 'img')))
app.use(express.json());
app.use(busboy());

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

//Upload a file
app.post('/api/uploadfile',(req, res)=>{
    var fstream;
    req.pipe(req.busboy)
    req.busboy.on('file',(fieldname,file, filename)=>{
        console.log("Uploading..."+filename+" "+fieldname+" "+file)
        console.log(filename)
        fstream = fs.createWriteStream(__dirname+'/img/'+filename.filename)
        file.pipe(fstream)
        fstream.on('close',()=>{
            console.log("Uploaded file")
            res.send("{\"status\":\"ok\",\"img\":\"filename.filename\"}")
        })
    })
})

//Get all blogs
app.get('/api/get/blogs',(req, res)=>{
    connection.query("SELECT * FROM post",(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(JSON.stringify({blogs:result}))
    })
})


//Add Blog
app.post('/api/add/blog', (req, res)=>{
    const title = req.body.title;
    const body = req.body.body;

    connection.query("INSERT INTO post (title, body, date_created) VALUES (?, ?,NOW())",[title, body],(err, result)=>{
        if (err) {
            console.error(err);
            res.send(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
})

//Get Blog by id
app.get('/api/blog/get/:id',(req, res)=>{
    const id = req.params.id;
    console.log(id);
    connection.query("SELECT * FROM post WHERE pid =?",[id,],(err, result)=>{
        if (err) {
            console.error(err);
            res.send(err);
        }else{
            console.log(result);
            res.send(JSON.stringify(result[0]));
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