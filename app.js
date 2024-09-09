const express = require('express')
const app = express()
const port = 3000
const mongoose=require("mongoose");
const { addUser, getUsers } = require('./handlers/userHandle');
const userRoutes=require('./routes/userroute');
var cors=require("cors");
app.use(express.json());
app.get('/', (req, res) => {
  res.send('ruuning')
})
app.use(cors());
app.use(userRoutes);
async function connectDb(){
   await mongoose.connect("mongodb://localhost:27017/",{dbName:"UserDb"});
}
app.use(cors());
connectDb().catch((err)=>console.error(err));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})