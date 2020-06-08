const user = require("../modal/user");
const travel_listings = require("../modal/travel_listings");
const reviews = require("../modal/review");
const express = require("express");
const body_parser = require("body-parser");
const multer = require("multer");
const fs = require("fs.promises");

const url_encoded = body_parser.urlencoded({extended: false});
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
const upload = multer({storage: storage});
const ERROR_MSG = "Internal Server Error";

app.use(url_encoded);
app.use(body_parser("json"));

app.get("/users",async(req,res)=>{
    try{
        const results = await user.get_users();
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/users",upload.single("upload"),async(req,res)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const img = req.file.buffer;
        const password = req.body.password;
        const results = await user.add_users(username,email,username, password);
        await fs.writeFile(`./images/${username}.jpg`,img);
        res.status(201).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.get("/users/:id",async(req,res)=>{
    try{
        const results = await user.get_users_by_id(req.params.id);
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.put("/users",upload.single("profile"),async(req,res)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const img = req.file.buffer;
        const password = req.body.password;
        const results = await user.update_users(username,email,username, password);
        await fs.writeFile(`./images/${username}.jpg`,img);
        res.status(204);
    }catch(err){
        console.log(err);
        res.status(422).send("Unprocessable Entity");
    }
})

app.get("/travel",async(req,res)=>{
    try{
        const results = await travel_listings.get_travel_listings();
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/travel",upload.single("upload"),async(req,res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const country = req.body.country;
        const travel_period = req.body.travel_period;
        const image = req.file.buffer;
        
        const results = await travel_listings.add_travel_listings(title,description,image,price,country,travel_period);
        await fs.writeFile(`./images/${username}.png`,img);
        res.status(201).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.delete("/travel/:id/", async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await travel_listings.delete_travel_listing(tid);
        res.status(204).send(null);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.put("/travel/:id/", async(req, res) => {
    try{
        const tid = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const country = req.body.country;
        const travel_period = req.body.travel_period;
        const image = req.file.buffer;
        const result = await travel_listings.update_travel_listing(title, description, image, price, country, travel_period);
        res.status(204).send(null);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.get("/travel/:id/itinerary", async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await travel_listings.get_initinerary(tid);
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/travel/:id/itinerary", async(req, res) => {
    try{
        const tid = req.params.id;
        const day = req.body.day;
        const activity = req.body.activity;
        const result = await travel_listings.create_itinerary(tid, day, activity);
        res.status(201).send(result);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/user/:uid/travel/:tid/review", async(req, res) => {
    try{
        const uid = req.params.uid;
        const tid = req.params.tid;
        const content = req.body.content;
        const rating = req.body.rating;
        const result = await reviews.create_review(uid, tid, content, rating);
        res.status(201).send(result);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.get("/travel/:id/review", async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await reviews.get_review(tid);
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/user/login/", async(req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const result = user.login_user(username, password);
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})


module.exports = app;