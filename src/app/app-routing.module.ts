import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "@app/core/guards"
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    //canActivate: [AuthGuardService]
  },
  {
    path: 'course',
    loadChildren: './pages/course/course.module#CoursePageModule',
    //canActivate: [AuthGuardService]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  {
    path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',
    // canActivate: [AuthGuardService] 
  },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' }



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
