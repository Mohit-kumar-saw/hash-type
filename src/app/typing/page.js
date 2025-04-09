"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TypingGame from "../../components/Typinggame";
import Loading from "../loading";

export default function TypingPage() {
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
    <div className="h-[100%] bg-gray-900 w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 lg:px-8">
        <Navbar />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TypingGame />
      </main>
    </div>
  );
} 