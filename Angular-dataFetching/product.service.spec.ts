import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productdet ,CUSTOM_ELEMENTS_SCHEMA',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdet.component.html',
  styleUrl: './productdet.component.css'
})
export class ProductdetComponent {
productdata:any

constructor(private service:ProductService){}
ngOnInit(){
  this.service.getAllProducts().subscribe((data)=>{
  
  this.productdata=data;
  })
}
}