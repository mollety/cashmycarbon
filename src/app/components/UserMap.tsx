'use client';

import { useEffect, useRef } from 'react';

export default function UserMap({ users }: { users: any[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: { lat: 54.5, lng: -3 }, // UK
    });

    const markers = users.map(user => {
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
    }).filter(Boolean);

    // Load MarkerClusterer
    const loadClusterer = async () => {
      const { MarkerClusterer } = await import('@googlemaps/markerclusterer');
      new MarkerClusterer({ map, markers });
    };

    loadClusterer();
  }, [users]);

  return <div ref={mapRef} className="w-full h-[500px] rounded shadow" />;
}
