
const { format } = require('date-fns')
const { v4 }=require('uuid')
const fs=require('fs')
const fsPromises=require('fs').promises
const path= require('path')
const { MessagePort } = require('worker_threads')

const logEvents =async(message)=>{
    const datetime= `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`
    const logItem=`${datetime}\t${v4()}\t${message}\n`
    console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname,'log'))){
            fsPromises.mkdir(path.join(__dirname,'log'))
        }
        await fsPromises.appendFile(path.join(__dirname,'log','logs.txt'),logItem)
    }
    catch(err){
        console.error(err)
    }
}
module.exports=logEvents