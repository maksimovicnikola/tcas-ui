import { Injectable, signal, computed } from '@angular/core';
import { 
  NewAnnouncementForm, 
  AnnouncementSettings, 
  ANNOUNCEMENT_TEMPLATES, 
  DESTINATIONS, 
  LANGUAGES 
} from './new-announcement.model';

@Injectable({
  providedIn: 'root'
})
export class NewAnnouncementService {
  private readonly _formData = signal<NewAnnouncementForm>({
    template: 'free text',
    announcementText: '',
    settings: {
      destination: 'terminal',
      numberOfPlays: 1,
      minutesBetween: 5,
      startTime: 'immediately',
      specifiedTime: {
        hours: 12,
        minutes: 0,
        period: 'AM'
      },
      languages: [...LANGUAGES]
    },
    messageForRecipient: '',
    from: ''
  });

  readonly formData = this._formData.asReadonly();
  readonly templates = signal(ANNOUNCEMENT_TEMPLATES);
  readonly destinations = signal(DESTINATIONS);
  readonly languages = computed(() => this._formData().settings.languages);

  updateTemplate(template: string): void {
    this._formData.update(current => ({
      ...current,
      template
    }));
  }

  updateAnnouncementText(text: string): void {
    this._formData.update(current => ({
      ...current,
      announcementText: text
    }));
  }

  updateDestination(destination: string): void {
    this._formData.update(current => ({
      ...current,
      settings: {
        ...current.settings,
        destination
      }
    }));
  }

  updateNumberOfPlays(numberOfPlays: number): void {
    this._formData.update(current => ({
      ...current,
      settings: {
        ...current.settings,
        numberOfPlays
      }
    }));
  }

  updateMinutesBetween(minutesBetween: number): void {
    this._formData.update(current => ({
      ...current,
      settings: {
        ...current.settings,
        minutesBetween
      }
    }));
  }

  updateStartTime(startTime: 'immediately' | 'specified'): void {
    this._formData.update(current => ({
      ...current,
      settings: {
        ...current.settings,
        startTime
      }
    }));
  }

  updateSpecifiedTime(specifiedTime: { hours: number; minutes: number; period: 'AM' | 'PM' }): void {
    this._formData.update(current => ({
      ...current,
      settings: {
        ...current.settings,
        specifiedTime
      }
    }));
  }

  toggleLanguage(languageId: string): void {
    this._formData.update(current => ({
      ...current,
      settings: {
        ...current.settings,
        languages: current.settings.languages.map(lang =>
          lang.id === languageId 
            ? { ...lang, checked: !lang.checked }
            : lang
        )
      }
    }));
  }

  updateMessageForRecipient(message: string): void {
    this._formData.update(current => ({
      ...current,
      messageForRecipient: message
    }));
  }

  updateFrom(from: string): void {
    this._formData.update(current => ({
      ...current,
      from
    }));
  }

  submitAnnouncement(): void {
    const formData = this._formData();
    console.log('Submitting announcement:', formData);
    // Ovde bi išla logika za slanje na server
  }

  resetForm(): void {
    this._formData.set({
      template: 'free text',
      announcementText: '',
      settings: {
        destination: 'terminal',
        numberOfPlays: 1,
        minutesBetween: 5,
        startTime: 'immediately',
        specifiedTime: {
          hours: 12,
          minutes: 0,
          period: 'AM'
        },
        languages: [...LANGUAGES]
      },
      messageForRecipient: '',
      from: ''
    });
  }
} 