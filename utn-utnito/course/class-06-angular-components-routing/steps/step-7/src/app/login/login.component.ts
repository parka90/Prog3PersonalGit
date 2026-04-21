import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  constructor(private readonly router: Router) {}

  onSubmit(event: Event, _username?: string): void {
    event.preventDefault();
    this.router.navigate(['/chat']);
  }
}
