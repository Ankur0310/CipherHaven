'use client';

import React, { useState } from 'react';
import { Shield, Award, HelpCircle, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { challenges } from '@/challenges';
import type { Challenge } from '@/types';

const Page = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChallenge && answer.toUpperCase() === selectedChallenge.solution.toUpperCase()) {
      setScore((prev) => prev + selectedChallenge.points);
      setCompletedChallenges((prev) => [...prev, selectedChallenge.id]);
      setAnswer('');
      setSelectedChallenge(null);
      setShowHint(false);
    }
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-500';
      case 'Intermediate':
        return 'text-yellow-500';
      case 'Advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="">
      <div className="px-1 mx-auto">
        <header className="sticky top-0 z-50 py-4 px-1 border-b border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center justify-between">
              <Shield className="w-8 h-8 text-blue-500" />
              <h1 className="text-lg font-bold">Crypto Challenge</h1>
            </div>
            <div className="px-6 inline-flex items-center">
              <Award className="w-6 h-6 mr-2 text-green-500" />
              <span className="text-lg font-semibold">Score: {score}</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 mt-3">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Available Challenges</h2>
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`bg-gray-100 rounded-lg p-6 cursor-pointer transition-transform hover:scale-105 ${
                    completedChallenges.includes(challenge.id) ? 'border-2 border-green-500' : ''
                  }`}
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    setShowHint(false);
                    setAnswer('');
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                      <span className="bg-blue-200 rounded-sm px-2 py-1 text-sm">
                        {challenge.points} pts
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{challenge.description}</p>
                  {completedChallenges.includes(challenge.id) && (
                    <div className="flex items-center mt-2 text-green-500">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-100 rounded-lg p-6">
              {selectedChallenge ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{selectedChallenge.title}</h2>
                  <p className="text-gray-800 mb-6">{selectedChallenge.description}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Answer:</label>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your solution..."
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg flex items-center"
                      >
                        <Unlock className="w-5 h-5 mr-2" />
                        Submit
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHint(!showHint)}
                        className="bg-gray-300  hover:bg-gray-200 px-6 py-2 rounded-lg flex items-center"
                      >
                        <HelpCircle className="w-5 h-5 mr-2" />
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                      </button>
                    </div>
                  </form>

                  {showHint && selectedChallenge.hint && (
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <p className="text-gray-800">{selectedChallenge.hint}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Select a challenge to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
