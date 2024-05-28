import {
  LoadScript,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import React from "react";

const libraries = ["places", "geometry"];
const mapContainerStyle = {
  width: "730px",
  height: "300px",
  display: "flex",
  wrap: "wrap",
};

const GoogleMaps = (coordinates) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD9B-0oisrbexDlVkhMzoHYyj0lLTE4EXc",
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  const markerData = {
    lat: coordinates.lat,
    lng: coordinates.lng,
    title: "My Custom Marker",
    description: "This is a custom marker I placed!",
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={70}
      center={{ lat: coordinates.lat, lng: coordinates.lng }}
    >
      <Marker
        key={markerData.lat + markerData.lng}
        position={{ lat: markerData.lat, lng: markerData.lng }}
        title={markerData.title}
        onClick={(event) => {
          // Access marker position here:
          const clickedMarkerLat = event.latLng.lat();
          const clickedMarkerLng = event.latLng.lng();
          // Use these values to zoom the map
        }}
      />
    </GoogleMap>
  );
};

export default GoogleMaps;
