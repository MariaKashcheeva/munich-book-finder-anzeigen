
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Bookstore = {
  address: string;
  label: string;
  coords: [number, number];
};

interface MapProps {
  token: string;
  center: [number, number];
  bookstores: Bookstore[];
}

const Map: React.FC<MapProps> = ({ token, center, bookstores }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom: 11.2,
      pitch: 35,
      projection: "globe",
    });

    // Add nav controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );
    map.current.scrollZoom.disable();

    // Add atmosphere
    map.current.on("style.load", () => {
      map.current?.setFog({
        color: "rgb(255, 255, 255)",
        "high-color": "rgb(200, 200, 225)",
        "horizon-blend": 0.3,
      });
    });

    // Add bookstore pins
    bookstores.forEach((store, i) => {
      const el = document.createElement("div");
      el.className = "bookstore-pin";
      el.style.width = "34px";
      el.style.height = "34px";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.background = "rgba(32,200,84,0.13)";
      el.style.borderRadius = "100%";
      el.innerHTML = `
        <svg width="24" height="24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M12 21c-4.8-4.58-8-7.36-8-11A8 8 0 0 1 20 10c0 3.64-3.2 6.42-8 11Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `;

      new mapboxgl.Marker(el)
        .setLngLat(store.coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 20 }).setHTML(
            `<strong>${store.label}</strong><br/>${store.address}`
          )
        )
        .addTo(map.current!);
    });

    // Responsive: resize map when container changes size
    const resize = () => map.current?.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      map.current?.remove();
    };
    // eslint-disable-next-line
  }, [token, bookstores, center]);

  return (
    <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default Map;
