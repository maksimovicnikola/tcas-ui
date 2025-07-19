export interface AnnouncementTemplate {
  id: string;
  name: string;
  value: string;
}

export interface Language {
  id: string;
  name: string;
  code: string;
  checked: boolean;
}

export interface AnnouncementSettings {
  destination: string;
  numberOfPlays: number;
  minutesBetween: number;
  startTime: 'immediately' | 'specified';
  specifiedTime: {
    hours: number;
    minutes: number;
    period: 'AM' | 'PM';
  };
  languages: Language[];
}

export interface NewAnnouncementForm {
  template: string;
  announcementText: string;
  settings: AnnouncementSettings;
  messageForRecipient: string;
  from: string;
}

export const ANNOUNCEMENT_TEMPLATES: AnnouncementTemplate[] = [
  { id: '1', name: 'Free Text', value: 'free text' },
  { id: '2', name: 'Item Left At Security', value: 'item left at a security' },
  { id: '3', name: 'Meet your party', value: 'meet your party' },
  { id: '4', name: 'Meet your tour group', value: 'meet your tour group' }
];

export const DESTINATIONS = [
  { id: '1', name: 'Terminal', value: 'terminal' },
  { id: '2', name: 'All Locations', value: 'all' },
  { id: '3', name: 'Specific Area', value: 'specific' }
];

export const LANGUAGES: Language[] = [
  { id: '1', name: 'English', code: 'en', checked: true },
  { id: '2', name: 'Spanish', code: 'es', checked: false },
  { id: '3', name: 'French', code: 'fr', checked: false },
  { id: '4', name: 'German', code: 'de', checked: false },
  { id: '5', name: 'Japanese', code: 'ja', checked: false },
  { id: '6', name: 'Korean', code: 'ko', checked: false },
  { id: '7', name: 'Chinese', code: 'zh', checked: false },
  { id: '8', name: 'UK English', code: 'en-uk', checked: false },
  { id: '9', name: 'Arabic', code: 'ar', checked: false },
  { id: '10', name: 'Chinese Cantonese', code: 'zh-yue', checked: false }
]; 