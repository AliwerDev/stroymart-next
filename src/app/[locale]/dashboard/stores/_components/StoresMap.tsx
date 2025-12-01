/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Typography from '@/components/ui/Typography';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import get from 'lodash.get';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const center = { lat: 41.3111, lng: 69.2797 };

interface StoresMapProps {
  stores: any[];
}

export default function StoresMap({ stores }: StoresMapProps) {
  const t = useTranslations();
  const [hovered, setHovered] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const icon = useMemo(() => {
    if (isLoaded && window.google) {
      return {
        url: '/images/marker.png',
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
    return null;
  }, [isLoaded]);

  if (!isLoaded)
    return <div className="h-[430px] flex items-center justify-center">{t('Загрузка')}</div>;

  return (
    <GoogleMap
      center={{
        lat: Number(get(stores, '[0].latitude', center.lat)),
        lng: Number(get(stores, '[0].longitude', center.lng)),
      }}
      zoom={14}
      mapContainerStyle={{ width: '100%', height: '430px' }}
      mapContainerClassName="rounded-[10px] overflow-hidden border border-gray-50"
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
      }}
    >
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={{
            lat: Number(get(store, 'latitude', 0)),
            lng: Number(get(store, 'longitude', 0)),
          }}
          icon={icon!}
          title={store.name}
          onMouseOver={() => setHovered(store.id)}
          onMouseOut={() => setHovered(null)}
        >
          {hovered === store.id && (
            <InfoWindow
              options={{
                headerDisabled: true,
              }}
              onCloseClick={() => setHovered(null)}
            >
              <Typography variant="subtitle-sm-16">{store.name}</Typography>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}
