import React, { useState } from 'react';
import { InputPanel } from './InputPanel';
import { StageVisualizer } from './StageVisualizer';
import type { SHA256State } from '@/types';

const sha256 = () => {
  const [state, setState] = useState<SHA256State>({
    input: '',
    currentStage: 0,
    currentRound: 0,
    showPadding: true,
    blockSize: 512,
    selectedRounds: Array.from({ length: 64 }, (_, i) => i),
    binaryInput: [],
    messageSchedule: [],
    workingVariables: {
      a: '', b: '', c: '', d: '',
      e: '', f: '', g: '', h: ''
    },
    intermediateHashes: [],
    finalHash: ''
  });

  const handleStateChange = (newState: Partial<SHA256State>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Interactive SHA-256 Visualization
          </h1>
          <p className="text-gray-600">
            Explore how SHA-256 transforms your input into a secure hash
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <InputPanel state={state} onStateChange={handleStateChange} />
          <StageVisualizer state={state} onStateChange={handleStateChange} />
        </div>
      </div>
    </div>
  );
};

export default sha256;
