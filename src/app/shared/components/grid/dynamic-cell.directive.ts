import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ColumnDef } from './grid.model';

@Directive({
  selector: '[appDynamicCell]',
  standalone: true,
})
export class DynamicCellDirective<T> {
  @Input('appDynamicCell') data!: { col: ColumnDef<T>; element: T };
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
} 