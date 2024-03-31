console.log('lets start');
function greeting (user:string)
{
    return "welcome "+user;
}
let pep = 'codebin';
console.log(greeting(pep));
console.log("haiii");

// class

class student
{
    id:number;
    name:string;
    constructor(id:number,name:string){
        this.id=id;
        this.name=name;
    }
    display():void{
        console.log("id is "+this.id)
        console.log("name is "+ this.name)
    }
}
let object = new student(42.01,"Vignesh");// this will atomatically call constructor , call implicitly
object.display();

// inheritance

class car{
    color:string;
    constructor(color:string){
        this.color=color;
    }
}
class audi extends car{
    price:number
    constructor(color:string,price:number){
        super(color);
        this.price=price;
    }
    display1():void
    {
        console.log(this.color);
    }
}
let obj1=new car("blue");
let obj2=new audi("blue",9000000);
obj2.display1();

// abstraction

abstract class Animal {
    abstract makeSound(): void;
}
class Dog extends Animal {
    makeSound(): void {
        console.log("Woof");
    }
}
class Cat extends Animal {
    makeSound(): void {
        console.log("Meow");
    }
}
const dog = new Dog();
const cat = new Cat();
dog.makeSound();
cat.makeSound();