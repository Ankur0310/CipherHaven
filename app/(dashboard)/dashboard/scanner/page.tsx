"use client";

import React, { useState } from 'react';
import { Shield, FileDown, AlertTriangle, Lock, Hash } from 'lucide-react';
import { RSAScanner } from '@/components/RSAScanner';
import { AESScanner } from '@/components/AESScanner';
import { HashScanner } from '@/components/HashScanner';
import { Report } from '@/components/Report';
import { VulnerabilityReport } from '@/types';

const Page = () => {
  const [activeTab, setActiveTab] = useState<'rsa' | 'aes' | 'hash'>('rsa');
  const [report, setReport] = useState<VulnerabilityReport | null>(null);

  return (
    <div className=" bg-gray-50">
      <header className="sticky top-0 z-50 py-4 px-1 border-b border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <Shield className="text-green-500 w-8 h-8" />
          <h1 className="text-lg font-bold">Cryptographic Vulnerability Scanner</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('rsa')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'rsa'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>RSA Analysis</span>
            </button>
            <button
              onClick={() => setActiveTab('aes')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'aes'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>AES Analysis</span>
            </button>
            <button
              onClick={() => setActiveTab('hash')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'hash'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>Hash Analysis</span>
            </button>
          </div>

          <div className="mb-8">
            {activeTab === 'rsa' && <RSAScanner onScanComplete={setReport} />}
            {activeTab === 'aes' && <AESScanner onScanComplete={setReport} />}
            {activeTab === 'hash' && <HashScanner onScanComplete={setReport} />}
          </div>

          {report && <Report report={report} />}
        </div>
      </main>
    </div>
  );
};

export default Page;
