import { Manifest } from 'next/dist/lib/metadata/types/manifest-types';

export default function manifest(): Manifest {
  return {
    background_color: '#ffffff',
    display: 'standalone',
    name: 'Inception',
    short_name: 'Inception',
    start_url: '/',
    theme_color: '#ffffff',
  };
}
