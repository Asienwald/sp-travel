const user = require("../modal/user");
const travel_listings = require("../modal/travel_listings");
const reviews = require("../modal/review");
const express = require("express");
const body_parser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);
const readFile = util.promisify(fs.readFile);
const url_encoded = body_parser.urlencoded({extended: false});
const app = express();
   
const upload = multer({dest: `upload/`,limits:{fileSize:1048576}});
const ERROR_MSG = "Internal Server Error";
const type = upload.single("upload");
const profile_pic_url = `./images/`
const travel_url = `./travel/`
const transfer = async (src,dest)=>{
    await pipeline(
        fs.createReadStream(src),
        fs.createWriteStream(dest)
    ).then(
        fs.unlink(src,()=>{})
    );
}
const readBuffer = async(src)=>{
    return await readFile(src).then(fs.unlink(src,()=>{}));
}
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

app.post("/users",type,async (req,res)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const src = req.file.path;
        const dest = `${profile_pic_url}${username}.jpg`;
        await transfer(src,dest);
        const results = await user.add_users(username,email,username, password);
        res.type("json").status(201).send(`{"userid":${results}}`);
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

app.put("/users/:id",type,async(req,res)=>{
    try{
        const userid = req.params.id;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const src = req.file.path;
        const dest = `${profile_pic_url}${username}.jpg`;
        await transfer(src,dest);
        const results = await user.update_users(userid,username,email,username, password);
        res.status(204).send();
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

app.post("/travel",type,async(req,res)=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const country = req.body.country;
        const travel_period = req.body.travel_period;
        const src = req.file.path;
        const dest = `${Date.now()}.jpg`;
        await transfer(src,`${travel_url}${dest}`);
        const results = await travel_listings.add_travel_listings(title,description,dest,price,country,travel_period);
        res.type(status).status(201).send(`{"travelid":${results}}`);
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

app.put("/travel/:id/",type, async(req, res) => {
    try{
        const tid = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const country = req.body.country;
        const travel_period = req.body.travel_period;
        const src = req.file.path;
        const dest = `${Date.now()}.jpg`;
        await transfer(src,`${travel_url}${dest}`);
        const result = await travel_listings.update_travel_listing(title, description, dest, price, country, travel_period,tid);
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
        res.status(201).send(`{"itineraryid":${result}}`);
    }catch(err){
        console.log(err)
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
        res.status(201).send(`{"reviewid":${result}}`);
    }catch(err){
        console.log(err)
        res.status(500).send(ERROR_MSG);
    }
})

app.get("/travel/:id/review", async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await reviews.get_review(tid);
        res.status(200).send(result);
    }catch(err){
        console.log(err)
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/user/login/", async(req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const result = await user.login_user(username, password);
        res.status(200).send(result);
    }catch(err){
        console.log(err)
        res.status(500).send(ERROR_MSG);
    }
})


module.exports = app;