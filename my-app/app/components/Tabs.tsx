"use client";

import { useState } from "react";
import clsx from "clsx";

interface TabProps {
  tabs: string[];
  onChange: (value: string) => void;
}

export default function Tabs({ tabs, onChange }: TabProps) {
  const [active, setActive] = useState(tabs[0]);

  const handleSelect = (tab: string) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleSelect(tab)}
          className={clsx(
            "flex-1 py-2 rounded-xl font-medium",
            active === tab
              ? "bg-white shadow-sm"
              : "text-gray-500"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
