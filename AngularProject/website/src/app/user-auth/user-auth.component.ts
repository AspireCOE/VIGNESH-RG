import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router, RouterModule } from '@angular/router';  // Correct import
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { cart, login, product, signUp } from '../data-type';
import { warn } from 'node:console';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,RouterModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin = false;
  authError: string = '';
  constructor(private user:UserService , private product:ProductService) { }

  signUp(data: signUp) :void{
    this.user.userSignup(data);
  }

  Login(data: login):void {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError="User not found!"
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }
  localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    let user=localStorage.getItem('user');
    let userId=user&&JSON.parse(user).id;
    if(data){
      let cartDataList:product[]=JSON.parse(data);
      cartDataList.forEach((product:product,index)=>{
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.log("data is stored in DB")
            }
          })
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }
}
