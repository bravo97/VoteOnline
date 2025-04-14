import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http:HttpClient) { }

  public GetData(){
    return this.http.get('http://192.168.2.24:1303/api/admin/getexport');
  }
}
