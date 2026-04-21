import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title: string = 'Binding Concept Demo';
  subtitle: string = 'Angular template <-> TypeScript data flow';

  displayName: string = 'Carlos Gardel';
  displayAge: string = '28';
  draftName: string = 'Carlos Gardel';
  draftAge: string = '28';

  clickCount: number = 0;

  updateNameAndAge(): void {
    const normalized = this.draftName.trim();
    const normalizedAge = this.draftAge.trim();

    if (!normalized || !normalizedAge) {
      return;
    }

    this.displayName = normalized;
    this.displayAge = normalizedAge;
  }


  onPrimaryClick(): void {
    this.clickCount += 1;
  }

  resetCounter(): void {
    this.clickCount = 0;
  }
}
