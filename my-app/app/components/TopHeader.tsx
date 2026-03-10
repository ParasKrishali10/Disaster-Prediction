export default function TopHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#0f1425]">
      <div className="text-lg font-bold flex items-center gap-2">
        <span className="text-red-400 text-xl">⚠️</span> Emergency SOS
      </div>

      <div className="flex items-center gap-6 text-gray-300">
        <span>📞</span>
        <span>🔔</span>
        <span>⚙️</span>
        <span>👤</span>
      </div>
    </div>
  );
}
