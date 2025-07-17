import { TemplateRef, Type } from '@angular/core';

export interface ColumnDef<T> {
  key: string;
  header: string;
  cell?: (element: T) => any;
  cellComponent?: Type<any>;
  cellComponentOptions?: any;
  cellTemplate?: TemplateRef<any>;
  sortable?: boolean;
  className?: string;
  style?: { [key: string]: string };
}

export interface GridData<T> {
  items: T[];
  total: number;
} 