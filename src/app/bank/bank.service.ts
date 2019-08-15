import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankDetail } from './bank.component';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  getBankDetails(city:string){
   
    return this.http.get<BankDetail[]>('https://vast-shore-74260.herokuapp.com/banks?city='+city);
  }
}
