import React from 'react';
import { Hash, Eye, EyeOff, Play } from 'lucide-react';
import type { StageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { toBinary } from '@/utils/sha256';

export function InputPanel({ state, onStateChange }: StageProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onStateChange({
      input,
      binaryInput: toBinary(input)
    });
  };

  const handleStartHash = () => {
    onStateChange({
      currentStage: 0,
      binaryInput: toBinary(state.input),
      messageSchedule: [],
      workingVariables: {
        a: '', b: '', c: '', d: '',
        e: '', f: '', g: '', h: ''
      },
      intermediateHashes: [],
      finalHash: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Input Data</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text to Hash
          </label>
          <input
            type="text"
            value={state.input}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text to hash..."
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Block Size (bits)
            </label>
            <select
              value={state.blockSize}
              onChange={(e) => onStateChange({ blockSize: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={512}>512 (Standard)</option>
              <option value={256}>256 (Learning)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => onStateChange({ showPadding: !state.showPadding })}
              variant="outline"
              className="flex items-center gap-2"
            >
              {state.showPadding ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide Padding
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show Padding
                </>
              )}
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visualization Speed
          </label>
          <input
            type="range"
            min="1"
            max="5"
            className="w-full"
            onChange={(e) => {
              // Handle animation speed
            }}
          />
        </div>

        <Button
          onClick={handleStartHash}
          className="w-full flex items-center justify-center gap-2  bg-indigo-600 hover:bg-indigo-700 rounded-lg"
        >
          <Play className="w-4 h-4" />
          Start Hashing
        </Button>
      </div>
    </div>
  );
}