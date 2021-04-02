const express = require("express");
// const { body } = require("express-validator");
const fetch = require("node-fetch")
const ProfileManagement = require('../client/models/userinfo')
const UserCreds = require('../client/models/user')

const mongoose = require('mongoose')

const { MongoClient } = require('mongodb')

// const MongoClient = require('mongodb');
//const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
//const User = require("../client/models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//const connectoMongo = require("../client/config/db");

const uri = 'mongodb+srv://jhdo4:Dumdum308605@softwaredesign.amobl.mongodb.net/SoftwareDesign?retryWrites=true&w=majority';
// const client = new MongoClient.EventEmitter(uri);

//const client = new MongoClient(uri);
//mongoose.connect(uri);

const JWT_SECRET = 'cosc4353-justin-shuba-van-chakara'
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})

/*
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log("connected to db"))
.catch((err) => console.log(err));
*/


app = express();
port = process.env.PORT || 5000;
cors = require("cors");

const CONFIG = require('../config.json')

const { body, validationResult, check } = require('express-validator');
const { db } = require("../client/models/userinfo");

app.use(cors());
app.use(express.json())


app.use(express.urlencoded({
    extended: true
}))
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(require("express-session")({
    secret: "COSC4353",
    resave: false,
    saveUninitialized: false
}))

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
//app.set('view enginine','ejs')


//app.use(passport.initialize());
//app.use(passport.session());

app.get("/", function(req,res){
    res.sendFile(__dirname + '/index.html');
})
app.get("/index", function(req,res){
    res.render('client/index');
})
//app.use(express.static(path.join(__dirname, '/static')));

let userinfo = '';
var username1
var password1

//Login Routes
app.get("/login", (req, res)=>{
    res.sendFile('../client/static/login.html',{root: __dirname})
});

app.post("/login", async(req, res)=>{
    const {username, password} = req.body
    const userlogin = await UserCreds.findOne({username}).lean()

    if(!userlogin){
        return res.json({status: 'Error logging in', error: 'Invalid username/password'})
    }
    if(await bcrypt.compare(password, userlogin.password)){
        const token = jwt.sign({
            id: userlogin._id,
            username: userlogin.username
        },
        JWT_SECRET)
        return res.json({status: 'ok', data:token})
    }
    res.json({status: 'Error', error: 'WHAT?'})
})

app.get("/saveconfirmation",(req,res)=>{
    // res.send({message: "Profile saved! Please return and check your homepage!"})
    res.end();
})

app.post("/printCounter", async (req, res) => {
    try{
        console.log(req.body.count);
    } catch(err){
        console.log(err.message);
    }
})

let data_to_send = '';


/*
app.use(bodyparser.json()) 
app.use(bodyparser.urlencoded({extended:true})) 
*/

var save_name
var save_Address_1
var save_Address_2
var save_City
var save_State
var save_Zipcode


app.post("/send_data", async (req, res) => {

    console.log("api fetched")
    //console.log("Using Body - parser", req.body.var2)
    if(req.body.var1 == '' || req.body.var1 == null)
        console.log('---!Name is required.')
           
    else if(req.body.var1.length >= 50)
        console.log('---!Name needs to be below 50 characters.')
    
    else{
        var Full_Name1 = req.body.var1
        save_name = Full_Name1
    }
    /*
    const Full_Name1 = req.body.var1
    const save_name = Full_Name1
    
*/

    if(req.body.var2 == '' || req.body.var2 == null)
        console.log('---!Address is required.')
    else if(req.body.var2.length >= 100)
        console.log('---!Address needs to be below 100 characters.')
      
    else{
        var street = req.body.var2
        save_Address_1 = street
    }
    /*
    const street = req.body.var2
    const save_Address_1 = street
*/

    if(req.body.var3.length >= 100)
        console.log('---!Address needs to be below 100 characters.')
      
    else{
        var street2 = req.body.var3
        save_Address_2 = street2
    }

    if(req.body.var4 == '' || req.body.var4 == null){
        console.log('---!City is required.')
      }

    else if(req.body.var4.length >= 100)
        console.log('---!City needs to be below 100 characters.')

    else{
        var city = req.body.var4
        save_City = city
    }
/*
    const city = req.body.var4
    const save_City = city
*/
    var state = req.body.var5
    save_State = state

    if(req.body.var6 == '' || req.body.var6 == null){
        console.log('---!Zipcode is required.')
      }
    
    else if(req.body.var6.length != 5){
        console.log('---!5 character zipcode required.')
      }
    else{
        var zipcode = req.body.var6
        save_Zipcode = zipcode
    }
    

    console.log('Full Name: ' + Full_Name1)
    console.log('street1: ' + street)
    console.log('street2: ' + street2)
    console.log('city: ' + city)
    console.log('state: ' + state)
    console.log('zipcode: ' + zipcode)

    const fuel_quote_data = req.body

    res.json(data_to_send)
})



let registerinfo = '';
var username2
var password2
var confirm1

//Handle user registration
app.post("/register", async(req,res) =>{
    console.log("register user")
    const { username, password: plainTextPassword} = req.body
    //console.log('Confirm password: ' + cf)
    //const { username, password: plainTextPassword, confirm } = req.body

    if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 6) {
		return res.json({
			status: 'error',
			error: 'Password needs to be atleast 6 characters'
		})
	}
    //res.json(registerinfo)
    mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err));
    const password = await bcrypt.hash(plainTextPassword,10)
    try{
        const result = await UserCreds.create({
            username, password
        })
        console.log('User created successfully: ', result)
    }catch(err){
        if(err.code === 11000){
            return res.json({status:'Error', error:'Username is already in the system'})
        }
        throw err
    }
    res.json({status:'ok'})
   
   /*     
    const SaveUserinfo = new UserCreds({
            username: usernamee,
            password: passwordd
        });
    SaveUserinfo.save().then((result)=>{
            res.redirect('/')
            
            //res.sendFile('../client/static/Profile_Management_Form.html',{root: __dirname})
        }).catch((err)=>{
            console.log(err);
        })   */
})


app.get('/getUserAddress', async(req, res) => {
    const address_data = {
        name: save_name,
        add_1: save_Address_1,
        add_2: save_Address_2,
        city: save_City,
        state: save_State,
        zipcode: save_Zipcode,
    }
    res.send(address_data)
})

app.post('/handleFuelQuoteForm', async(req, res) => {
    const client = new MongoClient(uri);
    const fuel_quote_data = req.body;
    var data_to_send;
    try {
        await client.connect();
        const database = client.db("SoftwareDesign");
        const collection = database.collection("fuel_quote_form_history");
        // create a document to be inserted
        const result = await collection.insertOne(fuel_quote_data);
        console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
        collection.find({}).toArray(function(err, result) {
            if (err) throw err;
            data_to_send = result;
          });
        
      } finally {
        await client.close();
      }

      res.send(data_to_send);
})

app.get('/sendmongo', async(req, res) => {
    /*
    console.
    fuel_quote_data = req.body
    
    */
    console.log("/sendmongo call successful")
    console.log(save_name)

    const SaveMongo = new ProfileManagement({
        FullName: save_name,
        Address1: save_Address_1,
        Address2: save_Address_2,
        City: save_City,
        State: save_State,
        Zipcode: save_Zipcode
    });
    
    SaveMongo.save()
        .then((result)=>{
            res.redirect('/saveconfirmation')
        })
        .catch((err)=>{
            console.log(err);
        });
})

