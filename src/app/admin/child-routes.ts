import { AttendersComponent } from "./components/attenders/attenders.component";
import { BallotComponent } from "./components/ballot/ballot.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserinfoComponent } from "./components/userinfo/userinfo.component";

export const childRoutes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { icon: 'dashboard', text: 'Dashboard' }
    },
    {
      path: 'userinfo',
      component: UserinfoComponent,
      data: { icon: 'account_box', text: 'Tài khoản' }
    },
    {
      path: 'ballot',
      component: BallotComponent,
      data: { icon: 'table', text: 'Cuộc bỏ phiếu' }
    },
    {
      path: 'attender',
      component: AttendersComponent,
      data: { icon: 'groups', text: 'Người tham dự' }
    },
    {
      path: 'userinfo',
      component: UserinfoComponent,
      data: { icon: 'settings', text: 'Thiết lập' }
    },
    {
      path: 'userinfo',
      component: UserinfoComponent,
      data: { icon: 'help', text: 'Help' }
    },
    {
      path: 'userinfo',
      component: UserinfoComponent,
      data: { icon: 'analytics', text: 'Analytic' }
    },
  ];