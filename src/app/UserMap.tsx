'use client';

import { useEffect, useRef } from 'react';

type User = {
  full_name: string;
  email?: string;
  latitude: number;
  longitude: number;
};

export default function UserMap({ users }: { users: User[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: { lat: 54.5, lng: -3 }, // UK centered
    });

    const markers = users
      .filter(user => user.latitude && user.longitude)
      .map(user => {
        const marker = new window.google.maps.Marker({
          position: { lat: user.latitude, lng: user.longitude },
          map,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${user.full_name}</strong><br/>${user.email ?? ''}</div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      });

    // Cluster the markers
    const loadClusterer = async () => {
      const { MarkerClusterer } = await import('@googlemaps/markerclusterer');
      new MarkerClusterer({ map, markers });
    };

    loadClusterer();
  }, [users]);

  return <div ref={mapRef} className="w-full h-[500px] rounded shadow" />;
}
