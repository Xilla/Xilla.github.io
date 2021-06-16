import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { ContactsComponent } from './contacts/components/contacts/contacts.component';
import { SmsComponent } from './sms/components/sms/sms.component';
import { SetupsComponent } from './setups/components/setups/setups.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: NavigationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'sms',
        component: SmsComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'settings',
        component: SetupsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
