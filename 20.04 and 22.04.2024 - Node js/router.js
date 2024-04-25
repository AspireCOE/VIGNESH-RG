const fs=require('fs')

const requestHandler=(req,res)=>{
const url=req.url;
    if(url==='/'){
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<header><title>Enter form</title></header>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="send"></form></body>')
    res.write('</html>')
    return res.end();
    }
    if(url=='/message' && req.method == 'POST'){

        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk)
            //console.log(chunk)
        })
        req.on("end",()=>{
            const parseBody=Buffer.concat(body).toString()
            const msg=parseBody.split('=');
            fs.writeFileSync('hlo.txt',msg[1]);
            console.log(msg[0]);
        })
        fs.writeFileSync('hello.txt','HII');
        res.setHeader('Location','/')
        res.statusCode=302;
        return res.end();
    }
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<header><title>Node Js practice</title></header>');
    res.write('<body><h1>HII</h1></body>')
    res.write('</html>')
    res.end();
};
module.exports=requestHandler