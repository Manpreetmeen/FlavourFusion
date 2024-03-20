const express = require('express');
require("./mongooseConfig");
const users = require("./mongooseModel")


const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

app.post("/register",async (req, res)=> {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result)
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    if(req.body.password && req.body.email){
            let data = await users.findOne(req.body).select("-password");
            if(data){
                    res.send(data)
            } else {
                    res.send("No User Found")
            }
    }
    else{
            res.send("No User Found")
    }
})

app.listen(4300)