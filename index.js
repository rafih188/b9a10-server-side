const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middware 
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('server is running perfectly')
});

app.listen(port,(req,res)=>{
   console.log(`server is running in the port ${port}`)
})