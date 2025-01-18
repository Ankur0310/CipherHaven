import React, { useState } from 'react';
import { analyzeAESConfig } from '@/utils/aesAnalyzer';
import type { AESConfig, VulnerabilityReport } from '@/types';

interface Props {
  onScanComplete: (report: VulnerabilityReport) => void;
}

export function AESScanner({ onScanComplete }: Props) {
  const [config, setConfig] = useState<AESConfig>({
    keySize: 256,
    mode: 'GCM',
    iv: true,
    padding: 'PKCS7',
  });

  const handleScan = () => {
    const report = analyzeAESConfig(config);
    onScanComplete(report);
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
            <option value={128}>128</option>
            <option value={192}>192</option>
            <option value={256}>256</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mode of Operation</label>
          <select
            value={config.mode}
            onChange={(e) => setConfig({ ...config, mode: e.target.value as AESConfig['mode'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="ECB">ECB</option>
            <option value="CBC">CBC</option>
            <option value="CTR">CTR</option>
            <option value="GCM">GCM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">IV/Nonce</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={config.iv}
                onChange={(e) => setConfig({ ...config, iv: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2">Use IV/Nonce</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Padding</label>
          <select
            value={config.padding}
            onChange={(e) => setConfig({ ...config, padding: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="PKCS7">PKCS7</option>
            <option value="Zero">Zero</option>
            <option value="None">None</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleScan}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Scan AES Configuration
      </button>
    </div>
  );
}