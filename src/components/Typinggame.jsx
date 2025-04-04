import { useState, useEffect, useRef } from "react";
import "../app/globals.css";
import Timer from "./Timer";
import Modal from "./Modal";
import Image from "next/image";
import Graph from "./Graph";
import Button from "./ui/Button";
import { ChevronDownIcon, ArrowPathIcon, PlayIcon } from '@heroicons/react/24/solid';

const DIFFICULTY_LEVELS = {
  BEGINNER: {
    name: 'Beginner',
    wordsList: "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us",
    timeOptions: [30, 60, 90]
  },
  INTERMEDIATE: {
    name: 'Intermediate',
    wordsList: "user123 data_file system32 config.js test-case user@domain error_404 debug_log main.cpp index.html api/v1 db_backup src/app/ git_push npm_start localhost:3000 http://dev README.md package.json .gitignore node_modules dist/build user-profile admin_panel test_suite dev-tools 127.0.0.1 front-end back-end API_KEY v2.0.1 debug:true error:false port=8080 path/to/file $HOME ~/.config",
    timeOptions: [30, 60, 120]
  },
  ADVANCED: {
    name: 'Advanced',
    wordsList: "SELECT * FROM users; git push origin main; npm install --save-dev; const API_KEY = '123xyz'; function calculateSum(a, b) { return a + b; }; https://api.example.com/v2/users?id=123; <div className='container'>Content</div>; try { await fetch(url) } catch (err) {}; @media (max-width: 768px) { .nav { display: flex; } }; /^[A-Za-z0-9]+$/; kubectl get pods -n default; docker-compose up -d; ssh user@192.168.1.100; sudo systemctl restart nginx; console.log('Debug:', data); import { useState, useEffect } from 'react';",
    timeOptions: [30, 60, 180]
  }
};

const TypingGame = () => {
  const [difficulty, setDifficulty] = useState('BEGINNER');
  const [selectedTime, setSelectedTime] = useState(30);
  const [words, setWords] = useState([]);
  const [typedWord, setTypedWord] = useState("");
  const [correctWords, setCorrectWords] = useState(0);
  const [timer, setTimer] = useState(null);
  const [gameStart, setGameStart] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameOverState, setGameOverState] = useState(false);
  const [totalTypedLetters, setTotalTypedLetters] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [lastWPM, setLastWPM] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wordsRef = useRef(null);
  const cursorRef = useRef(null);
  const performanceInterval = useRef(null);
  const typingContainerRef = useRef(null);

  useEffect(() => {
    newGame();
  }, [difficulty, selectedTime]);

  const randomWord = () => {
    const wordsList = DIFFICULTY_LEVELS[difficulty].wordsList.split(" ");
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
  };

  const formatWord = (word, wordIndex) => {
    return (
      <div
        className={`word inline-block mx-1.5 my-1 font-bold ${
          wordIndex === 0 ? "current" : ""
        }`}
        key={wordIndex}
      >
        {word.split("").map((letter, letterIndex) => (
          <span
            className={`letter ${
              letterIndex === 0 && wordIndex === 0 ? "current" : ""
            }`}
            key={letterIndex}
          >
            {letter}
          </span>
        ))}
        <span className="letter opacity-0 w-0">{"."}</span>
      </div>
    );
  };

  const moveCursor = (element) => {
    if (element && cursorRef.current) {
      const rect = element.getBoundingClientRect();
      const containerRect = typingContainerRef.current.getBoundingClientRect();
      cursorRef.current.style.top = `${rect.top - containerRect.top + typingContainerRef.current.scrollTop}px`;
      cursorRef.current.style.left = `${rect.left - containerRect.left}px`;
    }
  };

  const moveCursorToWordEnd = (wordElement) => {
    if (wordElement && cursorRef.current) {
      const rect = wordElement.getBoundingClientRect();
      const containerRect = typingContainerRef.current.getBoundingClientRect();
      const wordWidth = wordElement.offsetWidth;
      cursorRef.current.style.top = `${rect.top - containerRect.top + typingContainerRef.current.scrollTop}px`;
      cursorRef.current.style.left = `${rect.left - containerRect.left + wordWidth}px`;
    }
  };

  const newGame = () => {
    if (timer) {
        clearInterval(timer);
        setTimer(null);
    }

    setIsGameActive(false);
    const newWords = Array.from({ length: 50 }, () => randomWord());
    setWords(newWords);
    setTypedWord("");
    setCorrectWords(0);
    setTimeLeft(selectedTime);
    setCorrectLetters(0);
    setGameStart(null);
    setGameOverState(false);
    setIsModalOpen(false);
    setTotalTypedLetters(0);
    setMistakes(0);
    setStreak(0);
    setPerformanceData([]);
    setLastWPM(0);

    // Reset UI elements
    const words = document.querySelectorAll(".word");
    words.forEach((word) => {
      word.classList.remove("current");
      word.querySelectorAll(".letter").forEach((letter) => {
        letter.classList.remove("current", "correct", "incorrect");
      });
    });

    // Focus on the input area after reset
    if (wordsRef.current) {
      wordsRef.current.focus();
    }

    const firstWord = document.querySelector(".word");
    if (firstWord) {
      firstWord.classList.add("current");
      const firstLetter = firstWord.querySelector(".letter");
      if (firstLetter) {
        firstLetter.classList.add("current");
        moveCursor(firstLetter);
      }
    }
  };

  const startGame = () => {
    if (wordsRef.current) {
      wordsRef.current.focus();
      startTimer();
    }
  };

  const handleKeyUp = (ev) => {
    if (gameOverState) return;

    const key = ev.key;
    const currentWord = document.querySelector(".word.current");
    const currentLetter = document.querySelector(".letter.current");
    const expectedLetter = currentLetter?.innerHTML || " ";
    const isLetter = key.length === 1 && key !== " ";
    const isSpace = key === " ";
    const isBackspace = key === "Backspace";

    // Remove the auto-start on first letter
    if (!isGameActive) return;

    if (isLetter) {
      setTypedWord((prev) => prev + key);
      setTotalTypedLetters((prev) => prev + 1);

      if (expectedLetter === key) {
        currentLetter.classList.add("correct");
        setCorrectLetters((prev) => prev + 1);
        currentLetter.classList.remove("incorrect");
        setStreak(prev => {
          const newStreak = prev + 1;
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
          }
          return newStreak;
        });
      } else {
        currentLetter.classList.add("incorrect");
        currentLetter.classList.remove("correct");
        setMistakes(prev => prev + 1);
        setStreak(0);
      }

      const nextLetter = currentLetter?.nextElementSibling;
      if (nextLetter) {
        currentLetter.classList.remove("current");
        nextLetter.classList.add("current");
        moveCursor(nextLetter);
      } else {
        moveCursorToWordEnd(currentWord);
      }
    }

    if (isSpace) {
      const expectedWord = currentWord?.textContent.replace(".", "").trim();
      if (typedWord.trim() === expectedWord) {
        setCorrectWords((prev) => prev + 1);
      }

      setTypedWord("");

      const nextWord = currentWord?.nextElementSibling;
      if (nextWord) {
        currentWord.classList.remove("current");
        nextWord.classList.add("current");
        const firstLetter = nextWord.querySelector(".letter");
        currentLetter?.classList.remove("current");
        firstLetter.classList.add("current");
        moveCursor(firstLetter);
        autoScroll();
      }
    }

    if (isBackspace) {
      const previousLetter = currentLetter?.previousElementSibling;

      if (previousLetter) {
        setTypedWord((prev) => prev.slice(0, -1));
        previousLetter.classList.add("current");
        previousLetter.classList.remove("correct", "incorrect");
        currentLetter.classList.remove("current", "correct", "incorrect");
        moveCursor(previousLetter);
      } else if (currentWord) {
        const previousWord = currentWord.previousElementSibling;
        if (previousWord) {
          currentWord.classList.remove("current");
          previousWord.classList.add("current");
          const lastLetterOfPrevWord = previousWord.querySelector(".letter:last-child");
          currentLetter?.classList.remove("current");
          lastLetterOfPrevWord.classList.add("current");
          lastLetterOfPrevWord.classList.remove("correct", "incorrect");
          moveCursor(lastLetterOfPrevWord);
          setTypedWord((prev) => prev.slice(0, -1));
        }
      }
    }
  };

  const startTimer = () => {
    setIsGameActive(true);
      const startTime = Date.now();
      setGameStart(startTime);
    let lastPerformanceCheck = startTime;

      const newTimer = setInterval(() => {
        const msPassed = Date.now() - startTime;
      const sLeft = Math.round((selectedTime * 1000 - msPassed) / 1000);
      
      if (Date.now() - lastPerformanceCheck >= 2000) {
        const currentWPM = calculateCurrentWPM(msPassed / 1000);
        setLastWPM(currentWPM);
        setPerformanceData(prev => [...prev, {
          time: Math.round((msPassed / 1000)),
          wpm: currentWPM
        }]);
        lastPerformanceCheck = Date.now();
      }

        if (sLeft <= 0) {
          setTimeLeft(0);
          gameOver();
          clearInterval(newTimer);
          return;
        }
        setTimeLeft(sLeft);
      }, 1000);

      setTimer(newTimer);
  };

  const calculateCurrentWPM = (timeTaken) => {
    if (timeTaken <= 0) return 0;
    const wpm = (correctWords / (timeTaken / 60));
    return Math.round(wpm);
  };

  const gameOver = () => {
    if (timer) clearInterval(timer);
    setTimer(null);
    setGameOverState(true);
    setIsModalOpen(true);
  };

  const calculateWPM = () => {
    const timeTaken = selectedTime - timeLeft;
    if (timeTaken <= 0) return 0;
    const wpm = (correctWords / timeTaken) * 60;
    return Math.round(wpm);
  };

  const calculateAccuracy = () => {
    if (totalTypedLetters === 0) return 0;
    return Math.round((correctLetters / totalTypedLetters) * 100);
  };

  const autoScroll = () => {
    if (typingContainerRef.current) {
      const container = typingContainerRef.current;
      const currentWord = container.querySelector('.word.current');
      
      if (currentWord) {
        const containerRect = container.getBoundingClientRect();
        const wordRect = currentWord.getBoundingClientRect();
        
        // Check if the current word is below the visible area
        if (wordRect.bottom > containerRect.bottom) {
          container.scrollTop += wordRect.height + 8; // scroll by line height + some padding
        }
        // Check if the current word is above the visible area
        else if (wordRect.top < containerRect.top) {
          container.scrollTop -= wordRect.height + 8;
        }
      }
    }
  };

  return (
    <div className="min-h-[90%] bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        {/* Header Section - Reduced margin */}
        <div className="flex justify-between items-start mb-3">
          {/* Timer Section */}
          {isGameActive && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 min-w-[90px]">
                <div className="text-3xl font-bold text-purple-400 tabular-nums">{timeLeft}</div>
                <div className="text-gray-400 text-xs">seconds</div>
              </div>
            </div>
          )}

          {/* Game Controls */}
          <div className="flex items-center gap-2">
            {!isGameActive ? (
              <>
                {/* Difficulty Dropdown - Only shown before game starts */}
                <div className="relative group">
                  <button 
                    className="px-3 py-1.5 rounded-lg bg-gray-800 text-white flex items-center gap-2 hover:bg-gray-700 transition-colors min-w-[130px] justify-between"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{DIFFICULTY_LEVELS[difficulty].name}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-10">
                      {Object.keys(DIFFICULTY_LEVELS).map((level) => (
                        <button
                          key={level}
                          onClick={() => {
                            setDifficulty(level);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-left hover:bg-gray-700 transition-colors ${
                            difficulty === level ? 'bg-purple-600/20 text-purple-400' : 'text-gray-300'
                          }`}
                        >
                          {DIFFICULTY_LEVELS[level].name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Time Options - Only shown before game starts */}
                <div className="flex gap-1.5">
                  {DIFFICULTY_LEVELS[difficulty].timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        selectedTime === time
                          ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {time}s
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Restart button - Only shown during game */
              <button
                onClick={newGame}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all text-purple-400 hover:text-purple-300"
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span>Restart</span>
              </button>
            )}
          </div>
        </div>

        {/* Typing Area - Adjusted height and margin */}
        <div className="relative flex-1 flex flex-col max-h-[350px] mb-2">
          <div
            ref={typingContainerRef}
            className="relative h-full bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
          >
            <div
              ref={wordsRef}
              onKeyUp={handleKeyUp}
              tabIndex={0}
              className={`words p-3 text-lg leading-relaxed focus:outline-none h-full overflow-y-auto transition-all duration-300 ${
                !isGameActive ? 'blur-md' : ''
              }`}
              style={{
                scrollBehavior: 'smooth',
                lineHeight: '1.6',
              }}
            >
              {words.map((word, i) => (
                <div
                  className={`word inline-block mx-1.5 my-1 font-bold ${
                    i === 0 ? "current" : ""
                  }`}
                  key={i}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      className={`letter ${
                        letterIndex === 0 && i === 0 ? "current" : ""
                      }`}
                      key={letterIndex}
                    >
                      {letter}
                    </span>
                  ))}
                  <span className="letter opacity-0 w-0">{"."}</span>
                </div>
              ))}
          </div>
          <div
            ref={cursorRef}
              className="cursor absolute w-0.5 h-[1.6em] bg-purple-600 transition-all duration-100 pointer-events-none"
            style={{
                top: '0.5em',
                width: '3px',
                height: '1.6em',
                backgroundColor: '#a78bfa',
                marginTop: '0.3em',
                left: 0,
            }}
          ></div>

            {/* Start Button Overlay - Updated with play icon */}
            {!isGameActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-all">
                <button
                  onClick={startGame}
                  className="w-14 h-14 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <PlayIcon className="w-8 h-8" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section - Adjusted margin */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-purple-400">{calculateWPM()}</div>
            <div className="text-gray-400 text-xs">WPM</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-green-400">{calculateAccuracy()}%</div>
            <div className="text-gray-400 text-xs">Accuracy</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-yellow-400">{streak}</div>
            <div className="text-gray-400 text-xs">Current Streak</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-red-400">{bestStreak}</div>
            <div className="text-gray-400 text-xs">Best Streak</div>
          </div>
          </div>
          
        {/* Game Over Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Final WPM:</span>
                    <span className="font-bold text-purple-400">{calculateWPM()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-bold text-green-400">{calculateAccuracy()}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Streak:</span>
                    <span className="font-bold text-yellow-400">{bestStreak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mistakes:</span>
                    <span className="font-bold text-red-400">{mistakes}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">Performance Graph</h3>
                  <Graph performanceData={performanceData} />
                </div>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  newGame();
                }}
                className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingGame;
