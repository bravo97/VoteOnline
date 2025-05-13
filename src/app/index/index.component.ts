import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { IndexService } from "../services/index.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

interface UserAccount{
  code:string;
  hoten:string;
  dienthoai:string;
  email:string;
}

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerFade', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class IndexComponent implements OnInit {
  registerForm!: FormGroup;
  showForm = false;
  activated = false;
  participationCode:string = "";

  features = [
    {
      icon: 'how_to_vote',
      title: 'Tạo bình chọn nhanh',
      description: 'Chỉ cần vài bước đơn giản để khởi tạo cuộc bình chọn của riêng bạn.'
    },
    {
      icon: 'group',
      title: 'Tham gia dễ dàng',
      description: 'Người dùng có thể tham gia bình chọn ngay mà không cần đăng nhập.'
    },
    {
      icon: 'leaderboard',
      title: 'Hiển thị kết quả trực quan',
      description: 'Kết quả bình chọn được cập nhật liên tục với biểu đồ dễ hiểu.'
    },
    {
      icon: 'lock',
      title: 'Bảo mật thông tin',
      description: 'Hệ thống bảo vệ dữ liệu người dùng với các biện pháp bảo mật hiện đại.'
    }
  ];

  testimonials = [
    {
      name: 'Nguyễn Văn A',
      avatar: '/assets/images/user1.jpg',
      content: 'Giao diện đơn giản, dễ sử dụng và kết quả rõ ràng. Tôi rất hài lòng!'
    },
    {
      name: 'Trần Thị B',
      avatar: '/assets/images/user2.jpg',
      content: 'Trang bình chọn rất hữu ích cho việc lấy ý kiến trong tổ chức của chúng tôi.'
    },
    {
      name: 'Lê Văn C',
      avatar: '/assets/images/user3.jpg',
      content: 'Tôi có thể tạo cuộc bầu chọn cho lớp học chỉ trong 2 phút!'
    }
  ];

  constructor(private fb: FormBuilder,private services:IndexService,private toastr:ToastrService,private router:Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      hoTen: ['', Validators.required],
      dienThoai: [''],
      email: ['']
    });
  }

  startSlide() {
  if (this.participationCode.trim()) {
    this.showForm = true;
  } else {
    alert('Vui lòng nhập thông tin trước khi tham gia!');
  }
}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const newAccount: UserAccount = {
        code: this.participationCode,
        hoten:this.registerForm.value.hoTen,
        dienthoai:this.registerForm.value.dienThoai,
        email: this.registerForm.value.email,
      };
      
      this.services.Register(newAccount)
      .subscribe({
        next:(res)=>{
          sessionStorage.setItem("accessToken",res.accessToken);  
          this.toastr.success("Chào mừng đến với VoteOnline");
          this.registerForm.reset();
          this.router.navigate(['home']);
        },
        error:(err)=>{
          console.log(err);
          
          this.toastr.error("Lỗi " + err);
        }
      })
      
      
    }
  }
}
