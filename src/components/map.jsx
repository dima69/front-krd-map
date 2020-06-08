import React, { useEffect, useState } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import RenderMarkers from './markers';
import './Map.css';


export default function RenderMap({ vehiclesData }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (vehiclesData) {
      setShowChild(true);
    }
    return () => {
      setShowChild(false);
    };
  }, [vehiclesData]);

  return (
    <Map zoom={13} center={[45.032894, 39.021949]} zoomControl={false}>
      <TileLayer
        attribution="&amp;copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showChild && (
        <>
            {vehiclesData.trolleys && (
              <FeatureGroup className="trolleys-group">
                <RenderMarkers data={vehiclesData.trolleys} label="trolley" />
              </FeatureGroup>
            )}
            {vehiclesData.buses && (
              <FeatureGroup className="buses-group">
                <RenderMarkers data={vehiclesData.buses} label="bus" />
              </FeatureGroup>
            )}
            {vehiclesData.trams && (
              <FeatureGroup className="trams-group" opacity={markersOpacity.trams}>
                <RenderMarkers data={vehiclesData.trams} label="tram" />
              </FeatureGroup>
            )}
        </>
      )}
    </Map>
  );
}
