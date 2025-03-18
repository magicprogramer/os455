const {MongoClient,ObjectId} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: ud } = require('uuid');
const bcrypt = require('bcrypt');
const client = new MongoClient("mongodb://localhost:27017")
const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
session = [];
async function hash(password) {
    return await bcrypt.hash(password, 7);
}

async function connect()
{
    await client.connect();
    app.db = client.db('users');
    console.log("done");
}
function auth()
{
    return function(req, res, next)
    {
        
        console.log(req.body);
        if (req.cookies.id && session[req.cookies.id])
        {
            console.log("path");
            next();
        }
        else
        {
            res.send("you are not logined login <a href = '/login'> here  </a>");
        }
    }
}
app.get("/", auth(), (req, res) => {
    res.sendFile(`${__dirname}/public/index2.html`);
    
});
app.post('/register', async (req, res) =>
{
    if (!req.body.username || !req.body.email)
    {
        res.sendFile(`${__dirname}/public/error.html`);
        return ;
    }
    let hashed = await hash(req.body.password);
    let user = await app.db.collection("users").findOne({username:req.body.username});
    let mail = await app.db.collection("users").findOne({email:req.body.email});
    if (mail || user)
    {
        res.send(`user or email already exists. please try to <a href='regLog.html'>login</a>`);
        return ;
    }
    
    const result = await app.db.collection("users").insertOne({email : req.body.email,
         username : req.body.username, password : hashed});
    console.log("added");
    res.sendFile(`${__dirname}/public/index2.html`);
});
app.get('/login', function(req, res)
{
    res.sendFile(`${__dirname}/public/regLog.html`);
    
}
)
app.post('/login', async (req, res) =>
{
   // console.log(req.body);
    if (!req.body.username)
    {
        console.log("Hell");
        res.sendFile(`${__dirname}/public/error.html`);
        return ;
    }
    console.log(req.body);
    let user = await app.db.collection("users").findOne({username:req.body.username});
    if (user)
    {
        let compare = await bcrypt.compare(req.body.password, user.password);
        //console.log(user.password, hashed, req.body.password);
        if (!compare)
        {
            res.sendFile(`${__dirname}/public/error.html`);
            return ;
        }
     //   console.log(req.body.username);
      //  console.log(user);
       // console.log(req.body);
       if (req.body.color)
       {
        res.cookie('color', req.body.color);
       }
        const id = ud();
        session[id] = user;
        res.cookie('id', id);
        res.cookie('username', user.username);
        res.send(`welcome back ${user.username} 
            press <a href = "index2.html"> here </a> to get to the main page`);
    }
    else res.sendFile(`${__dirname}/public/error.html`);
}
)
app.get("/logout",auth(),
(req, res)=>{
    console.log(req.cookies.id);
    session[req.cookies.id] = "";
    res.sendFile(`${__dirname}/public/regLog.html`);


}

);
connect();
app.listen(8019);