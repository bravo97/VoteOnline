import { Injectable } from '@angular/core';
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
    return sessionStorage.getItem('username')!=null;
  }

  IsLoggedInUser(){
    return sessionStorage.getItem('userinfo')!=null;
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
