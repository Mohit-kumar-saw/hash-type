"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { UserCircleIcon, MoonIcon, MusicalNoteIcon, ArrowLeftOnRectangleIcon, TrashIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 w-full mt-[278px]">
      <div className="max-w-[75%] mx-auto"  >
      <Navbar />
      </div>

      <div className="max-w-[80%] mx-auto"  >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1920px] mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400 mt-1">Customize your typing experience</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <UserCircleIcon className="w-6 h-6 text-purple-500" />
                  Your Profile
                </h2>
                
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <img
                        src="/images/avatat1.webp"
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-2 border-purple-500/50"
                      />
                      <button className="mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        Change Picture
                      </button>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        value="David"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 h-fit">
              <h2 className="text-xl font-semibold text-white mb-6">Preferences</h2>
              
              <div className="space-y-4">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MoonIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-200">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDarkMode ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Music Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MusicalNoteIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-200">Background Music</span>
                  </div>
                  <button
                    onClick={() => setIsMusicEnabled(!isMusicEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isMusicEnabled ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isMusicEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Account Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                Logout
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                <TrashIcon className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
