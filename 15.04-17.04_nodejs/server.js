/*console.log("Hi")
//console.log(global)

const os=require('os')
console.log(os.type());
console.log(os.version())
//console.log(os.homedir)
const path=require('path')

console.log(__dirname);
//

console.log(path.dirname(__filename))
console.log(path.parse(__filename))

const math1= require('./math')
console.log(math1.add(8,3))*/

// file system
/*
const fs= require('fs');
const path=require('path');

fs.readFile(path.join(__dirname,'start.txt'), (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

fs.writeFile(path.join(__dirname,'start1.txt'),'practice at 18th april',(err, data) => {
    if (err) throw err;
    console.log('write complete');
    fs.appendFile(path.join(__dirname,'start1.txt'),'\n\n and also practice at 19th april',(err, data) => {
        if (err) throw err;
        console.log('append complete');
        fs.rename(path.join(__dirname,'start1.txt'),path.join(__dirname,'end.txt'),(err, data) => {
            if (err) throw err;
            console.log('rename complete');
        });
    });
});

process.on('uncaughtException',err=>{
    console.error(`there was an uncaught error: ${err}`)
    process.exit(1);
})
*/
// async()

const fsPromises=require('fs').promises
const path=require('path');
const fileOp=async()=>{
    try{
        const data=await fsPromises.readFile(path.join(__dirname,'start.txt'))
        console.log(data.toString());
        await fsPromises.writeFile(path.join(__dirname,'start1.txt'),'Practice node js and express js')
        console.log('write complete');
    }
    catch(err){
        console.error(err)
    }
}
fileOp();









server.listen(5000,()=>{
    console.log("express server is waiting for client connections")
})
