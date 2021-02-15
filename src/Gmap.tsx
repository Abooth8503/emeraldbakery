/// <reference types="google.maps" />
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useEmeraldContext } from './Interfaces/EmeraldTypes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function GMap() {
  const mapRef: HTMLDivElement | null = null;
  const googleMapRef = React.useRef<HTMLDivElement | null>(mapRef);
  const { orders } = useEmeraldContext();
  let googleMap: google.maps.Map | undefined = undefined;

  // list of icons
  const iconList = {
    icon1:
      'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
    icon2:
      'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon3:
      'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
    icon4:
      'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png',
  };

  useEffect(() => {
    googleMap = initGoogleMap();
    const bounds = new google.maps.LatLngBounds();
    console.log('about to create a marker');
    orders.map((order) => {
      const address = `${order.Address}, ${order.City}, ${order.State} ${order.ZipCode}`;
      console.log('creating marker', address);
      const marker = createMarker(address);
      console.log('marker', marker);
      //   console.log('marker 1 ', marker.position);
      if (marker !== null) {
        // const newLatLng = new google.maps.LatLng(
        //   marker.getPosition()?.lat(),
        //   marker.getPosition()?.lng(),
        //   false
        // );
        // bounds.extend(newLatLng);
        if (googleMap !== undefined) {
          googleMap.fitBounds(bounds); // the map to contain all markers
        }
      }
    });
  }, []);

  // initialize the google map
  const initGoogleMap = () => {
    return new google.maps.Map(googleMapRef.current as HTMLElement, {
      center: { lat: 29.56638929999999, lng: -98.3988705 },
      zoom: 9,
    });
  };

  // create marker on google map
  function createMarker(markerObj: string): google.maps.Marker | null {
    let latValue = 0;
    let lgnValue = 0;
    getGeocode({ address: markerObj })
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });
        latValue = lat;
        lgnValue = lng;

        return new google.maps.Marker({
          position: { lat: latValue, lng: lgnValue },
          map: googleMap,
          icon: {
            url: iconList.icon1,
            // set marker width and height
            scaledSize: new google.maps.Size(50, 50),
          },
          title: 'Emerald Day',
        });
      })
      .catch((error) => {
        console.log('😱 Error: ', error);
      });

    console.log('lat and lng', latValue, lgnValue);
    return null;
  }

  if (!orders) {
    return <div>loading...</div>;
  }
  return <div ref={googleMapRef} style={{ width: 600, height: '100%' }} />;
}

export default GMap;
