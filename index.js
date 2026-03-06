const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

/* MongoDB Atlas Connection */

mongoose.connect("mongodb+srv://sahoopriyabrata:Sahoo%40123@cluster0.l5cbiaz.mongodb.net/test")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));



/* Schema */

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const User = mongoose.model("User", userSchema);



/* GET ALL */

app.get("/users", async (req,res)=>{
    const data = await User.find();
    res.json(data);
});


/* GET BY ID */

app.get("/users/:id", async (req,res)=>{
    const data = await User.findById(req.params.id);
    res.json(data);
});


/* POST */

app.post("/users", async (req,res)=>{
    const user = new User(req.body);
    const saved = await user.save();
    res.json(saved);
});


/* PUT (single replace) */

app.put("/users/:id", async (req,res)=>{
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(updated);
});


/* PUT MULTIPLE */

app.put("/users", async (req,res)=>{
    const result = await User.updateMany(
        req.body.filter,
        req.body.data
    );
    res.json(result);
});


/* PATCH (single update) */

app.patch("/users/:id", async (req,res)=>{
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
    );
    res.json(updated);
});


/* PATCH MULTIPLE */

app.patch("/users", async (req,res)=>{
    const result = await User.updateMany(
        req.body.filter,
        {$set:req.body.update}
    );
    res.json(result);
});


/* DELETE */

app.delete("/users/:id", async (req,res)=>{
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.json(deleted);
});


/* Server */

app.listen(4000, ()=>{
    console.log("Server running on port 4000");
});