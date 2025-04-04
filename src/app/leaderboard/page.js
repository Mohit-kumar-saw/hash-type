// pages/leaderboard.js
"use client"

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import React from 'react';
import { StarIcon, FireIcon, ClockIcon } from '@heroicons/react/outline';

export default function Leaderboard() {
  // Dummy leaderboard data
  const dailyData = [
    { rank: 1, name: 'Kira', wpm: 63, accuracy: 96, avatar: '/images/avatat1.webp' },
    { rank: 2, name: 'Archer', wpm: 61, accuracy: 93, avatar: '/images/avatat1.webp' },
    { rank: 3, name: 'Cassidy', wpm: 62, accuracy: 92, avatar: '/images/avatat1.webp' },
    { rank: 4, name: 'Avery', wpm: 57, accuracy: 91, avatar: '/images/avatat1.webp' },
    { rank: 5, name: 'Morgan', wpm: 59, accuracy: 89, avatar: '/images/avatat1.webp' },
  ];

  const weeklyData = [
    { rank: 1, name: 'Kira', wpm: 70, accuracy: 98, avatar: '/images/avatat1.webp' },
    { rank: 2, name: 'Cassidy', wpm: 65, accuracy: 95, avatar: '/images/avatat1.webp' },
    { rank: 3, name: 'Morgan', wpm: 64, accuracy: 93, avatar: '/images/avatat1.webp' },
    { rank: 4, name: 'Archer', wpm: 62, accuracy: 91, avatar: '/images/avatat1.webp' },
    { rank: 5, name: 'Avery', wpm: 60, accuracy: 90, avatar: '/images/avatat1.webp' },
  ];

  const allTimeData = [
    { rank: 1, name: 'Cassidy', wpm: 75, accuracy: 99, avatar:'/images/avatat1.webp' },
    { rank: 2, name: 'Kira', wpm: 72, accuracy: 98, avatar: '/images/avatat1.webp' },
    { rank: 3, name: 'Morgan', wpm: 71, accuracy: 97, avatar: '/images/avatat1.webp' },
    { rank: 4, name: 'Avery', wpm: 69, accuracy: 96, avatar: '/images/avatat1.webp' },
    { rank: 5, name: 'Archer', wpm: 67, accuracy: 95, avatar: '/images/avatat1.webp' },
  ];

  // State to toggle between daily, weekly, and all-time tabs
  const [activeTab, setActiveTab] = useState('daily');

  // Function to render leaderboard data
  const renderData = () => {
    let data;
    switch (activeTab) {
      case 'weekly':
        data = weeklyData;
        break;
      case 'all-time':
        data = allTimeData;
        break;
      default:
        data = dailyData;
    }
    return data.map((item) => (
      <tr key={item.rank} className="border-b border-gray-700/50">
        <td className="py-4 px-6">
          <div className="flex items-center gap-2">
            {item.rank === 1 ? (
              <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/10 rounded-lg">
                <StarIcon className="w-5 h-5 text-yellow-500" />
              </div>
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-lg text-gray-400 font-medium">
                {item.rank}
              </div>
            )}
          </div>
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full" />
            </div>
            <div className="text-white font-medium">{item.name}</div>
          </div>
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center gap-2">
            <FireIcon className="w-5 h-5 text-orange-500" />
            <span className="text-white font-bold">{item.wpm}</span>
            <span className="text-gray-400">WPM</span>
          </div>
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-16 rounded-full ${
              item.accuracy >= 95 ? 'bg-green-500' :
              item.accuracy >= 90 ? 'bg-yellow-500' : 'bg-orange-500'
            }`}>
              <div className="h-full rounded-full" style={{ width: `${item.accuracy}%` }}></div>
            </div>
            <span className="text-white font-bold">{item.accuracy}%</span>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 w-full mt-[388px]">
      <div className="max-w-[75%] mx-auto"  >
      <Navbar />
      </div>

      {/* Leaderboard Container */}
      <div className="max-w-[80%] mx-auto"  >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="max-w-[1920px] mx-auto">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
              <p className="text-gray-400 mt-1">Top performers in typing challenges</p>
            </div>
          </header>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg w-fit mb-6">
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'daily'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab('daily')}
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>Daily</span>
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'weekly'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab('weekly')}
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>Weekly</span>
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'all-time'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab('all-time')}
            >
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5" />
                <span>All-time</span>
              </div>
            </button>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium w-[10%]">Rank</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium w-[40%]">Player</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium w-[25%]">Speed</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium w-[25%]">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {renderData()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
