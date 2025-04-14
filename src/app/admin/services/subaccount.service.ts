import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../../GlobalVariable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubaccountService {
  private baseUrl:string = BASE_API_URL+'subaccount/';
  token:number = 1;
  constructor(private http: HttpClient) { }
  
    GetVanDe(text:string,pageIndex: number, pageSize:number){
    return this.http.get<any>(`${this.baseUrl}get?text=""&pageIndex=${pageIndex}&pageSize=${pageSize}&idaccount=${this.token}`);
    }

    GetSubAccount(text:string,pageIndex: number, pageSize:number,idvande:number){
    return this.http.get<any>(`${this.baseUrl}get?text=""&pageIndex=${pageIndex}&pageSize=${pageSize}&idaccount=${this.token}&idvande=${idvande}`);
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
