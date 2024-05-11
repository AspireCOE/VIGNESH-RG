const express=require('express')
const app=express();
const expressHandlerBars=require('express-handlebars');// to use temple enginees
const bodyPraser=require('body-parser');// to handle data in json format
const mySql=require('mysql')
require('dotenv').config(); // to use a const value inside the project

const port=3000;

app.use(bodyPraser.urlencoded({extended:false}));
app.use(bodyPraser.json())
app.use(express.static("public"));
// template enginee
const handlebars= expressHandlerBars.create({extname:".hbs"})
app.engine('hbs',handlebars.engine)
app.set('view engine',"hbs")

//mysql
const con =mySql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

const renderView=view=((req,res)=>{
    con.getConnection((err,connection)=>{
        if (err) throw err;
        connection.query("select * from users",(error,rows)=>{
        connection.release();
            if(!error){
                res.render("home",{rows});
                console.log(rows)
            }
            else{
                console.log(error)
            }
        })
        console.log("Connected!");
      });
});
app.get("/",renderView);

app.listen(port,()=>{
    console.log("Listening port: "+port);
})