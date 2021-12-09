import express  from 'express';
import mongoose from 'mongoose';

const cors = require('cors');


const dbURL = 'mongodb+srv://chandima:chandima123@cluster0.gtenz.mongodb.net/todoDB?retryWrites=true&w=majority'

const app = express();
app.use(express.json());
app.use(cors());

//connecting database
mongoose.connect(dbURL)
.then(()=>console.log('connected to the database'))
.catch((err)=>console.log(err))

//DB Schema
const listSchema = new mongoose.Schema({
    title: String,
    id: Number,
    expireDate: Number,
    createdDate:Number,
    isCompleted:Boolean
  
  });

const List =  mongoose.model('List', listSchema);  

//get all data
app.get('/', async (req,res)=>{

  try
  { 
    const lists = await List.find();
    res.send(lists);
  }
  
  catch(err)
  {
    res.set(404).send(err);
  }  
       
  });
  
   
//post item
app.post('/post', async (req,res)=>{
   
    if(!req.body.title){

       res.status(400).send('To-do title and Date Required..!');
       return;
    }  
    
   try
    { 
      const list = new List({
      title : req.body.title,
      id:req.body.id,
      createdDate:req.body.createdDate,
      expireDate: req.body.expireDate,
      isCompleted: false
    
      });

      const item = await list.save();
      res.send(item);
    }
 
   catch(err)
    {
      res.status(404).send(err);
    }        
     
  });

//delete item
app.delete('/del/:id', async(req,res)=>{
    
      try
      {   
          const id =req.params.id;
          const item = await List.deleteOne({id:id});
          res.send(item);
      }
     
      catch(err)
      {
          res.status(404).send(err);
      }    

    });

     

//update the complete property
app.patch('/put/:id', async (req,res)=>{

    try
    {   
        const id =req.params.id;
        const item = await List.findOneAndUpdate({id:id},{isCompleted:true})
        res.send(item);
        
    }
      
    catch(err)
    
    {
       res.status(404).send(err);

    }    
    
  });



//listning to the server
app.listen(3000, ():void =>{
    console.log('Listing on server..!');
}); 