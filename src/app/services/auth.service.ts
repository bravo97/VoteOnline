import { Injectable, NgProbeToken } from '@angular/core';
import { BASE_API_URL } from '../../GlobalVariable';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = BASE_API_URL+'Users/';
  constructor(private http:HttpClient) { }
  
  Register(_Account:any){
    return this.http.post(this.baseUrl + 'register',_Account);
  }

  LoginAdmin(_User:any){
    return this.http.post<any>(this.baseUrl+'authenticate',_User);
  }

  LoginUser(_User:any){
    return this.http.post<any>(this.baseUrl+'login',_User);
  }

  IsLoggedIn(){
    const token = this.getToken();
    if(!token) return false;
    return !this.IsTokenExpired();
  }

  IsLoggedInUser(){
    return sessionStorage.getItem('accessToken')!=null;
  }

  IsTokenExpired(){
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);    
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;    
    if(isTokenExpired) this.Logout();
    return isTokenExpired
  }

  Logout = ():void =>{
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  getToken = ():string | null => sessionStorage.getItem('accessToken') || '';
  getUserID():number{
    const token = this.getToken();   
    if(!token) return 0;
    const decoded = jwtDecode(token); 
    return decoded['certserialnumber'];;  
  }
}
