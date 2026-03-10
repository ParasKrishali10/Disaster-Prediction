"use client";

import { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import LocationCard from "../components/LocationCard";
import HospitalList from "../components/HospitalList";
import SOSButton from "../components/SOSButton";

export default function SOSPage() {
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
    accuracy: number | null;
    source: "gps" | "ip" | "unknown";
    timestamp?: number;
  } | null>(null);

  // Try to get high-accuracy GPS first (watchPosition)
  useEffect(() => {
    let watchId: number | null = null;
    if ("geolocation" in navigator) {
      try {
        watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setCoords({
              // Dehradun

              lat: pos.coords.latitude,
              lon: pos.coords.longitude,

              // Pauri
          //     lat:30.15,
          // lon:78.77,

          //     lat:30.1830,
          // lon:78.6952,
              accuracy: pos.coords.accuracy ?? null,
              source: "gps",
              timestamp: pos.timestamp,
            });
          },
          (err) => {
            console.warn("Geolocation watchPosition error:", err);
            // On permission denied or other errors, fallback to IP geolocation:
            if (err.code === err.PERMISSION_DENIED) {
              runIpFallback();
            } else {
              // still attempt ip fallback
              runIpFallback();
            }
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000,
          }
        );
      } catch (e) {
        console.error("geolocation exception", e);
        runIpFallback();
      }
    } else {
      runIpFallback();
    }

    async function runIpFallback() {
      try {
        // simple free IP geolocation fallback
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("ip fallback failed");
        const data = await res.json();
        setCoords({
          // lat: parseFloat(data.latitude) || 0,
          // lon: parseFloat(data.longitude) || 0,

          // Pauri
          // lat: parseFloat("30.3165") || 0,
          // lon: parseFloat("78.0322") || 0,

          // Ghurdauri
          lat: parseFloat("30.1830") || 0,
          lon: parseFloat("78.6952") || 0,

          // lat: parseFloat("30.15") || 0,
          // lon: parseFloat("78.77") || 0,

          accuracy: null,
          source: "ip",
          timestamp: Date.now(),
        });
      } catch (e) {
        console.warn("IP fallback failed", e);
        setCoords((c) =>
          c
            ? c
            : {
                lat: 0,
                lon: 0,
                accuracy: null,
                source: "unknown",
                timestamp: Date.now(),
              }
        );
      }
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="text-white flex flex-col h-screen">
      <TopHeader />
      <div className="flex flex-1">
        <div className="w-2/3 p-6">
          <LocationCard coords={coords} />
          <div className="flex items-center justify-center mt-12">
            <SOSButton coords={coords}  />
          </div>
          {/* Preview design image (local file) */}
          <div className="mt-6">
            <img
              src="/mnt/data/8d093353-9c05-4205-8016-78cd2a201fa1.png"
              alt="design preview"
              className="w-full max-w-lg rounded-md border border-gray-700"
            />
          </div>
        </div>

        <div className="w-1/3 border-l border-gray-700 p-6 overflow-y-auto">
          <HospitalList coords={coords} />
        </div>
      </div>
    </div>
  );
}
