const fs=require('fs').promises;
const path=require('path');
const files= async()=>{
    try{
        const data=await fs.mkdir('./new')
        console.log('Directory created')
        await fs.rmdir('./new')
        console.log('directory deleted')
    }
    catch(err){
        console.error(err);
    }
}
files()
console.log("nodemon testing");
