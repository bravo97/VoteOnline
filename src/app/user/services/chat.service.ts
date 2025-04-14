import { Injectable } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl:string = 'https://localhost:7119/chat';
  public connection : signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl(this.baseUrl)
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectUsers$ = new BehaviorSubject<any>([]);
  public messages:any[] = [];
  public connectUsers: any[]=[];

  constructor() {
    this.start();
    this.connection.on('ReceiveMessage',(cmnd:string,user: string,message: string,messageTime: string)=>{
      console.log('User: ',user);
      console.log('Message: ',message);
      console.log('MessageTime: ',messageTime);
      this.messages = [...this.messages, {cmnd,user,message,messageTime}];
      this.messages$.next(this.messages);
    });

    this.connection.on('ConnectedUser',(users:any)=>{
      this.connectUsers$.next(users)
    })
   }

  public async start(){
    try{
      await  this.connection.start();
    }catch(err){
      console.log('Lỗi:',err);
    }
  }

  //Kết nối nhóm
  public async joinRoom(cmnd:string,user:string,room:string){    
    return this.connection.invoke('JoinRoom',{cmnd,user,room});
  }

  //gửi tin nhắn
  public async sendMessage(message:string){
    return this.connection.invoke('SendMessage',message);
  }

  //thoát
  public async leaveChat(cmnd:string,user:string,room:string){
    return this.connection.stop();
  }


}
