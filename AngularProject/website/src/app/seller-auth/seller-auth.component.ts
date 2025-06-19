import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { signUp } from '../data-type';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule,RouterModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  showLogin=false;
  authError:String=''
  constructor(private seller: SellerService, private router: Router) { }
  signUp(data: signUp): void {
    console.log(data);
    this.seller.userSignUp(data)
  }
  Login(data: signUp): void {
    console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is incorrect"
      }
    })
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }
}
