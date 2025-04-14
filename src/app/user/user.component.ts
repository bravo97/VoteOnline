import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  loggedInUserName: string = '';
    inputMessage: string = '';
    userinfo!: any;
    messages = [{ text: 'Xin chào! Tôi có thể giúp gì?', user: false }];
    cards = [
      { title: 'Chuyến đi du lịch 2 ngày 1 đêm', content: 'Mọi người chọn nơi muốn đi để công đoàn tổng hợp lại kết quả sẽ dựa vào lượt bình chọn của mọi người nhé  :))',plan:[{id:1,Ten:'Đồng ý'},{id:2,Ten:'Không đồng ý'}], isExpanded: true },
      { title: 'Thẻ 2', content: 'Nội dung của thẻ 2', isExpanded: true },
    ];
  
    constructor(private auth:AuthService,public chatService: ChatService){}
  
    ngOnInit(): void {
      this.userinfo = sessionStorage.getItem('userinfo');    
      var info = this.auth.decodeToken(this.userinfo);   
      this.loggedInUserName = info.certserialnumber;  
      this.chatService.joinRoom(info.certserialnumber,info.unique_name,info.nameid)
      this.chatService.messages$.subscribe(res=>{
        this.messages = res
      })
    }
  
    sendMessage() {
      this.chatService.sendMessage(this.inputMessage)
      .then(()=>{
        this.inputMessage = "";
      }).catch((err)=>{
        console.log(err); 
      })
    }
  
    toggleExpand(card: any) {
      card.isExpanded = !card.isExpanded;
    }

}
