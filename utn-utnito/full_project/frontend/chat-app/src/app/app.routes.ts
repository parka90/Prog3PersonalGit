import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: environment.routeLogin, component: LoginComponent },
  { path: environment.routeChat, component: ChatComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: environment.routeChat },
  { path: '**', redirectTo: environment.routeChat }
];
