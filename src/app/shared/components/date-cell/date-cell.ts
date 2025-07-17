import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

export interface DateCellOptions {
  format?: string;
}

@Component({
  selector: 'app-date-cell',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <span>{{ data | date:(options?.format || 'mediumDate') }}</span>
  `,
})
export class DateCellComponent {
  @Input() data: any;
  @Input() options?: DateCellOptions;
} 