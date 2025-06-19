import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SellerService } from '../services/seller.service';
import { query } from 'express';
import { UserAuthComponent } from '../user-auth/user-auth.component';
import { product } from '../data-type';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule,UserAuthComponent],
  providers: [SellerService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName: string = '';
  friend :undefined
  userName:string="";
  cartItems=0;
  constructor(private router: Router,private product:ProductService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        if (this.isLocalStorageAvailable()) {
          const seller = localStorage.getItem('seller');
          if (seller && event.url.includes('seller')) {
            try {
              const sellerData = JSON.parse(seller)[0];
              if (sellerData && sellerData.name) {
                this.sellerName = sellerData.name;
                console.log(this.sellerName);
                console.log('This is seller area');
                this.menuType = 'seller';
              } else {
                console.log('Seller data or name not found');
                this.menuType = 'default';
              }
            } catch (error) {
              console.error('Error parsing seller data', error);
              this.menuType = 'default';
            }
          }else if(localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userData=userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menuType='user';
            this.product.getCartList(userData.id);
        }else {
          console.log('Outside seller area');
          this.menuType = 'default';
        }
        if(localStorage){
          
          let cartData=localStorage.getItem('localCart');
          // console.warn(cartData)
          if(cartData){
            this.cartItems=JSON.parse(cartData).length;
            console.log(this.cartItems)
            // this.product.cartData.subscribe((items)=>{
            //   this.cartItems=items.length
            // })
          }
          this.product.cartData.subscribe((items)=>{
            this.cartItems=items.length
          })
          }
      }
      });  
  }
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  logout(): void {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userlogout():void{
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.product.cartData.emit([]);
  }
}