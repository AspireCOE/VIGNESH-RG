const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const adminRoutes=require('./routes1/admin')
const path=require('path')
const rootDirectory=require('./routes1/path')

// to use req url and req modules
app.use(bodyParser.urlencoded())
// to provide some file or folder as static file
app.use(express.static(path.join(rootDirectory,'public')))
app.use(adminRoutes)
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDirectory,'routes1','views','error.html'))
})
app.listen(3000)