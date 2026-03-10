import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="hello-screen">
      <section class="hello-card">
        <p class="label">Programming III</p>
        <h1>Hello UTNito</h1>
        <p class="subtitle">Your Angular environment is working from VS Code Play/F5.</p>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {}
