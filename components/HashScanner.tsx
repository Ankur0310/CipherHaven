import React, { useState } from 'react';
import { analyzeHashConfig } from '@/utils/hashAnalyzer';
import type { HashConfig, VulnerabilityReport } from '@/types';

interface Props {
  onScanComplete: (report: VulnerabilityReport) => void;
}

export function HashScanner({ onScanComplete }: Props) {
  const [config, setConfig] = useState<HashConfig>({
    algorithm: 'SHA-256',
    saltLength: 16,
    iterations: 10000,
  });

  const handleScan = () => {
    const report = analyzeHashConfig(config);
    onScanComplete(report);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hash Algorithm</label>
          <select
            value={config.algorithm}
            onChange={(e) => setConfig({ ...config, algorithm: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="MD5">MD5</option>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
            <option value="bcrypt">bcrypt</option>
            <option value="Argon2id">Argon2id</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salt Length (bytes)</label>
          <input
            type="number"
            value={config.saltLength}
            onChange={(e) => setConfig({ ...config, saltLength: Number(e.target.value) })}
            min={0}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Iterations</label>
          <input
            type="number"
            value={config.iterations}
            onChange={(e) => setConfig({ ...config, iterations: Number(e.target.value) })}
            min={1}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        onClick={handleScan}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Scan Hash Configuration
      </button>
    </div>
  );
}