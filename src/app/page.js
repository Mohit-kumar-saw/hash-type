"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import React from "react";
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  KeyIcon, 
  UserGroupIcon 
} from '@heroicons/react/outline';

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-[100%] bg-gray-900 w-full">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-4">
          <Navbar />
        </header>
      </div>

      {/* Main Content */}
      <main className="w-full bg-gray-900">
        {/* Hero Section */}
        <section className="text-center py-16 px-8 bg-gray-900">
          <div className="flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <img src="/images/certificate.svg" alt="Certificate" className="w-56 mb-6 drop-shadow-2xl" />
              <div className="absolute inset-0 bg-purple-500/10 blur-3xl -z-10 rounded-full"></div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Get a free typing certificate
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
              Learn to type faster with HealthType typing tutor. Take our typing lessons for free.
            </p>
            <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer" onClick={() => router.push("/typing")}>
              Get Started
              <SparklesIcon className="w-5 h-5" />
            </div>
          </div>
        </section>

        {/* Section 2 - Certificate Promo */}
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                  <AcademicCapIcon className="w-12 h-12 text-purple-500 mb-6" />
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Take a keyboarding speed test and get your certificate
                  </h2>
                  <p className="text-gray-400 mb-6 text-lg">
                    Take an online typing test to find out how quickly you can type and get a certificate with your name and score.
                  </p>
                  <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer" onClick={() => router.push("/typing")}>
                    Get Certificate
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <img src="/images/certificates.svg" alt="Keyboard Test" className="w-full max-w-[500px] drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Typing Customization */}
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                  <KeyIcon className="w-12 h-12 text-purple-500 mb-6" />
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Make your typing more cool and awesome!
                  </h2>
                  <ul className="text-gray-400 space-y-4 mb-6 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      Be cool while writing texts! Style your typing to reflect your personality with awesome fonts.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      Type the way you want! Set a profile and take tests to suit your typing preferences.
                    </li>
                  </ul>
                  <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer" onClick={() => router.push("/typing")}>
                    Contact Us
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 h-40 transform hover:scale-105 transition-all"></div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 h-40 transform hover:scale-105 transition-all"></div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 h-40 transform hover:scale-105 transition-all"></div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 h-40 transform hover:scale-105 transition-all"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["Basic", "Pro", "Enterprise"].map((plan, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 transform hover:scale-105 transition-all">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <img src="/images/avatat1.webp" alt="User" className="w-full h-full rounded-full border-2 border-purple-500/50" />
                    <div className="absolute inset-0 bg-purple-500/10 blur-xl -z-10 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{plan} Plan</h3>
                  <p className="text-2xl font-semibold mb-6 text-purple-400">$128.90</p>
                  <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer w-full justify-center" onClick={() => router.push("/typing")}>
                    Select Plan
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    
      <Footer />
    </div>
  );
}
