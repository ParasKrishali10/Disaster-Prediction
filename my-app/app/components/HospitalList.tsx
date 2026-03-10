"use client";

import { useEffect, useState } from "react";

interface Coords {
  lat: number;
  lon: number;
  accuracy: number | null;
  source: string;
}

interface Hospital {
  name: string;
  distance: number; // in km
  time: number;     // eta in minutes
  status: "available" | "busy";
}

export default function HospitalList({ coords }: { coords: Coords | null }) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!coords) return;
    const {lat,lon}=coords
    async function loadHospitals() {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

        const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        const items: Hospital[] = data.features.map((feature: any) => {
          const name = feature.properties.name || "Unnamed Hospital";
          const distanceMeters = feature.properties.distance;
          const distanceKm = distanceMeters / 1000;

          // Simple travel time estimate (walking/car mixed)
          const eta = Math.round((distanceKm / 30) * 60); // assume 30 km/h

          return {
            name,
            distance: Math.round(distanceKm * 10) / 10,
            time: eta < 5 ? 5 : eta,
            status: Math.random() > 0.5 ? "available" : "busy",
          };
        });

        setHospitals(items);
      } catch (e) {
        console.error("ERROR fetching hospitals", e);
      }
      setLoading(false);
    }

    loadHospitals();
  }, [coords?.lat, coords?.lon]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Nearby Hospitals</h2>
      <p className="text-gray-400 mb-4">Hospitals within 5 km radius</p>

      {loading && <p className="text-gray-300">Searching hospitals...</p>}

      {!loading && hospitals.length === 0 && (
        <p className="text-gray-400">No hospitals found nearby.</p>
      )}

      {hospitals.map((h, i) => (
        <div
          key={i}
          className="bg-[#10192d] p-4 mb-3 rounded-xl border border-gray-700"
        >
          <h3 className="text-lg font-semibold">{h.name}</h3>
          <p className="text-sm text-gray-400">📍 {h.distance} km</p>

          <div className="flex justify-between mt-2">
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                h.status === "available"
                  ? "bg-green-700 text-green-100"
                  : "bg-red-700 text-red-100"
              }`}
            >
              {h.status}
            </span>
            <span className="text-sm text-gray-300">⏱ {h.time} min</span>
          </div>
        </div>
      ))}
    </div>
  );
}
