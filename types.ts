export interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  rotation?: number;
  type?: 'image' | 'video';
}
