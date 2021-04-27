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

var global_username = ''

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
    console.log("GET /login called");
    res.status(200).sendFile('../client/static/login.html',{root: __dirname})
});

app.post("/login", async(req, res)=>{
    console.log("POST /login called");
    const {username, password} = req.body
    global_username = username;
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
        console.log('user: ' + username + ' logged in')
        return res.json({status: 'ok', data:token})
    }
    res.json({status: 'Error', error: 'WHAT?'})
})

app.post("/logout", async(req,res) => {
    
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

var global_grand_total = '';


app.post("/send_data", async (req, res) => {
    console.log("/send_data API fetched ")

    if(req.body.var1 == '' || req.body.var1 == null)
        console.log('---!Name is required.')
    else if(req.body.var1.length >= 50)
        console.log('---!Name needs to be below 50 characters.')
    else{
        var Full_Name1 = req.body.var1
        save_name = Full_Name1
    }

    if(req.body.var2 == '' || req.body.var2 == null)
        console.log('---!Address is required.')
    else if(req.body.var2.length >= 100)
        console.log('---!Address needs to be below 100 characters.')
    else{
        var street = req.body.var2
        save_Address_1 = street
    }

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

    console.log(req.body);

    const SaveMongo = new ProfileManagement({
        Username: global_username,
        FullName: save_name,
        Address1: save_Address_1,
        Address2: save_Address_2,
        City: save_City,
        State: save_State,
        Zipcode: save_Zipcode
    });

    ProfileManagement.deleteMany({ Username: global_username }).then(function(){
        // Success
        console.log(`${global_username}'s previous addresses deleted`); 
    }).catch(function(error){
        // Failure
        console.log(error); 
    });

    SaveMongo.save()
        .then((result)=>{
            res.redirect('/saveconfirmation')
        })
        .catch((err)=>{
            console.log(err);
        });


    res.json({status: 'ok'})
})



let registerinfo = '';
var username2
var password2
var confirm1

//Handle user registration
app.post("/register", async(req,res) =>{
    console.log("register user")
    const { username, password: plainTextPassword} = req.body
    global_username = username;

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
    console.log('user: ' + username + ' logged in')
    res.json({status:'ok'})
})


app.get('/getUserAddress', async(req, res) => {
    console.log("/getUserAddress called");
    const address_data = {
        name: save_name,
        add_1: save_Address_1,
        add_2: save_Address_2,
        city: save_City,
        state: save_State,
        zipcode: save_Zipcode,
    }
    res.send(address_data);
})

app.post('/getQuote', async(req, res) => {
    //connecting to db
    const client = new MongoClient(uri);

    //calculting price
    const current_price = 1.5;
    const company_factor = 0.1;

    //check if user has requested quote before
    var historyExists = false;
    var rate_history_factor = 0;
    try {
        await client.connect();
        const database = client.db("SoftwareDesign");
        const collection = database.collection("fuel_quote_form_history");
        // create a document to be inserted
        collection.find({Username: global_username}).toArray(function(err, result) {
            if (err) throw err;
            if (result != []) historyExists = true;
          });
      } finally {
        await client.close();
      }
      if (historyExists) rate_history_factor = 0.1;

    //check if user is in state or out of state
    var location_factor;
    if (req.body.sate_input == 'TX') location_factor = 0.02;
    else location_factor = 0.04;

    //check how much gallons user is requesting

    var gallons_factor;
    if (req.body.gallon_input > 1000) gallons_factor = 0.02;
    else gallons_factor = 0.03;

    console.log(typeof req.body.gallon_input);
    
    //calculating the margin
    const margin = current_price * (location_factor - rate_history_factor + gallons_factor + company_factor);
    const suggested_price_per_gallon = current_price + margin;
    const tax_total = suggested_price_per_gallon * parseInt(req.body.gallon_input) * location_factor;
    const subtotal = suggested_price_per_gallon * parseInt(req.body.gallon_input);
    const grand_total = subtotal + tax_total;
    global_grand_total = grand_total;

    //sending the price calculations to frontend
    res.send({
        suggested_price: suggested_price_per_gallon, 
        tax: tax_total,
        subtotal: subtotal,
        grand_total: grand_total
    });
})

app.post('/handleFuelQuoteForm', async(req, res) => {
    const client = new MongoClient(uri);

    console.log(req.body);
    
    var datetime = new Date();

    //saving data to send to mongo in an object
    const fuel_quote_data = {
        Username: global_username,
        fuel_quote_gallons: req.body.gallon_input,
        fuel_quote_date: datetime,
        deliver_date: req.body.delivery_date_input,
        city_input: req.body.city_input,
        price: global_grand_total
    }

    var data_to_send = [];

    try {
        await client.connect();
        const database = client.db("SoftwareDesign");
        const collection = database.collection("fuel_quote_form_history");
        // create a document to be inserted
        const result = await collection.insertOne(fuel_quote_data);
        console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
        collection.find({Username: global_username}).toArray(function(err, result) {
            if (err) throw err;

            console.log("result");
            console.log(result);

            for (var i = 0; i < result.length; i++){
                const obj_to_append = {
                    gallons: result[i].fuel_quote_gallons,
                    delivery_date: result[i].fuel_quote_date,
                    delivery_city: result[i].city_input,
                    price: result[i].price
                }
                data_to_send.push(obj_to_append)
            }
          });
      } finally {
        await client.close();
      }

      console.log("data sending from /handleFuelQuoteForm");
      console.log(data_to_send);

      res.send(data_to_send);
})
