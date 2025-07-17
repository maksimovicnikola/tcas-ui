import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCellTemplate]',
  standalone: true,
})
export class CellTemplateDirective {
  @Input('appCellTemplate') key!: string;

  constructor(public readonly templateRef: TemplateRef<any>) {}
} 