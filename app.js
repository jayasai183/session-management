const express = require('express');
const app = express();
const PORT = 4000;
const userModel=require("./modal");
const mongoose=require('mongoose');
//const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mongoDBStore=require('connect-mongo');

const uri='mongodb+srv://Jay:PracticeDB@cluster0.wgmnd.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri).then(console.log("connected"));


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
    resave: false,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

//app.use(cookieParser());

//username and password
//const myusername = 'user1'
//const mypassword = 'pass'

// a variable to save a session
var session;
var userdata;

app.get('/',(req,res) => {
    if(req.session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else{
        res.sendFile('index.html',{root:__dirname})
    }
    
});

app.get('/api/:id',async (req,res)=>{
    const user= await userModel.find();
    console.log(user);
    if(user[3].username==req.params.id){
        res.send(`Welcome ${user} <a href=\'/logout'>click to logout</a>`);
    }else{
        res.send("incorrect");
    }
});

app.post('/user', async (req,res) => {
    // const userdata={};
    // userdata["Username"]=req.body.username;
    // userdata["Password"]=req.body.password;
    // const data=new userModel(userdata);
    // console.log(userdata);
    // try{
    //     data.save().then(()=>{
    //     res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    // });
    // }catch(err){
    //     console.log(err);
    // }

    // //console.log(req.body);
    const user=new userdata({
        Username: "user12",
        Password: "pass"
    });
    user.save();

})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
