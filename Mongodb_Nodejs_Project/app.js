const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const expressHandlebars=require('express-handlebars')
const getData=require('./db');
//const { set } = require('mongoose');
const objectID=getData.objectID;

app.engine('hbs',expressHandlebars.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',async (req,res)=>{
    let database=await getData.getDatabase();
    const collection=database.collection('books');
    const cursor=collection.find({});
    let employee =await cursor.toArray();
    //console.log(employee)

    let message=''
    let edit_id,edit_book;

    if(req.query.edit_id){
        edit_id=req.query.edit_id;
        edit_book=await collection.findOne({_id:new objectID(edit_id)})
    }
    if(req.query.delete_id){
        await collection.deleteOne({_id:new objectID(req.query.delete_id)})
        return res.redirect('/?status=3');
    }
    //req.query.status- gives the value of status
    switch (req.query.status) {
        case '1':
            message=("Inserted succesfully")
            break;
        case '2':
            message="updated successfully"
            break;
            case '2':
            message="Deleted successfully"
            break;
        default:
            break;
    }


    res.render('main',{message,employee,edit_book,edit_id})
})
app.post('/store_book', async (req,res)=>{
    let database=await getData.getDatabase();
    const collection=database.collection('books');
    const book={title:req.body.title, author:req.body.author}
    await collection.insertOne(book);
    return res.redirect('/?status=1')
})

app.post('/update_book/:edit_id', async (req,res)=>{
    let database=await getData.getDatabase();
    const collection=database.collection('books');
    const book={title:req.body.title, author:req.body.author}
    let edit_idd=req.params.edit_id
    await collection.updateOne({_id:new objectID(edit_idd)},{$set:book});
    return res.redirect('/?status=2')
})

app.listen(8000,()=>{
    console.log("listening to 8000")
})