/// <reference types="google.maps" />
import React, { useEffect, useState } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Order, emeraldGet } from './Interfaces/EmeraldTypes';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0;

function GMap(): JSX.Element {
  const mapRef: HTMLDivElement | null = null;
  const googleMapRef = React.useRef<HTMLDivElement | null>(mapRef);
  const [ordersMap, setOrdersMap] = useState<Order[]>();
  let googleMap: google.maps.Map | undefined = undefined;

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    async function fetchEmeraldOrders(): Promise<void> {
      try {
        const getOrders = new Request(
          `https://emeraldorderfunction.azurewebsites.net/api/Function1?code=${process.env.REACT_APP_FUNC_KEY}`,
          {
            method: 'GET',
          }
        );

        const data = await emeraldGet<Order[]>(getOrders);

        if (data.length > 0) {
          console.log('data is ', data);
          setOrdersMap(data);

          googleMapScript.addEventListener('load', () => {
            googleMap = initGoogleMap();
            setMarkers(data);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchEmeraldOrders();
  }, []);

  // initialize the google map
  const initGoogleMap = (): google.maps.Map => {
    return new google.maps.Map(googleMapRef.current as HTMLElement, {
      center: { lat: 29.56638929999999, lng: -98.3988705 },
      zoom: 10,
    });
  };

  function addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    });
  }

  async function setMarkers(markerOrders: Order[]) {
    console.log('setMarkers call just made');
    return markerOrders.forEach(async (order) => {
      const address = `${order.Address}, ${order.City}, ${order.State} ${order.ZipCode}`;
      console.log('creating marker', address);

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      if (googleMap !== undefined) {
        addMarker({ lat, lng }, googleMap);
      }
    });
  }

  return <div ref={googleMapRef} style={{ width: 600, height: '100%' }} />;
}

export default GMap;
