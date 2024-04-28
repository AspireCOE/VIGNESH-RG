const { format } = require('date-fns')
const { v4 }=require('uuid')

console.log(format(new Date(), 'ddMMyyyy\tHH:mm:ss'))
console.log(v4())

const logEvents=require('./logEvents')

const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => {
  logEvents(msg);
});
myEmitter.emit('log',"success");