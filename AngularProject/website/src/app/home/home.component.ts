import { Component, Directive, NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init';
import { CommonModule } from '@angular/common';
import { ClientRequest } from 'http';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule,RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendyProduct:undefined|product[];
  allProduct:undefined|product[];
  constructor(private product:ProductService){}
  ngOnInit():void{
    
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProduct=data;
    })
    this.product.allProducts().subscribe((result)=>{
      this.allProduct=result;
    })
  }
}
