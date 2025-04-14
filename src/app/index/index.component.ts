import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

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
export class IndexComponent {
  showForm = false;
  activated = false;
  testimonials = [
    {
      name: 'Nguyễn Văn A',
      avatar: 'assets/images/user1.jpg',
      content: 'Trang web bình chọn rất dễ sử dụng và hiệu quả!'
    },
    {
      name: 'Trần Thị B',
      avatar: 'assets/images/user2.jpg',
      content: 'Tôi có thể tạo cuộc bình chọn và mời mọi người tham gia cực nhanh.'
    },
    {
      name: 'Lê Văn C',
      avatar: 'assets/images/user3.jpg',
      content: 'Rất hài lòng về giao diện và sự tiện lợi của hệ thống.'
    },
    {
      name: 'Phạm Thị D',
      avatar: 'assets/images/user4.jpg',
      content: 'Tôi đã sử dụng cho các hoạt động nhóm và công việc – rất hiệu quả!'
    },
    // có thể thêm nhiều hơn nữa
  ];
  
  // Dữ liệu mô tả các tính năng chính
  features = [
    {
      title: 'Bình chọn nhanh chóng',
      description: 'Tạo cuộc bình chọn chỉ với vài cú nhấp chuột.',
      icon: 'how_to_vote'
    },
    {
      title: 'Kết quả minh bạch',
      description: 'Hiển thị kết quả theo thời gian thực.',
      icon: 'bar_chart'
    },
    {
      title: 'Bảo mật cao',
      description: 'Sử dụng xác thực JWT và dữ liệu được mã hóa.',
      icon: 'security'
    }
  ];

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  startSlide() {
    this.activated = true;
    setTimeout(() => {
      this.showForm = true;
    }, 700);
  }
  onSubmit() {
    // Submit logic here
  }
}
