import React from "react";

export default function LoadingSplash() {
  return (
    <main className="flex flex-col justify-center items-center relative w-full h-screen">
      <span className="w-48 h-48 rounded-full border-4 border-gray-600 border-t-blue-500 border-r-blue-500 animate-spin" />      
      <img alt="logo" src="/logo.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </main>
  );
}
