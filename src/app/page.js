"use client";

import { useState, useEffect } from "react";
import './globals.css';
import Navbar from "../components/Navbar";
import TypingGame from "../components/Typinggame";
import Loading from "./loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loading screen for demonstration purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TypingGame />
      </div>
    </main>
  );
}
