import { Component, Input } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';

export interface LabelOptions {
  colorMap?: Record<string, 'primary' | 'accent' | 'warn' | undefined>;
}

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [MatChipsModule],
  template: `
    <mat-chip
      [color]="options?.colorMap?.[data] || undefined"
      [highlighted]="true"
      >{{ data }}</mat-chip
    >
  `,
  styles: [
    `
      mat-chip {
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 12px;
        line-height: 1.5;
        height: auto;
        min-height: 24px;
      }
    `,
  ],
})
export class LabelComponent {
  @Input() data: any;
  @Input() options?: LabelOptions;
} 