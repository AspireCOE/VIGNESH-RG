import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  constructor(private product:ProductService){}
  submit(data:product){
    console.log(data)
    this.product.addProduct(data).subscribe((result)=>{
      if(result){
        this.addProductMessage="Product is added successfully";
      }
    });
    setTimeout(()=>{
      this.addProductMessage=undefined;
    },3000)
  }
}
