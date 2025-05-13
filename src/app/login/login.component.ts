import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private builder: FormBuilder,private auth:AuthService,private toastr:ToastrService,private router:Router){

  }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
      password:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(8)])),
    })
  }

  
  onSubmit(){
    if(this.loginForm.valid){
      this.auth.LoginAdmin(this.loginForm.value)
      .subscribe({
        next:(res) =>{
            this.loginForm.reset();
            this.toastr.success("Đăng nhập thành công");
            sessionStorage.setItem("accessToken",res.accessToken);     
            sessionStorage.setItem("refreshToken",res.refreshToken);          
            this.router.navigate(['admin/dashboard']);
        },
        error:(err)=>{    
          this.toastr.error(err?.error.message,"Thông báo");
        }
      })
    }else{
      this.toastr.error("Vui lòng nhập đủ thông tin","Thông báo");
    }
  }
}
