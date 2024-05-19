import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-angular-practice',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './angular-practice.component.html',
  styleUrl: './angular-practice.component.css'
})


export class AngularPracticeComponent {
  title='Angular Practice';
  name='Krishna'
  getMax(first:number,second:number){
    return Math.max(first,second)
  }
  clickCount=0;
  clickMe(){
    this.clickCount++;
  }
  movies=[
    {title:"luffy the joy boy",director:"oden sama j",hero:"luffy"},
    {title:"Zoro",director:"oden sama .j",hero:"zoro"}
  ]
  num=0
  toDate=new Date()
}
