/// <reference types="google.maps" />
import React, { useEffect, useState } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Order, emeraldGet } from './Interfaces/EmeraldTypes';
import moment from 'moment';

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0;

function GMap(): JSX.Element {
  const mapRef: HTMLDivElement | null = null;
  const googleMapRef = React.useRef<HTMLDivElement | null>(mapRef);
  // eslint-disable-next-line
  const [ordersMap, setOrdersMap] = useState<Order[]>();
  let googleMap: google.maps.Map | undefined = undefined;

  useEffect(() => {
    const googleMapScript = document.getElementById('googlescript');
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
          const currentDayOrders = data.filter((day) => {
            if (
              moment(day.DeliveryDate).format('MM-DD-YYYY') ==
              moment(new Date()).format('MM-DD-YYYY')
            ) {
              return day;
            }
          });
          setOrdersMap(currentDayOrders);

          if (googleMapScript !== null) {
            googleMap = initGoogleMap();
            setMarkers(currentDayOrders);
          }
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

  function addMarker(
    location: google.maps.LatLngLiteral,
    map: google.maps.Map,
    order: Order
  ): void {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    const newMarker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: location,
      label: `${labels[labelIndex++ % labels.length]} ${order.Name}`,
      map: map,
    });

    const mapAddress = `${order.Address} ${order.City},${order.State}`;
    const encodedAddress = encodeURI(mapAddress);
    const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    const contentString = `<h3>
        <a href='${addressToUse}'>${order.Address}</a>
      </h3>
    `;

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    newMarker.addListener('click', () => {
      infowindow.open(map, newMarker);
    });
  }

  async function setMarkers(markerOrders: Order[]): Promise<void> {
    return markerOrders.forEach(async (order) => {
      const address = `${order.Address}, ${order.City}, ${order.State} ${order.ZipCode}`;

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      if (googleMap !== undefined) {
        addMarker({ lat, lng }, googleMap, order);
      }
    });
  }

  return (
    <div
      ref={googleMapRef}
      style={{ width: 600, height: '100%', position: 'absolute' }}
    />
  );
}

export default GMap;
