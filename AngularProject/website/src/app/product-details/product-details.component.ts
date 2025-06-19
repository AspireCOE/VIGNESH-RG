import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { product, cart } from '../data-type';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private product: ProductService, private route: ActivatedRoute) { }
  productDetail: undefined | product;
  productQuantity: number = 1;
  removeCart=false;
  cartData:product|undefined;

  ngOnInit(): void {
    let ProductId = this.route.snapshot.paramMap.get('productId');
    if (ProductId) {
      this.product.productDetails(ProductId).subscribe((data) => {
        this.productDetail = data;
        if (this.isLocalStorageAvailable()) {
          let cartData = localStorage.getItem('localCart');
          // console.warn(cartData)
          if (cartData && ProductId) {
            let items = JSON.parse(cartData);
            items = items.filter((item:product)=>this.isValidId(item.id) && ProductId === item.id.toString());
            console.warn("items", items);
            if(items.length){
              this.removeCart=true;
            }
            else{
              this.removeCart=false;
            }
          }
        }
        let user=localStorage.getItem('user');
        if(user){
          let userId=user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result)=>{
            let item=result.filter((item:product)=>ProductId?.toString()===item.productId?.toString())
            if(item.length){
              this.cartData=item[0];
              this.removeCart=true;
            }
          })
        }
      });
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productDetail) {
      this.productDetail.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productDetail);
        this.removeCart=true;
      }
      else{
        // console.warn("user is logged in!")
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        let cartData:cart={
          ...this.productDetail,
          productId:this.productDetail.id,
          userId
        }
        delete cartData.id;
        // console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true;
          }
        })
      }
    }
  }
  removeToCart(productId:number|undefined){
    if(productId && !localStorage.getItem('user')){
    this.product.removeItemFromCart(productId);
    this.removeCart=false;
    }
    else{
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        this.product.getCartList(userId);
      })
      this.removeCart=false;
    }
  }
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  private isValidId(id: any): boolean {
    return id !== undefined && id !== null && (typeof id === 'string' || typeof id === 'number');
  }
}
