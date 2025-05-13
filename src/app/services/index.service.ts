import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../GlobalVariable';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private baseUrl:string = BASE_API_URL+'home/';
  constructor(private http:HttpClient) { }

  Register(_User:any){
    return this.http.post<any>(this.baseUrl+'register',_User);
  }
  
  IsLoggedInUser(){
    const token = this.getToken();
    if(!token) return false;
    return !this.IsTokenExpired();
  }

  IsTokenExpired(){
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);    
    console.log(decoded)
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;    
    if(isTokenExpired) this.Logout();
    return isTokenExpired
  }

  Logout = ():void =>{
    sessionStorage.removeItem('accessToken');
  }

  getToken = ():string | null => sessionStorage.getItem('accessToken') || '';
  getRoomByUser():string{
    const token = this.getToken();   
    if(!token) return '';
    const decoded = jwtDecode(token); 
    return '';  
  }
}
