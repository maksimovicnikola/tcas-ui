export interface IAnnouncementLog {
  name: string;
  destination: string;
  createdBy: string;
  startTime: Date;
  deliveryTime: Date;
  played: string;
  status: 'waiting' | 'active' | 'completed' | 'failed';
}

export const ANNOUNCEMENT_LOG: IAnnouncementLog[] = Array.from({ length: 216 }, (_, i) => ({
  name: `Announcement ${i + 1}`,
  destination: `Destination ${i + 1}`,
  createdBy: `User ${i + 1}`,
  startTime: new Date(Date.now() - (i * 1000 * 60 * 60)),
  deliveryTime: new Date(Date.now() - (i * 1000 * 60 * 30)),
  played: "1/1",
  status: i % 4 === 0 ? 'waiting' : i % 4 === 1 ? 'active' : i % 4 === 2 ? 'completed' : 'failed',
})); 