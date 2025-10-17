'use client';
import { useEffect } from 'react';

export default function NoZoom() {
  useEffect(() => {
    // Prevent zoom gestures
    const preventZoom = (e) => e.preventDefault();

    // Disable pinch zoom
    document.addEventListener('gesturestart', preventZoom);
    document.addEventListener('gesturechange', preventZoom);
    document.addEventListener('gestureend', preventZoom);

    // Disable double-tap zoom
    document.addEventListener('dblclick', preventZoom);

    // Set viewport meta
    let meta = document.querySelector('meta[name=viewport]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    return () => {
      document.removeEventListener('gesturestart', preventZoom);
      document.removeEventListener('gesturechange', preventZoom);
      document.removeEventListener('gestureend', preventZoom);
      document.removeEventListener('dblclick', preventZoom);
    };
  }, []);

  return null;
}
