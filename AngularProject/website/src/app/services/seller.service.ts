import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      console.warn(result)
      if (result) {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
      }
    })
  }
  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&&password=${data.password}`, {
      observe: 'response'}).subscribe((result: any) => {
      if (result && result.body && result.body.length === 1) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
        this.isLoginError.emit(false)
      }else{
        console.warn("login failed");
        this.isLoginError.emit(true)
      }
    })
  }
}
