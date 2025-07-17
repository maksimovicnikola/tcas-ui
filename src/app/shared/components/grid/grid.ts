import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  computed,
  effect,
  input,
  QueryList,
  signal,
  TemplateRef,
  untracked,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColumnDef, GridData } from './grid.model';
import { Observable, switchMap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CellTemplateDirective } from './cell-template.directive';
import { DynamicCellDirective } from './dynamic-cell.directive';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    DynamicCellDirective,
  ],
  templateUrl: './grid.html',
  styleUrls: ['./grid.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T> implements AfterContentInit {
  // Inputs
  dataLoader = input.required<
    (params: {
      pageIndex: number;
      pageSize: number;
      sort?: Sort;
      filter?: string;
    }) => Observable<GridData<T>>
  >();
  columns = input.required<ColumnDef<T>[]>();

  // State signals
  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);
  readonly sort = signal<Sort | undefined>(undefined);
  readonly filter = signal('');

  private readonly requestParams = computed(() => ({
    pageIndex: this.pageIndex(),
    pageSize: this.pageSize(),
    sort: this.sort(),
    filter: this.filter(),
  }));

  private readonly gridData = toSignal(
    toObservable(this.requestParams).pipe(
      switchMap(params => this.dataLoader()(params))
    )
  );

  // Computed signals for the template
  readonly dataSource = computed(() => this.gridData()?.items ?? []);
  readonly totalCount = computed(() => this.gridData()?.total ?? 0);
  readonly displayedColumns = computed(() => this.columns().map((c) => String(c.key)));

  // We don't have a direct loading signal from toSignal, so we can infer it.
  // This is a simplified version. A more robust solution might need a custom pipe.
  // For now, we'll consider it "not loading" if data is present.
  readonly isLoading = computed(() => !this.gridData());

  // Template Querying
  @ContentChildren(CellTemplateDirective)
  private readonly cellTemplates!: QueryList<CellTemplateDirective>;
  readonly cellTemplateMap = new Map<string, TemplateRef<any>>();

  // Dynamic Component Loading
  @ViewChildren(DynamicCellDirective)
  private readonly dynamicCellAnchors!: QueryList<DynamicCellDirective<T>>;

  constructor() {
    effect(() => {
      // Re-run when data changes
      this.dataSource();

      // The effect runs after the view is rendered, so the query list will be up-to-date.
      // We must schedule the component creation in the next microtask to avoid
      // ExpressionChangedAfterItHasBeenChecked errors, as we are modifying the view
      // structure *after* it has been checked.
      Promise.resolve().then(() => {
        if (!this.dynamicCellAnchors) {
            return;
        }
        
        untracked(() => {
            this.dynamicCellAnchors.forEach((anchor) => {
              const { col, element } = anchor.data;
              anchor.viewContainerRef.clear();

              if (col.cellComponent) {
                const componentRef = anchor.viewContainerRef.createComponent(col.cellComponent);
                
                // Pass cell value to the `data` input
                if ('data' in componentRef.instance) {
                  componentRef.instance.data = this.getCellValue(element, col);
                }

                // Pass options to the `options` input
                if (col.cellComponentOptions && 'options' in componentRef.instance) {
                  componentRef.instance.options = col.cellComponentOptions;
                }
              }
            });
        });
      });
    });
  }

  public getCellTemplate(key: keyof T | string): TemplateRef<any> | undefined {
    return this.cellTemplateMap.get(String(key));
  }

  public getCellValue(element: T, col: ColumnDef<T>): any {
    if (col.cell) {
      return col.cell(element);
    }
    return element[col.key as keyof T];
  }

  ngAfterContentInit(): void {
    this.cellTemplates.forEach((tpl) => {
      this.cellTemplateMap.set(tpl.key, tpl.templateRef);
    });

    this.cellTemplates.changes.subscribe(() => {
      this.cellTemplateMap.clear();
      this.cellTemplates.forEach((tpl) => {
        this.cellTemplateMap.set(tpl.key, tpl.templateRef);
      });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }

  announceSortChange(e: Sort) {
    this.sort.set(e);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.set(filterValue.trim().toLowerCase());
  }
} 