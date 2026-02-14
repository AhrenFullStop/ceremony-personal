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

// Villa images from public folder
const villaImageFiles = [
  '1.avif', '2.avif', '3.avif', '4.avif', '5.avif', '6.avif', '7.avif', '8.avif',
  '9.avif', '10.avif', '11.avif'
];

export const VILLA_IMAGES = villaImageFiles.map(file => `/assets/villa/${file}`);

// All gallery assets from public folder
const galleryAssets = [
  '1.webp', '2.webp', '3.webp', '4.webp', '5.mp4', '6.webp', '7.webp', '8.webp',
  '9.mp4', '10.mp4', '11.webp', '12.mp4', '13.webp', '14.webp', '15.webp', '16.webp',
  '17.mp4', '18.webp', '19.webp', '20.webp', '21.webp', '22.webp', '23.webp', '24.webp',
  '25.webp', '26.webp', '27.webp', '28.webp', '29.webp', '31.webp', '32.webp', '33.webp',
  '34.webp', '35.webp', '36.webp', '37.mp4', '38.webp', '40.mp4', '41.webp', '43.webp',
  '44.webp', '45.webp', '46.webp', '47.webp', '48.webp', '50.webp', '51.webp', '52.webp',
  '53.webp', '54.webp', '56.webp', '57.webp', '58.webp', '59.webp', '60.webp', '61.webp',
  '62.webp', '63.webp', '64.webp', '66.webp', '67.webp', '68.webp', '70.webp', '71.webp', '72.webp'
];

export const FOOTER_IMAGES: GalleryImage[] = galleryAssets.map((file, i) => {
  const isVideo = file.toLowerCase().endsWith('.mp4');
  return {
    id: `asset-${i}`,
    src: `/assets/${file}`,
    alt: `Gallery Asset ${i + 1}`,
    rotation: Math.random() * 6 - 3, // Random slight rotation between -3 and 3 degrees
    type: isVideo ? 'video' : 'image'
  };
});