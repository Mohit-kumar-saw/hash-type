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
    
    <>

      <main className="h-[100vh] p-10  ">
        <Navbar />
        <TypingGame />
      </main>
    </>
    
  );
}
