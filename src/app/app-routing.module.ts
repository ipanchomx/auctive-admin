import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './global/guards/auth.guard';
import { UnAuthGuard } from './global/guards/un-auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full'},
  { path: 'sign-up', component: SignUpComponent, canActivate: [UnAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
