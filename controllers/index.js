const user = require("../modal/user");
const travel_listings = require("../modal/travel_listings");
const express = require("express");
const body_parser = require("body-parser");
const multer = require("multer");
const fs = require("fs/promises");

const url_encoded = body_parser.urlencoded({extended=false});
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
const upload = storage

app.use(url_encoded);
app.use(body_parser("json"));

app.get("/users",async(req,res)=>{
    try{
        const results = await user.get_users();
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/users",upload.single("upload"),async(req,res)=>{
    try{
        const username = req.body.username;
        const email = req.body.username;
        const img = req.file.buffer;
        const results = await user.add_users(username,email,username);
        await fs.writeFile(`./images/${username}.png`,img);
        res.status(201).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/users/:id",async(req,res)=>{
    try{
        const results = await user.get_users_by_id(req.params.id);
        res.status(200).send(results);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.put("/users",upload.single(profile),async(req,res)=>{
    try{
        const username = req.body.username;
        const email = req.body.username;
        const img = req.file.buffer;
        const results = await user.update_users(username,email,username);
        await fs.writeFile(`./images/${username}.png`,img);
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
        res.status(500).send("Internal Server Error");
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
        res.status(500).send("Internal Server Error");
    }
})

module.exports = app;