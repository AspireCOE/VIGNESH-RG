const fs=require('fs');
const path=require('path');
const rs=fs.createReadStream(path.join(__dirname,'start2.txt'),{encoding: 'utf8'})
const ws=fs.createWriteStream(path.join(__dirname,'files1.txt'));

/*rs.on('data',(dataChunks)=>{
    ws.write(dataChunks);
})*/

rs.pipe(ws);