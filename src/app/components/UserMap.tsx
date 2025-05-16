'use client';

import { useEffect, useRef } from 'react';
import type { MarkerClusterer } from '@googlemaps/markerclusterer';


interface User {
  full_name: string;
  email: string;
  latitude?: number;
  longitude?: number;
}

export default function UserMap({ users }: { users: User[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: { lat: 54.5, lng: -3 }, // UK
    });

    const markers = users
      .map(user => {
        if (!user.latitude || !user.longitude) return null;

        const marker = new window.google.maps.Marker({
          position: { lat: user.latitude, lng: user.longitude },
          map,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${user.full_name}</strong><br/>${user.email}</div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      })
      .filter(Boolean) as google.maps.Marker[];
      
      let markerClusterer: MarkerClusterer | undefined;

    const loadClusterer = async () => {
      const { MarkerClusterer } = await import('@googlemaps/markerclusterer');
      markerClusterer = new MarkerClusterer({ map, markers });
    };

    loadClusterer();

    return () => {
      markers.forEach(marker => marker.setMap(null));
      if (markerClusterer) markerClusterer.clearMarkers();
    };
  }, [users]);

  return <div ref={mapRef} className="w-full h-[500px] rounded shadow" />;
}
