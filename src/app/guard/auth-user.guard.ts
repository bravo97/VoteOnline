import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthUserGuard implements CanActivate{

  constructor(private auth:AuthService,private router:Router,private toastr:ToastrService){

  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean|UrlTree> |Promise<boolean|UrlTree> |boolean|UrlTree {
      if(this.auth.IsLoggedInUser()){
        return true;
      }else{
        this.toastr.warning("Chưa đăng nhập","Thông báo");
        this.router.navigate(['login']);
        return false;
      }

    return true;
  }
  
}