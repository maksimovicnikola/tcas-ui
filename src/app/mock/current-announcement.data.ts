export interface ICurrentAnnouncement {
  name: string;
  startTime: Date;
  template: string;
  status: 'waiting' | 'active' | 'completed' | 'failed';
}

export const CURRENT_ANNOUNCEMENTS: ICurrentAnnouncement[] = Array.from({ length: 50 }, (_, i) => ({
  name: `Announcement ${i + 1}`,
  startTime: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  template: `Template ${i + 1}`,
  status: ['waiting', 'active', 'completed', 'failed'][
    Math.floor(Math.random() * 4)
  ] as 'waiting' | 'active' | 'completed' | 'failed',
})); 