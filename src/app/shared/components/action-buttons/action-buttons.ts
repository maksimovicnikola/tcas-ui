import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button color="primary" (click)="onButtonClick()">
      <mat-icon>announcement</mat-icon>
    </button>
  `,
})
export class ActionButtonsComponent {
  @Input() data: any;

  onButtonClick(): void {
    alert('hello world');
  }
} 