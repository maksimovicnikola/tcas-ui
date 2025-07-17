import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentAnnouncement } from './current-announcement';
import { By } from '@angular/platform-browser';

describe('CurrentAnnouncement', () => {
  let fixture: ComponentFixture<CurrentAnnouncement>;
  let component: CurrentAnnouncement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAnnouncement],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentAnnouncement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain('Current Announcement');
  });

  it('should render the default message', () => {
    const message = fixture.debugElement.query(By.css('p'));
    expect(message.nativeElement.textContent).toContain('There are currently no announcements.');
  });
}); 