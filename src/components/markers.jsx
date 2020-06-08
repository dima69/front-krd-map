import React from 'react';
import { Marker, Popup } from 'react-leaflet';
// import { divIcon, DivIcon, icon, Icon } from 'leaflet';
import L from 'leaflet';


const trolleyIcon = new L.Icon({
  // iconUrl: './trolley-icon.svg',
  iconUrl: require('./Trolley.svg'),
  // iconRetinaUrl: '../trolley-icon.svg',
  // iconAnchor: [20, 40],
  // popupAnchor: [0, -35],
  // iconSize: [40, 40],
  className: 'vehicle-trolley-icon',
});

const busIcon = new L.Icon({
  // iconUrl: './bus-icon.svg',
  iconUrl: require('./Bus.svg'),
  // iconRetinaUrl: '../bus-icon.svg',
  // iconAnchor: [20, 40],
  // popupAnchor: [0, -35],
  // iconSize: [40, 40],
  className: 'vehicle-bus-icon',
});

const tramIcon = new L.Icon({
  // iconUrl: './tram-icon.svg',
  iconUrl: require('./Tram.svg'),
  // iconRetinaUrl: '../tram-icon.svg',
  // iconAnchor: [20, 40],
  // popupAnchor: [0, -35],
  // iconSize: [40, 40],
  className: 'vehicle-tram-icon',
});

const iconsSet = {
  trolley: trolleyIcon,
  bus: busIcon,
  tram: tramIcon,
};

export default function RenderMarkers({ data, label }) {
  const markers = [];
  const routes = Object.keys(data);
  routes.forEach((routeId) => {
    data[routeId].map((vehicle) => {
      const [lat, lng, speed, degree, vehicleId] = vehicle;
      return markers.push(
        <Marker key={`marker-${label}-${vehicleId}`} position={[lng, lat]} icon={iconsSet[label]}>
          <Popup>
            {`label: ${label}`}
            <br />
            {`vehicleId: ${vehicleId}`}
            <br />
            {`routeId: ${routeId}`}
            <br />
            {`speed: ${speed}`}
            <br />
            {`degree: ${degree}`}
          </Popup>
        </Marker>,
      );
    });
  });
  return markers;
}
