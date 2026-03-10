import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8">
      {children}
    </div>
  );
}
