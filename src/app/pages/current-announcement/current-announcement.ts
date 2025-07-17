import { Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ColumnDef, GridComponent, GridData } from '../../shared/components/grid';
import { Observable, of, delay } from 'rxjs';
import { DateCellComponent } from '../../shared/components/date-cell/date-cell';
import { ICurrentAnnouncement, CURRENT_ANNOUNCEMENTS } from '../../mock/current-announcement.data';

@Component({
  selector: 'app-current-announcement',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './current-announcement.html',
  styleUrl: './current-announcement.css',
})
export class CurrentAnnouncement implements AfterViewInit {
  @ViewChild('actionsCellTemplate', { static: true }) actionsCellTemplate!: TemplateRef<any>;

  userColumns: ColumnDef<ICurrentAnnouncement>[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.userColumns = [
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
        // style: { width: '80px' },
      },
    ];

    this.cdr.detectChanges();
  }

  onShow(event: { event: Event, row: ICurrentAnnouncement, actionType: string }) {
    alert(`Show action triggered for: ${event.row.name}`);
  }

  onReplay(event: { event: Event, row: ICurrentAnnouncement, actionType: string }) {
    alert(`Replay action triggered for: ${event.row.name}`);
  }

  onDeliver(event: { event: Event, row: ICurrentAnnouncement, actionType: string }) {
    alert(`The announcement ${event.row.name} has been delivered!`);
  }

  // Data Loader Function
  usersLoader = (params: {
    pageIndex: number;
    pageSize: number;
    sort?: { active: string; direction: string };
    filter?: string;
  }): Observable<GridData<ICurrentAnnouncement>> => {
    let data = [...CURRENT_ANNOUNCEMENTS]; // Imagine this is a full database table

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
    }).pipe(delay(500)); // Simulate network latency
  };
} 