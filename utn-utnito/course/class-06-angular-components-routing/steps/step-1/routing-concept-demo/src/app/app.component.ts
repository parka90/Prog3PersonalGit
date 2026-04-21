import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  goToOneByCode(): void {
    this.router.navigate(['/one']);
  }

  goToTwoByCode(): void {
    this.router.navigate(['/two']);
  }
}
