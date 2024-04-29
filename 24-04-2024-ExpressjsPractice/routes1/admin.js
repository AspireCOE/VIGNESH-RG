const express=require('express')
const path=require('path')
const router=express.Router()

router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','add-product.html'))
    console.log("1")
})

router.post('/add-product',(req,res,next)=>{
    console.log('form-data:',req.body)
    res.send('<h2>Product Recieved</h2>')
})

module.exports=router