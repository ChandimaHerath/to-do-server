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

//get all data
app.get('/', (req,res)=>{
    const getAll  = new Promise( (resolve,reject)=>{

      try
      { 
         const lists =List.find();
         resolve(lists);
      }
    
      catch(err)
      {
         reject(err);
      }    
      
     });
  
    getAll
    .then(lists=>res.send(lists))
    .catch(err=>console.log(err));
});



//listning to the server
app.listen(3000, ():void =>{
    console.log('Listing on server..!');
});