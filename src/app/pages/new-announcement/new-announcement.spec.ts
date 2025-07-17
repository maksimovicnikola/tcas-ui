import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAnnouncement } from './new-announcement';
import { By } from '@angular/platform-browser';

describe('NewAnnouncement', () => {
  let fixture: ComponentFixture<NewAnnouncement>;
  let component: NewAnnouncement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnouncement],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAnnouncement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain('New Announcement');
  });

  it('should render the default message', () => {
    const message = fixture.debugElement.query(By.css('p'));
    expect(message.nativeElement.textContent).toContain('Use this page to create a new announcement.');
  });
}); 