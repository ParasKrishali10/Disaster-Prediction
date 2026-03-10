import React, { useState } from "react";

type Coords =
  | {
      lat: number;
      lon: number;
      accuracy: number | null;
      source: "gps" | "ip" | "unknown";
      timestamp?: number;
    }
  | null;

export default function LocationCard({ coords }: { coords: Coords }) {
  const [reverseAddress, setReverseAddress] = useState<string | null>(null);

  const reverseGeocode = async () => {
    if (!coords) return;
    try {
      // Example using Nominatim (OpenStreetMap) reverse geocode
      const q = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}`;
      const res = await fetch(q, { headers: { "User-Agent": "NextJS-Client" } });
      if (!res.ok) throw new Error("reverse geocode failed");
      const j = await res.json();
      setReverseAddress(j.display_name || "Address not found");
    } catch (e) {
      console.warn("Reverse geocode error", e);
      setReverseAddress("Reverse geocode failed");
    }
  };

  return (
    <div className="bg-[#10192d] p-5 rounded-xl shadow-md border border-gray-700">
      <h2 className="text-lg font-semibold mb-2">Current Location</h2>

      {!coords ? (
        <p className="text-gray-300">Waiting for location…</p>
      ) : (
        <>
          <p className="text-gray-300 mb-1">
            <strong>Lat:</strong> {coords.lat.toFixed(6)} <strong>Lon:</strong>{" "}
            {coords.lon.toFixed(6)}
          </p>
          <p className="text-sm text-gray-400">
            <strong>Accuracy:</strong>{" "}
            {coords.accuracy != null ? `${coords.accuracy.toFixed(0)} m` : "N/A"}{" "}
            • <strong>Source:</strong> {coords.source}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <em>
              Tip: For best result test this on a mobile device with GPS on (no
              VPN). Desktop often uses Wi-Fi or IP that can be off by kms.
            </em>
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={reverseGeocode}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Reverse Geocode
            </button>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lon}`}
              className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              Open in Maps
            </a>
          </div>

          {reverseAddress && (
            <div className="mt-3 text-sm text-gray-300 bg-[#0b1420] p-3 rounded">
              <strong>Address:</strong>
              <div>{reverseAddress}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
