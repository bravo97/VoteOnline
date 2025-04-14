import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private builder: FormBuilder,private toastr:ToastrService,
    private service:AuthService,private router:Router){

  }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      username:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
      password:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(8)])),
      dienthoai:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(9)])),
      email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
      hoten:this.builder.control('',Validators.required)
    })
  }


  register(){
    if(this.registerForm.valid){
      this.service.Register(this.registerForm.value)
      .subscribe({
        next:(res) =>{
            this.registerForm.reset();
            this.toastr.success("Đăng ký thành công");
            this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toastr.error(err?.error.message,"Thông báo");
        }
      })
    }else{
      this.toastr.warning('Vui lòng nhập đủ thông tin',"Thông báo");
    }
  }
}
