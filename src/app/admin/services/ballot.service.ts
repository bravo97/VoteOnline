import { HttpClient } from '@angular/common/http';
import { Injectable, NgProbeToken, OnInit } from '@angular/core';
import { BASE_API_URL } from '../../../GlobalVariable';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BallotService {
  private baseUrl:string = BASE_API_URL+'vande/';
  userID:number = 0;
  constructor(private http: HttpClient,private authS:AuthService) {  
  }
  
   GetVanDe(text:string,pageIndex: number, pageSize:number){
    this.userID = this.authS.getUserID();
    return this.http.get<any>(`${this.baseUrl}get?text=""&pageIndex=${pageIndex}&pageSize=${pageSize}&idaccount=${this.userID}`);
   }

   ThemMoi(data:any){ 
    this.userID = this.authS.getUserID();
    data.mainAccount = "";
    data.idMainAccount = this.userID;
    
    return this.http.post<any>(`${this.baseUrl}add`,data);
   }

   CapNhat(data:any){    
    return this.http.put<any>(`${this.baseUrl}update`,data);
   }

   TaoLink(data:any){
    return this.http.put<any>(`${this.baseUrl}createlink`,data);
   }

   Xoa(data:any){    
    return this.http.delete<any>(`${this.baseUrl}delete`,data);
   }
}
