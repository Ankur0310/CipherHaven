"use client"

import React, { useState } from 'react';
import { ShieldAlert, Repeat, ArrowLeftRight } from 'lucide-react';
import MITMSimulation from '@/components/MITMSimulation';
import ReplayAttackSimulation from '@/components/ReplayAttackSimulation';

const Page = () => {
  const [activeTab, setActiveTab] = useState<'mitm' | 'replay'>('mitm');

  return (
    <div className="">
      <header className="sticky top-0 z-50 py-4 px-1 border-b border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <ShieldAlert className="text-red-500 w-8 h-8" />
            Cryptographic Attack Simulation Lab
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('mitm')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'mitm'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeftRight size={20} />
            MITM Attack
          </button>
          <button
            onClick={() => setActiveTab('replay')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'replay'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Repeat size={20} />
            Replay Attack
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          {activeTab === 'mitm' ? (
            <MITMSimulation />
          ) : (
            <ReplayAttackSimulation />
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
