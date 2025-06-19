export interface signUp{
    name:String,
    email:String,
    password:String
}

export interface login{
    email:String,
    password:String
}
export interface product{
    name:String,
    price:number,
    category:String,
    description:string,
    image:String,
    id:number,
    quantity:undefined|number,
    productId:undefined|number
}
export interface cart{
    name:String,
    price:number,
    category:String,
    description:string,
    image:String,
    id:number|undefined,
    quantity:undefined|number,
    productId:number,
    userId:number
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
}