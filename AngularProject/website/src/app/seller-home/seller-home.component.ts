import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined|product[];
  productMessage:undefined|string;
  icon=faTrash;
  iconEdit=faEdit
  constructor(private product:ProductService){}
  ngOnInit():void{
    this.list()
  }
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="product is deleted"
        this.list()
      }
    })
  setTimeout(() => {
    this.productMessage=undefined
  },3000);
}
list(){
  this.product.productList().subscribe((result)=>{
    if(result){
      this.productList=result;
    }
  })
}
}
