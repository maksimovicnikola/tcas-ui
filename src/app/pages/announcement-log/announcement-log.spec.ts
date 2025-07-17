import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncementLog } from './announcement-log';
import { By } from '@angular/platform-browser';

describe('AnnouncementLog', () => {
  let fixture: ComponentFixture<AnnouncementLog>;
  let component: AnnouncementLog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementLog],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain('Announcement Log');
  });

  it('should render the default message', () => {
    const message = fixture.debugElement.query(By.css('p'));
    expect(message.nativeElement.textContent).toContain('No announcements have been logged yet.');
  });
}); 