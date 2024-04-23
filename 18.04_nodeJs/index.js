const { format } = require('date-fns')
const { v4 }=require('uuid')

console.log(format(new Date(), 'ddMMyyyy\tHH:mm:ss'))
console.log(v4())