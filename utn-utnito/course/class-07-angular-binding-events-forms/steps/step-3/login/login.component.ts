import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private readonly router: Router) {}

  onUsernameInput(value: string): void {
    this.username = value;
    console.log('[step-3] username input:', this.username);
  }

  onPasswordInput(value: string): void {
    this.password = value;
    console.log('[step-3] password input length:', this.password.length);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('[step-3] submit captured:', {
      username: this.username,
      passwordLength: this.password.length,
    });
    this.router.navigate(['/chat']);
  }
}
