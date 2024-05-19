import { Component } from '@angular/core';
import { bank } from './bank.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent {
  acctype:String="Savings";
  getStatus(amount: number): string {
    if (amount > 10000) {
      return 'loyal';
    } else if (amount >= 1000 && amount <= 10000) {
      return 'active';
    } else if (amount >= 500 && amount < 1000) {
      return 'inactive';
    } else {
      return 'unknown';
    }
  }
  
  AccountDetail:bank[]=[
    {AccountNumber:24359809014567,AccountHolderName:"Krishna", TypeOfAccount:"savings",Amount:4000,AccountCreatedDate:new Date(),BankName:"canara"},
    {AccountNumber:25759809014567,AccountHolderName:"Guru", TypeOfAccount:"salary",Amount:8000,AccountCreatedDate:new Date(),BankName:"statebank"},
    {AccountNumber:24359878014567,AccountHolderName:"Prakash", TypeOfAccount:"savings",Amount:9000,AccountCreatedDate:new Date(),BankName:"indian overseas"},
    {AccountNumber:24359809004567,AccountHolderName:"Sundhar", TypeOfAccount:"business",Amount:4500,AccountCreatedDate:new Date(),BankName:"bank of Baroda"},
    {AccountNumber:24679809014567,AccountHolderName:"Dharsan", TypeOfAccount:"business",Amount:3000,AccountCreatedDate:new Date(),BankName:"Reserve bank"},
    {AccountNumber:24359809019057,AccountHolderName:"Surendar", TypeOfAccount:"salary",Amount:6000,AccountCreatedDate:new Date(),BankName:"canara"},
  ]
}