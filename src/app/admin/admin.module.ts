import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from './Material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { BallotComponent } from './components/ballot/ballot.component';
import { BallotdialogComponent } from './components/dialog/ballotdialog/ballotdialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendersComponent } from './components/attenders/attenders.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    DashboardComponent,
    UserinfoComponent,
    BallotComponent,
    BallotdialogComponent,
    AttendersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
