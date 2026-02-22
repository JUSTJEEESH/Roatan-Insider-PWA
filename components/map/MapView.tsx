'use client';

import { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Business, Category } from '@/lib/types';
import { CATEGORIES, MAP_CENTER, MAP_DEFAULT_ZOOM, MAP_MIN_ZOOM, MAP_MAX_ZOOM } from '@/lib/constants';
import { formatPriceRange, formatAreaName } from '@/lib/utils';
import Link from 'next/link';

const MARKER_COLOR = '#374151'; // gray-700

interface MapViewProps {
  businesses: Business[];
  userLat?: number | null;
  userLng?: number | null;
  focusSlug?: string | null;
}

function UserLocationMarker({ lat, lng }: { lat: number; lng: number }) {
  return (
    <CircleMarker
      center={[lat, lng]}
      radius={8}
      pathOptions={{
        fillColor: '#4285F4',
        fillOpacity: 1,
        color: '#ffffff',
        weight: 3,
        opacity: 1,
      }}
    >
      <Popup>
        <p className="text-sm font-body font-medium">Your Location</p>
      </Popup>
    </CircleMarker>
  );
}

function FlyToLocation({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.5 });
  }, [map, lat, lng, zoom]);
  return null;
}

export function MapView({ businesses, userLat, userLng, focusSlug }: MapViewProps) {
  const focusBusiness = focusSlug
    ? businesses.find((b) => b.slug === focusSlug)
    : null;

  const center: [number, number] = focusBusiness
    ? [focusBusiness.latitude, focusBusiness.longitude]
    : [MAP_CENTER.lat, MAP_CENTER.lng];

  const zoom = focusBusiness ? 16 : MAP_DEFAULT_ZOOM;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={MAP_MIN_ZOOM}
      maxZoom={MAP_MAX_ZOOM}
      className="w-full h-full z-0"
      style={{ minHeight: '400px' }}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Business markers — uniform dark gray */}
      {businesses.map((business) => {
        const cat = CATEGORIES.find((c) => c.slug === business.category);

        return (
          <CircleMarker
            key={business.id}
            center={[business.latitude, business.longitude]}
            radius={7}
            pathOptions={{
              fillColor: MARKER_COLOR,
              fillOpacity: 0.85,
              color: '#ffffff',
              weight: 2,
              opacity: 1,
            }}
          >
            <Popup>
              <div className="min-w-[200px] max-w-[240px]">
                <div className="h-20 bg-gradient-to-br from-gray-200 to-gray-100 rounded-t" />
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {business.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    {cat && (
                      <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-pill bg-gray-100 text-gray-600 font-medium">
                        {cat.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {formatPriceRange(business.priceRange)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {formatAreaName(business.area)}
                  </p>
                  <Link
                    href={`/listing/${business.slug}`}
                    className="block mt-2 text-center text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-button py-1.5 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      {/* User location */}
      {userLat && userLng && (
        <UserLocationMarker lat={userLat} lng={userLng} />
      )}

      {/* Fly to focused business */}
      {focusBusiness && (
        <FlyToLocation
          lat={focusBusiness.latitude}
          lng={focusBusiness.longitude}
          zoom={16}
        />
      )}
    </MapContainer>
  );
}
