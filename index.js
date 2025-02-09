const data = require('./dumpDB')
const express = require('express');
const app = express();
const PORT = 3001

app.use(express.json());
app.get('/',async(req,res)=>{
    res.status(200).json(data);
})

app.post('/order/',async(req,res)=>{
    
})

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})
