import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  inputPreview = '';
  lastAction = 'No events yet';

  clickCount = 0;
  submitCount = 0;

  onInput(value: string): void {
    this.inputPreview = value;
    this.lastAction = `Input changed: ${value || '(empty)'}`;
  }

  onButtonClick(): void {
    this.clickCount += 1;
    this.lastAction = `Button click #${this.clickCount}`;
  }

  onSubmit(event: Event, value: string): void {
    event.preventDefault();
    this.submitCount += 1;
    this.lastAction = `Submit #${this.submitCount} with value: ${value || '(empty)'}`;
  }
}
