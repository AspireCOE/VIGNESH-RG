export class bank{
    AccountNumber:number;
    AccountHolderName:String;
    TypeOfAccount:String;
    Amount:number;
    AccountCreatedDate:Date;
    BankName: String;
    constructor(AccountNumber:number, AccountHolderName:String, TypeOfAccount:String,Amount:number,AccountCreatedDate:Date,BankName:String){
        this.AccountNumber=AccountNumber;
        this.AccountHolderName= AccountHolderName;
        this.TypeOfAccount=TypeOfAccount;
        this.Amount=Amount;
        this.AccountCreatedDate=AccountCreatedDate;
        this.BankName=BankName;
    }
}