import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { Role } from './_models';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register';


const routes: Routes = [
  {
      path: 'home-old',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
    // path:'admin',loadChildren:'src/app/admin/admin.module#AdminModule',
    path: 'admin',component: AdminComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  // {
  //   path:'admin',loadChildren:'src/app/admin/admin.module#AdminModule',
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin] }

  // },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path:'profile',component:ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'',loadChildren:'src/app/journal/journal.module#JournalModule',
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
