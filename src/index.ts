import express  from 'express';
import mongoose from 'mongoose';

const dbURL = 'mongodb+srv://chandima:chandima123@cluster0.gtenz.mongodb.net/todoDB?retryWrites=true&w=majority'

const app = express();
app.use(express.json());

//connecting database
mongoose.connect(dbURL)
.then(()=>console.log('connected to the database'))
.catch((err)=>console.log(err))

//DB Schema
const listSchema = new mongoose.Schema({
    title: String,
    isActive: Boolean,
    expireDate: Date
  
  });

const List =  mongoose.model('List', listSchema);  

app.listen(3000, ():void =>{
    console.log('Listing on server..!');
});