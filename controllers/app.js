const user = require("../model/user");
const travel_listings = require("../model/travel_listings");
const jwt = require("../model/jwt");
const reviews = require("../model/review");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const stream = require("stream");
const path = require("path");
const pipeline = util.promisify(stream.pipeline);
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

app.use(type)
app.use(express.static(path.resolve("./public")))

app.get("/users",async(req,res)=>{
    try{
        const results = await user.get_users();
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/users",async (req,res)=>{
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

app.get("/users/:id",jwt.checkTokenExists,async(req,res)=>{
    try{
        const results = await user.get_users_by_id(req.params.id);
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.put("/users/:id",jwt.checkUserId,async(req,res)=>{
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
        res.status(err.errno==1062?422:500).send(err.errno==1062?"Unprocessable Entity":"Internal Server Error");
    }
})

app.get("/travel",jwt.checkTokenExists,async(req,res)=>{
    try{
        const results = await travel_listings.get_travel_listings();
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/travel",jwt.checkAdmin,async(req,res)=>{
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
        res.type("json").status(201).send(`{"travelid":${results}}`);
    }catch(err){
        console.log(err);
        res.status(500).send(ERROR_MSG);
    }
})

app.delete("/travel/:id/",jwt.checkAdmin, async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await travel_listings.delete_travel_listing(tid);
        res.status(204).send(null);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.put("/travel/:id/",jwt.checkAdmin, async(req, res) => {
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

app.get("/travel/:id/itinerary",jwt.checkTokenExists, async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await travel_listings.get_initinerary(tid);
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/travel/:id/itinerary",jwt.checkAdmin, async(req, res) => {
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

app.post("/user/:uid/travel/:tid/review",jwt.checkUserId, async(req, res) => {
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

app.get("/travel/:id/review",jwt.checkTokenExists, async(req, res) => {
    try{
        const tid = req.params.id;
        const result = await reviews.get_review(tid);
        res.status(200).send(result);
    }catch(err){
        console.log(err)
        res.status(500).send(ERROR_MSG);
    }
})
// bonus feature login
app.post("/user/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const result = await user.login_user(email, password);
        const users = result.user
        const token = await jwt.getToken(user.userid,user.role)
        res.cookie("sessionCookie",token,{httpOnly:true,sameSite:"lax"}).status(200).send(result.message);
    }catch(err){
        console.log(err)
        res.status(500).send(ERROR_MSG);
    }
})

app.post("/user/logout",(req,res) =>{
    console.log("hello")
    res.clearCookie("sessionCookie").status(200).send();
})

module.exports = app;