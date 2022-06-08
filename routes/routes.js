const express = require('express');
const router = express.Router();
const data = require('../app')

router.get('/', (req, res)=>{
    res.send(data)
})

module.exports=router