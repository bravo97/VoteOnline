import { jwtDecode } from 'jwt-decode';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('expandAnimation', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {
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
    this.userinfo = sessionStorage.getItem('accessToken');    
    var info = jwtDecode(this.userinfo);   
    this.loggedInUserName = '';  
    this.chatService.joinRoom('','','')
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
