import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Console } from 'console';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule,NgClass,FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData:undefined|product;
  productMessage:undefined|string;
  constructor(private route:ActivatedRoute,private product:ProductService){}
  ngOnInit():void{
    let productId=this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      // console.log(data);
      this.productData=data;
    })

  }
  submit(data:any){
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product Updated!"
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined;
    },3000);
  }
}
