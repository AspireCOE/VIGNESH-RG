import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { user } from './user';

@Component({
  selector: 'app-template-driven-forms',
  standalone: true,
  imports: [FormsModule,NgFor,CommonModule],
  templateUrl: './template-driven-forms.component.html',
  styleUrl: './template-driven-forms.component.css'
})
export class TemplateDrivenFormsComponent {
  countryList:Country[]=[
    new Country('1','India'),
    new Country('2','Italy'),
    new Country('3','France')

  ]
  userModel=new user("",'lucci',"rl@gmail.com");

  onsubmit(){
    console.log(this.userModel);
  }
}
class Country{
  id:String;
  name:String;

  constructor(id:String,name:String){
    this.id=id;
    this.name=name;
    console.log("Hii")
  }
}