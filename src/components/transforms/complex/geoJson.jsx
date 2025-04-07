import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper function to calculate the relative brightness (luma) of an element's background color
function getLuma(el) {
  const style = window.getComputedStyle(el);
  const [r, g, b] = style.backgroundColor
    .replace(/^(rgb|rgba)\(/, "")
    .replace(/\)$/, "")
    .replace(/\s/g, "")
    .split(",")
    .map(Number);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// Determine the map theme based on the provided theme or the background color's luma
function getTheme(theme = "light", el) {
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return getLuma(el) < 0.5 ? "dark" : "light";
}

// Component to adjust the map view to fit the GeoJSON data
const FitBounds = ({ data }) => {
  const map = useMap();
  useEffect(() => {
    if (data) {
      const geoJsonLayer = L.geoJSON(data);
      map.fitBounds(geoJsonLayer.getBounds());
    }
  }, [data, map]);
  return null;
};

const GeoJSONTransform = ({ data, metadata, theme = "light" }) => {
  const containerRef = useRef(null);

  // Determine the tile layer URL and options
  const getTileLayer = () => {
    const defaultUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    if (!containerRef.current) {
      return { urlTemplate: defaultUrl, layerOptions: {} };
    }
    const appliedTheme = getTheme(theme, containerRef.current);
    const urlTemplate =
      (metadata && metadata.url_template) ||
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=YOUR_MAPBOX_ACCESS_TOKEN";
    const layerOptions = (metadata && metadata.layer_options) || {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      id: `mapbox.${appliedTheme}`,
    };
    return { urlTemplate, layerOptions };
  };

  const { urlTemplate, layerOptions } = getTileLayer();

  return (
    <div ref={containerRef} style={{ height: 600, width: "100%" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer url={urlTemplate} {...layerOptions} />
        {data && <GeoJSON data={data} />}
        {data && <FitBounds data={data} />}
      </MapContainer>
    </div>
  );
};

export default GeoJSONTransform;
