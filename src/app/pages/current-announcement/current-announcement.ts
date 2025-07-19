import { Component, TemplateRef, ViewChild, signal, computed } from '@angular/core';
import { ColumnDef, GridComponent, GridData } from '../../shared/components/grid';
import { Observable, of, delay, tap, catchError, throwError } from 'rxjs';
import { DateCellComponent } from '../../shared/components/date-cell/date-cell';
import { ICurrentAnnouncement, CURRENT_ANNOUNCEMENTS } from '../../mock/current-announcement.mock';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-current-announcement',
  standalone: true,
  imports: [
    GridComponent, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './current-announcement.html',
  styleUrl: './current-announcement.css',
})
export class CurrentAnnouncement {
  @ViewChild('actionsCellTemplate', { static: true }) actionsCellTemplate!: TemplateRef<any>;

  // Signals for reactive state management
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // Computed signals for derived state
  readonly userColumns = computed<ColumnDef<ICurrentAnnouncement>[]>(() => {
    return [
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'startTime',
        header: 'Start Time',
        cellComponent: DateCellComponent,
        cellComponentOptions: { format: 'dd.MM.yyyy HH:mm' },
      },
      {
        key: 'template',
        header: 'Template',
      },
      {
        key: 'actions',
        header: '',
        cellTemplate: this.actionsCellTemplate,
        sortable: false,
        className: 'w-3xs',
      },
    ];
  });

  // Event handlers with proper typing
  onShow(event: { event: Event, row: ICurrentAnnouncement, actionType: string }): void {
    console.log('Show action triggered for:', event.row.name);
    alert(`Show action triggered for: ${event.row.name}`);
  }

  onReplay(event: { event: Event, row: ICurrentAnnouncement, actionType: string }): void {
    console.log('Replay action triggered for:', event.row.name);
    alert(`Replay action triggered for: ${event.row.name}`);
  }

  onDeliver(event: { event: Event, row: ICurrentAnnouncement, actionType: string }): void {
    console.log('Deliver action triggered for:', event.row.name);
    alert(`The announcement ${event.row.name} has been delivered!`);
  }

  // Data Loader Function with signals
  readonly usersLoader = (params: {
    pageIndex: number;
    pageSize: number;
    sort?: { active: string; direction: string };
    filter?: string;
  }): Observable<GridData<ICurrentAnnouncement>> => {
    this.isLoading.set(true);
    this.error.set(null);

    let data = [...CURRENT_ANNOUNCEMENTS];

    try {
      // 1. Filtering on the "server"
      if (params.filter) {
        data = data.filter(item =>
          Object.values(item).some(
            val =>
              val &&
              val.toString().toLowerCase().includes(params.filter!.toLowerCase())
          )
        );
      }

      // 2. Sorting on the "server"
      if (params.sort && params.sort.direction) {
        data.sort((a, b) => {
          const isAsc = params.sort?.direction === 'asc';
          const valA = a[params.sort?.active as keyof ICurrentAnnouncement];
          const valB = b[params.sort?.active as keyof ICurrentAnnouncement];
          return (valA < valB ? -1 : 1) * (isAsc ? 1 : -1);
        });
      }

      const total = data.length;

      // 3. Paginating on the "server"
      const startIndex = params.pageIndex * params.pageSize;
      const paginatedData = data.slice(startIndex, startIndex + params.pageSize);

      // The server returns only the paginated data and the total count
      return of({
        items: paginatedData,
        total: total,
      }).pipe(
        delay(500), // Simulate network latency
        // Handle loading state
        tap(() => this.isLoading.set(false)),
        catchError((err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
          return throwError(() => err);
        })
      );
    } catch (error) {
      this.error.set('An error occurred while loading data');
      this.isLoading.set(false);
      return throwError(() => error);
    }
  };
} 