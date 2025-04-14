import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../GlobalVariable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl:string = BASE_API_URL+'home/';
  constructor(private http:HttpClient) { }

  Register(_User:any){
    return this.http.post<any>(this.baseUrl+'register',_User);
  }
}
