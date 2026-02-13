import { TimelineEvent, GalleryImage } from './types';

export const WEDDING_DATE = "Saturday, April 18";
export const COUPLE_NAMES = "Ahren & Reem";
export const LOCATION_NAME = "The Villa, Bishopscourt";
export const LOCATION_MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.572391263592!2d18.4485!3d-33.9785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc42c6c0c2c3c3%3A0x6b0c2c3c3c3c3c3!2sBishopscourt%2C%20Cape%20Town!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza";
export const LOCATION_LINK = "https://maps.app.goo.gl/VpX4r4uJZMSgv3646";

export const TIMELINE: TimelineEvent[] = [
  {
    time: "3:00 PM",
    title: "Arrival",
    description: "Welcome drinks & lawn games",
    icon: "cocktail"
  },
  {
    time: "4:00 PM",
    title: "Ceremony",
    description: "Vows in the garden",
    icon: "rings"
  },
  {
    time: "4:30 PM",
    title: "Photos & Mingling",
    description: "Snacks served",
    icon: "camera"
  },
  {
    time: "6:00 PM",
    title: "Mocktail Hour",
    description: "Sunset refreshments",
    icon: "sunset"
  },
  {
    time: "7:00 PM",
    title: "Reception",
    description: "Starters served & speeches",
    icon: "mic"
  },
  {
    time: "8:00 PM",
    title: "Feast & Dance",
    description: "Shawarma dinner followed by dancing",
    icon: "music"
  }
];

// Dynamically import specific villa images
const villaAssetsImport = import.meta.glob('./assets/villa/*', { eager: true, query: '?url', import: 'default' });

export const VILLA_IMAGES = Object.values(villaAssetsImport) as string[];

// Dynamically import all assets from the assets folder
const assetsImport = import.meta.glob('./assets/*', { eager: true, query: '?url', import: 'default' });

export const FOOTER_IMAGES: GalleryImage[] = Object.entries(assetsImport)
  .filter(([path]) => !path.includes('villa'))
  .map(([path, url], i) => {
    const isVideo = path.toLowerCase().endsWith('.mp4');
    return {
      id: `asset-${i}`,
      src: url as string,
      alt: `Gallery Asset ${i + 1}`,
      rotation: Math.random() * 6 - 3, // Random slight rotation between -3 and 3 degrees
      type: isVideo ? 'video' : 'image'
    };
  });