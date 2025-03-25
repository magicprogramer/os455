const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8003',
    methods: ['GET', 'POST']
  }));
const cookieParser = require("cookie-parser");
const socket = require('socket.io');
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const key = "18236";
const http = require("http");
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: 'http://localhost:8003',  // Allow frontend origin
        methods: ['GET', 'POST']
    }
});

io.on('connection', function(socket){

    socket.on("send", function(msg)
        {
            console.log("a massege sent");
            io.emit("send", msg);
        }
    
    )
});
function auth()
{
    return function(req, res, next)
    {
        console.log("user : ) " + req.cookies.token, typeof req.cookies.token);
        console.log(req.cookies.username);
        if (req.cookies.token && req.cookies.username)
        {
            console.log("foine");
            try{
                let data = jwt.verify(req.cookies.token, key);
                console.log(data);
                req.user = data.username;
                next();
            }
            catch{
                return res.render("regLog.ejs", {msg: "something wrong"});
            }
        }
        else
        {
            return res.redirect("/login");
        }
    }
}
function build()
{
    mongoose.connect('mongodb://localhost:27017/database1');
    var userSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            email : String,
            favColor : String


        });
        global.User = mongoose.model('User', userSchema);
    var postShema = new mongoose.Schema(
        {
            content : String,
            header : String,
            user : String

        });
    global.Post = mongoose.model('Post', postShema);

    


}
async function addUser(u)
{
    if (!u.username || !u.email || !u.email)
    {
        console.log("missing fields");
        return null;
    }
    let exist = await global.User.findOne(

        {$or : [{username: u.username}, {email : u.email}]}

    );
    if (exist)
    {
        console.log("username or email already exist");
        return null;
    }
    let user = await new global.User(

        u

    );
    user.save();
    return user;
}
async function createPosts(p)
{
    let post = await new global.Post(

        p
    );
    post.save();
    return post;
}
async function getPosts()
{
    let posts = await global.Post.find({});
    return posts;
}

build()
app.post("/register", async function(req, res)
{
    console.log(req.body.username, req.body.email, req.body.password, req.body.theme);
    if (req.body.username && req.body.email && req.body.password && req.body.email && req.body.favColor)
    {
        let result = await addUser({
            username : req.body.username,
            email : req.body.email,
            password: req.body.password,
            favColor : req.body.favColor

        });
        if (result)res.render("regLog.ejs", {msg : "registered succesfully"});
        else res.render("regLog.ejs", {msg : "sorry something went wrong"});
    } else res.render("regLog.ejs", {msg : "missing fields"});
}

);
app.get("/login", function(req, res)
{
    return res.render("regLog.ejs");
})
app.post("/login", async function(req, res)
{

    if (!req.body.username || !req.body.password)
    {
        console.log("username and password are required");
        return null;
    }
    console.log(req.body.username);
    console.log(req.body.password);
    let exist = await global.User.findOne(

        {$and : [{username: req.body.username}]});
    if (exist)
    {
        let tk = jwt.sign({"username" : req.body.username}, key);
      //  console.log(tk);
        res.cookie('token', tk);
        res.cookie("username", req.body.username);
        let posts = await getPosts();
        res.render("home.ejs", {username: req.body.username, posts : posts}); 
    }
    else
    {
        res.send("user doesn't exist");
    }

});
app.get("/", auth(), async function(req, res)
{
    console.log("user is " + req.user);
    posts = await getPosts();
    res.render('home.ejs', {username: req.user, posts : posts});
}

)
app.post("/post", auth(), function(req, res)
{
    let data = jwt.verify(req.cookies.token, key);
    console.log(data.username);
    if (req.body.content)
    {
        
        createPosts(
            {
                content: req.body.content,
                user: data.username
            }

        )
    }
    res.redirect("/");
}

)
app.get("/logout", function(req, res)
{
 res.clearCookie('token');
 res.redirect("/login");
});
/*
addUser(

    {
        username: "ahmedd",
        password: "1243",
        email : "ah3@gmail.com"
    }
);
*/

app.listen(8003);
server.listen(4002);
console.log("connected");
