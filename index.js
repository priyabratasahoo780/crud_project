const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

/* MongoDB Atlas Connection */

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sahoopriyabrata:Sahoo%40123@cluster0.l5cbiaz.mongodb.net/test";

mongoose.connect(MONGODB_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));



/* Schema */

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:[2,"Name must be atleast 2 character"]
    },
    email:{
        type:String,
        required:[true,"Email must be there"],
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password must be there"],
        minlength:[6,"Password must be 6 character"],
         match:[
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must include uppercase, lowercase, number, and special character"
    ]
    },
    role:{
        type:String,
        enum:["Student","Mentor","Admin"],
        default:"Mentor"
    }
});

const User = mongoose.model("User", userSchema);



/* GET ALL */

app.get("/users", async (req,res)=>{
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/* GET BY ID */

app.get("/users/:id", async (req,res)=>{
    try {
        const data = await User.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "User not found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/* POST */

app.post("/users", async (req,res)=>{
    const {name,email,password,role} = req.body;
    
    if(!name){
        res.status(404).json({message:"Name is required"});
        return;
    }
    if(!email){
        res.status(404).json({message:"Email is required"});
        return;
    }
     if(!password){
        res.status(404).json({message:"Password is required"});
        return;
    }
    try {
        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/* PUT (single replace) */

app.put("/users/:id", async (req,res)=>{
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/* PUT MULTIPLE */

app.put("/users", async (req,res)=>{
    try {
        const result = await User.updateMany(
            req.body.filter,
            req.body.data,
            { runValidators: true }
        );
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/* PATCH (single update) */

app.patch("/users/:id", async (req,res)=>{
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/* PATCH MULTIPLE */

app.patch("/users", async (req,res)=>{
    try {
        const result = await User.updateMany(
            req.body.filter,
            { $set: req.body.update },
            { runValidators: true }
        );
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/* DELETE */

app.delete("/users/:id", async (req,res)=>{
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/* Server */

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});