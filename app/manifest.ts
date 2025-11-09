import { Manifest } from 'next/dist/lib/metadata/types/manifest-types';

export default function manifest(): Manifest {
  return {
    background_color: '#1a1a1a',
    display: 'standalone',
    name: 'JetShared',
    short_name: 'JetShared',
    start_url: '/',
    theme_color: '#1a1a1a',
  };
}
