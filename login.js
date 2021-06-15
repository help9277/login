const express = require('express');
const mongoose = require('mongoose');
const Data = require('./module/emailschema');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
const dbUri = 'mongodb+srv://<username>:<password>@cluster0.4yhpu.mongodb.net/Node-data?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
console.log('connected to db');
})
.catch((err)=>{
console.log(err);
})
app.set('view engine', 'ejs');



app.get('/login', async (req,res)=>{
    const {email, password}= req.body;
   const check= await Data.findOne({email})
   if(check){
     if(check.password===password)
     res.redirect('/home');
     else{
      res.send('email and password mismatch');
         }
   }
   else{
res.send('email and password mismatch');
   }
    });