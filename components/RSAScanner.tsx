import React, { useState } from 'react';
import { analyzeRSAConfig, generateRSAKeyPair } from '@/utils/rsaAnalyzer';
import { RefreshCw } from 'lucide-react';
import type { RSAConfig, VulnerabilityReport } from '@/types';

interface Props {
  onScanComplete: (report: VulnerabilityReport) => void;
}

export function RSAScanner({ onScanComplete }: Props) {
  const [config, setConfig] = useState<RSAConfig>({
    keySize: 2048,
    publicExponent: '65537',
    padding: 'OAEP',
  });

  const handleScan = () => {
    const report = analyzeRSAConfig(config);
    onScanComplete(report);
  };

  const handleGenerateKey = () => {
    const keyPair = generateRSAKeyPair(config.keySize);
    setConfig(prev => ({
      ...prev,
      publicExponent: keyPair.publicExponent,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Key Size (bits)</label>
          <select
            value={config.keySize}
            onChange={(e) => setConfig({ ...config, keySize: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value={1024}>1024 (Deprecated)</option>
            <option value={2048}>2048 (Minimum Recommended)</option>
            <option value={3072}>3072 (Future-Safe)</option>
            <option value={4096}>4096 (Maximum Security)</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            NIST recommends 2048 bits minimum, 3072 bits for post-2030 security
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Public Exponent</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              value={config.publicExponent}
              onChange={(e) => setConfig({ ...config, publicExponent: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={handleGenerateKey}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            65537 (0x10001) is the recommended value
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Padding Scheme</label>
          <select
            value={config.padding}
            onChange={(e) => setConfig({ ...config, padding: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="PKCS1v1.5">PKCS#1 v1.5 (Deprecated)</option>
            <option value="OAEP">OAEP (Recommended)</option>
            <option value="PSS">PSS (For Signatures)</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            OAEP is recommended for encryption, PSS for signatures
          </p>
        </div>
      </div>

      <button
        onClick={handleScan}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Analyze RSA Configuration
      </button>
    </div>
  );
}