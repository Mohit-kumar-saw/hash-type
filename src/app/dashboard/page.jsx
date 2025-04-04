// pages/dashboard.js

import Footer from "../../components/Footer";
import Graph from "../../components/Graph";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import { 
  ChartBarIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  StarIcon 
} from '@heroicons/react/outline';

export default function Dashboard() {
  // Dummy data
  const accuracy = 98;
  const lastPractice = "2 days ago";
  const typedWords = 5000;
  const wpm = 59.5;
  const accuracyRate = 59.5;
  const speedChange = "+2.3%";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 w-full mt-[448px]">
     <div className="max-w-[75%] mx-auto"  >
      <Navbar />
     </div>
      <div className="max-w-[80%] mx-auto"  >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-6 max-w-[1920px] mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Track your typing progress</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Start New Test
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-[1920px] mx-auto">
          {/* WPM Stat */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average WPM</p>
                <p className="text-2xl font-bold text-white mt-1">{wpm}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span className="text-green-400">{speedChange}</span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </div>

          {/* Accuracy Stat */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Accuracy Rate</p>
                <p className="text-2xl font-bold text-white mt-1">{accuracy}%</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <StarIcon className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span className="text-gray-400">Consistently accurate</span>
            </div>
          </div>

          {/* Words Typed */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Words Typed</p>
                <p className="text-2xl font-bold text-white mt-1">{typedWords}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span className="text-gray-400">This month</span>
            </div>
          </div>

          {/* Last Practice */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Last Practice</p>
                <p className="text-2xl font-bold text-white mt-1">{lastPractice}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span className="text-yellow-400">Keep practicing!</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1920px] mx-auto">
          {/* Progress Graph */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Typing Progress</h2>
            <div className="h-[300px]">
              <Graph />
            </div>
          </div>

          {/* Achievement Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-center">
              <div className="inline-flex p-4 bg-purple-500/10 rounded-full mb-4">
                <StarIcon className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Achievement Unlocked!</h3>
              <p className="text-gray-400 mb-4">You&apos;ve reached a new milestone in your typing journey.</p>
              <div className="space-y-3">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Current Level</p>
                  <p className="text-lg font-bold text-white">Professional</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Next Goal</p>
                  <p className="text-lg font-bold text-white">65 WPM</p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  View All Achievements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
