"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  useEffect(() => {
    // Ensure it only runs on the client
    if (typeof window !== "undefined") {
      // Avoid reinitializing if already exists
      if (document.getElementById("map")?.innerHTML === "") {
        const map = L.map("map").setView([28.6448, 77.216721], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
      }
    }
  }, []);

  return (
    <div
      id="map"
      style={{ height: "100vh", width: "100%" }}
    />
  );
} 