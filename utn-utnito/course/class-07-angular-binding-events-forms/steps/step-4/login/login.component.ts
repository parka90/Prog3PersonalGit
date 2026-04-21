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
  errorMessage = '';

  constructor(private readonly router: Router) {}

  onUsernameInput(value: string): void {
    this.username = value;
    this.errorMessage = '';
  }

  onPasswordInput(value: string): void {
    this.password = value;
    this.errorMessage = '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const normalizedUsername = this.username.trim();
    const normalizedPassword = this.password.trim();

    if (!normalizedUsername || !normalizedPassword) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.errorMessage = '';
    this.router.navigate(['/chat']);
  }
}
