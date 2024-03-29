// inner function 
function innerfunction1(firstname,lastname){
    function joint(name3,name4){
        const add=name3+" "+name4;
        return add;
    }
    var fullname=joint(firstname,lastname);
    return fullname;
}
let getfullname=innerfunction1("vignesh","rg")
console.log(getfullname);

// anonymous function

var anonymousfunction=function(firstname,lastname){
    return [firstname,lastname];
}
var fullname=anonymousfunction("vignesh","rg");
console.log(fullname);

// arrow function 

const arrowfunction =(firstname,lastname)=>{
    return firstname
}
console.log(arrowfunction("vignesh","rg"));

// this keyword

let print = function(){
    this.name1='Vignesh'
    this.print1 = function(){
        console.log('hi')
    }
    //console.log(print1())
}
const test = new print()
console.log(test.name1)
var a=(test.print1())

