import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { IndexComponent } from './index/index.component';
import { AuthUserGuard } from './guard/auth-user.guard';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[AuthGuard]
  },
  { path: 'login',component:LoginComponent}, 
  { path: 'register',component:RegisterComponent}, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Điều hướng mặc định
  { path: '**', redirectTo: '/login' } // Xử lý route không tồn tại
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
