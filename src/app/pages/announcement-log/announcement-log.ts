import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DateCellComponent } from '../../shared/components/date-cell/date-cell';
import { ColumnDef, GridComponent, GridData } from '../../shared/components/grid';
import { ANNOUNCEMENT_LOG, IAnnouncementLog } from '../../mock/announcement-log.mock';
import { LabelComponent } from '../../shared/components/label/label';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-announcement-log',
  standalone: true,
  imports: [GridComponent, MatIconModule, MatButtonModule],
  templateUrl: './announcement-log.html',
  styleUrl: './announcement-log.css',
})
export class AnnouncementLog implements AfterViewInit {
  @ViewChild('actionsCellTemplate', { static: true }) actionsCellTemplate!: TemplateRef<any>;

  userColumns: ColumnDef<IAnnouncementLog>[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.userColumns = [
      {
        key: 'actions',
        header: '',
        cellTemplate: this.actionsCellTemplate,
        sortable: false,
        className: 'w-3xs',
        // style: { width: '80px' },
      },
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'destination',
        header: 'Destination',
      },
      {
        key: 'createdBy',
        header: 'Created By',
      },
      {
        key: 'startTime',
        header: 'Start Time',
        cellComponent: DateCellComponent,
        cellComponentOptions: { format: 'dd.MM.yyyy HH:mm' },
      },
      {
        key: 'deliveryTime',
        header: 'Delivery/Cancel Time',
        cellComponent: DateCellComponent,
        cellComponentOptions: { format: 'dd.MM.yyyy HH:mm' },
      },
      {
        key: 'played',
        header: 'Played',
      },
      {
        key: 'status',
        header: 'Status',
        cellComponent: LabelComponent,
        cellComponentOptions: {
          colorMap: {
            active: 'primary',
            waiting: 'primary',
            completed: 'accent',
            failed: 'warn',
          },
        },
      }
    ];

    this.cdr.detectChanges();
  }

  onPrint(event: { event: Event, row: IAnnouncementLog, actionType: string }) {
    alert(`Print action triggered for: ${event.row.name}`);
  }

  onSave(event: { event: Event, row: IAnnouncementLog, actionType: string }) {
    alert(`Save action triggered for: ${event.row.name}`);
  }

  onPlay(event: { event: Event, row: IAnnouncementLog, actionType: string }) {
    alert(`Play action triggered for: ${event.row.name}`);
  }

  // Data Loader Function
  usersLoader = (params: {
    pageIndex: number;
    pageSize: number;
    sort?: { active: string; direction: string };
    filter?: string;
  }): Observable<GridData<IAnnouncementLog>> => {
    let data = [...ANNOUNCEMENT_LOG]; // Imagine this is a full database table

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
        const valA = a[params.sort?.active as keyof IAnnouncementLog];
        const valB = b[params.sort?.active as keyof IAnnouncementLog];
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