import { HttpClient } from '@angular/common/http';
import { Injectable, NgProbeToken } from '@angular/core';
import { BASE_API_URL } from '../../../GlobalVariable';

@Injectable({
  providedIn: 'root'
})
export class BallotService {
  private baseUrl:string = BASE_API_URL+'vande/';
  token:number = 1;
  constructor(private http: HttpClient) { }
  
   GetVanDe(text:string,pageIndex: number, pageSize:number){
    return this.http.get<any>(`${this.baseUrl}get?text=""&pageIndex=${pageIndex}&pageSize=${pageSize}&idaccount=${this.token}`);
   }

   ThemMoi(data:any){    
    return this.http.post<any>(`${this.baseUrl}add`,data);
   }

   CapNhat(data:any){    
    return this.http.put<any>(`${this.baseUrl}update`,data);
   }

   Xoa(data:any){    
    return this.http.delete<any>(`${this.baseUrl}delete`,data);
   }
}
