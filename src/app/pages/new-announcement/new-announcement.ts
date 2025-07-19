import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAnnouncementService } from './new-announcement.service';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-new-announcement',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule
  ],
  templateUrl: './new-announcement.html',
  styleUrl: './new-announcement.css',
})
export class NewAnnouncement {
  private readonly announcementService = inject(NewAnnouncementService);

  readonly formData = this.announcementService.formData;
  readonly templates = this.announcementService.templates;
  readonly destinations = this.announcementService.destinations;
  readonly languages = this.announcementService.languages;

  onTemplateChange(event: MatSelectChange): void {
    this.announcementService.updateTemplate(event.value);
  }

  onAnnouncementTextChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.announcementService.updateAnnouncementText(target.value);
  }

  onDestinationChange(event: MatSelectChange): void {
    this.announcementService.updateDestination(event.value);
  }

  onNumberOfPlaysChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.announcementService.updateNumberOfPlays(+target.value);
  }

  onMinutesBetweenChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.announcementService.updateMinutesBetween(+target.value);
  }

  onStartTimeChange(event: MatRadioChange): void {
    this.announcementService.updateStartTime(event.value);
  }

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const currentSettings = this.formData().settings.specifiedTime;
    this.announcementService.updateSpecifiedTime({
      ...currentSettings,
      hours: +target.value
    });
  }

  onMinutesChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const currentSettings = this.formData().settings.specifiedTime;
    this.announcementService.updateSpecifiedTime({
      ...currentSettings,
      minutes: +target.value
    });
  }

  onPeriodChange(event: MatSelectChange): void {
    const currentSettings = this.formData().settings.specifiedTime;
    this.announcementService.updateSpecifiedTime({
      ...currentSettings,
      period: event.value as 'AM' | 'PM'
    });
  }

  onLanguageToggle(languageId: string): void {
    this.announcementService.toggleLanguage(languageId);
  }

  onMessageForRecipientChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.announcementService.updateMessageForRecipient(target.value);
  }

  onFromChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.announcementService.updateFrom(target.value);
  }

  onSubmitTextToSpeech(): void {
    this.announcementService.submitAnnouncement();
  }

  onSubmitRecordVoice(): void {
    this.announcementService.submitAnnouncement();
  }

  onSubmitLive(): void {
    this.announcementService.submitAnnouncement();
  }
} 