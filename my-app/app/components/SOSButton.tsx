"use client";

export default function SOSButton({ coords }: { coords: any }) {
  const handleSOS = async () => {
    if (!coords) {
      alert("Location not available");
      return;
    }

    const res = await fetch("/api/sendsms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: coords.lat,
        lon: coords.lon,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("🚨 SOS Sent Successfully!");
    } else {
      alert("❌ Failed to send SOS.");
    }
  };

  return (
    <div
      onClick={handleSOS}
      className="w-64 h-64 bg-red-500 flex flex-col items-center justify-center rounded-full cursor-pointer transition hover:scale-105 shadow-xl"
    >
      <span className="text-3xl font-bold">SOS</span>
      <span className="mt-1 text-lg">Emergency</span>
    </div>
  );
}
