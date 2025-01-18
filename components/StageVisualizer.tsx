import React from 'react';
import { ArrowRight, Binary, Play, Pause, RotateCcw, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import type { StageProps } from '@/types';
import { INITIAL_HASH_VALUES } from '@/types';
import { Button } from '@/components/ui/button';
import { toBinary, K, toHex, ch, maj, sigma0, sigma1 } from '@/utils/sha256';

export function StageVisualizer({ state, onStateChange }: StageProps) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [animationSpeed, setAnimationSpeed] = React.useState(1000);

  const stages = [
    'Preprocessing',
    'Initial Hash Values',
    'Message Schedule',
    'Compression Function',
    'Final Hash Calculation',
    'Validation'
  ];

  const handleNextStage = () => {
    if (state.currentStage === 2) {
      // Initialize working variables when moving to compression stage
      onStateChange({
        currentStage: 3,
        workingVariables: {
          a: INITIAL_HASH_VALUES[0],
          b: INITIAL_HASH_VALUES[1],
          c: INITIAL_HASH_VALUES[2],
          d: INITIAL_HASH_VALUES[3],
          e: INITIAL_HASH_VALUES[4],
          f: INITIAL_HASH_VALUES[5],
          g: INITIAL_HASH_VALUES[6],
          h: INITIAL_HASH_VALUES[7]
        }
      });
    } else if (state.currentStage === 3 && state.currentRound >= 64) {
      // Calculate final hash when moving from compression to final hash stage
      const { a, b, c, d, e, f, g, h } = state.workingVariables;
      const finalHash = [a, b, c, d, e, f, g, h].join('');
      onStateChange({
        currentStage: 4,
        finalHash,
        intermediateHashes: [...state.intermediateHashes, finalHash]
      });
    } else {
      onStateChange({
        currentStage: Math.min(state.currentStage + 1, stages.length - 1)
      });
    }
  };

  const handlePrevStage = () => {
    onStateChange({
      currentStage: Math.max(state.currentStage - 1, 0)
    });
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetVisualization = () => {
    onStateChange({
      currentStage: 0,
      currentRound: 0,
      binaryInput: toBinary(state.input),
      messageSchedule: [],
      workingVariables: {
        a: '', b: '', c: '', d: '',
        e: '', f: '', g: '', h: ''
      },
      intermediateHashes: [],
      finalHash: ''
    });
    setIsAnimating(false);
  };

  const handleNextRound = () => {
    if (state.currentRound >= 64) return;
  
    const w = state.messageSchedule[state.currentRound];
    const k = K[state.currentRound];
    const { a, b, c, d, e, f, g, h } = state.workingVariables;
  
    // Convert hex strings to numbers for calculations
    const aNum = parseInt(a, 16);
    const bNum = parseInt(b, 16);
    const cNum = parseInt(c, 16);
    const dNum = parseInt(d, 16);
    const eNum = parseInt(e, 16);
    const fNum = parseInt(f, 16);
    const gNum = parseInt(g, 16);
    const hNum = parseInt(h, 16);
    const wNum = parseInt(w, 16);
  
    // Calculate intermediate values with modulo 2^32
    const S1 = sigma1(eNum);
    const ch_efg = ch(eNum, fNum, gNum);
    const temp1 = (hNum + S1 + ch_efg + k + wNum) >>> 0; // Ensure unsigned 32-bit
    const S0 = sigma0(aNum);
    const maj_abc = maj(aNum, bNum, cNum);
    const temp2 = (S0 + maj_abc) >>> 0; // Ensure unsigned 32-bit
  
    // Update working variables with modulo 2^32 arithmetic
    const newWorkingVariables = {
      a: toHex((temp1 + temp2) >>> 0),
      b: a,
      c: b,
      d: c,
      e: toHex((dNum + temp1) >>> 0),
      f: e,
      g: f,
      h: g,
    };
  
    // Update state
    onStateChange({
      currentRound: state.currentRound + 1,
      workingVariables: newWorkingVariables,
    });
  };
  
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Binary className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">SHA-256 Process</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetVisualization}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            className=" bg-indigo-500 hover:bg-indigo-500 rounded-lg"
            size="sm"
            onClick={toggleAnimation}
          >
            {isAnimating ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Play
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Stage Progress */}
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => (
            <React.Fragment key={stage}>
              <div className={clsx(
                'flex flex-col items-center',
                state.currentStage === index && 'text-blue-600'
              )}>
                <div className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  state.currentStage === index ? 'bg-blue-600 text-white' : 'bg-gray-200'
                )}>
                  {index + 1}
                </div>
                <span className="text-sm mt-1">{stage}</span>
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stage Content */}
        <div className="border-t pt-6">
          {state.currentStage === 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Binary Conversion</h3>
              <div className="grid grid-cols-8 gap-2">
                {state.binaryInput.map((byte, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                      {byte}
                    </div>
                    <div className="text-xs mt-1 text-gray-600">
                      {state.input.charAt(i)}
                    </div>
                  </div>
                ))}
              </div>
              {state.showPadding && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Padding</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-8 gap-2">
                      <div className="text-center">
                        <div className="bg-blue-100 p-2 rounded font-mono text-sm">1</div>
                        <div className="text-xs mt-1 text-gray-600">Start</div>
                      </div>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="text-center">
                          <div className="bg-gray-100 p-2 rounded font-mono text-sm">0</div>
                          <div className="text-xs mt-1 text-gray-600">Padding</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {state.currentStage === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Initial Hash Values (H₀ to H₇)</h3>
              <div className="grid grid-cols-4 gap-4">
                {INITIAL_HASH_VALUES.map((hash, i) => (
                  <div key={i} className="bg-gray-100 p-3 rounded text-center">
                    <div className="text-sm font-mono">{hash}</div>
                    <div className="text-xs text-gray-600 mt-1">H{i}</div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Did you know?</h4>
                <p className="text-sm text-gray-700">
                  These initial hash values are derived from the first 32 bits of the fractional parts
                  of the square roots of the first 8 prime numbers (2, 3, 5, 7, 11, 13, 17, 19).
                </p>
              </div>
            </div>
          )}

          {state.currentStage === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Message Schedule Generation</h3>
              <div className="grid grid-cols-8 gap-2">
                {state.messageSchedule.map((word, i) => (
                  <div key={i} className="text-center">
                    <div className={clsx(
                      'p-2 rounded font-mono text-sm',
                      i < 16 ? 'bg-blue-100' : 'bg-green-100'
                    )}>
                      {word}
                    </div>
                    <div className="text-xs mt-1 text-gray-600">W{i}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Round Constants (K)</h4>
                <div className="grid grid-cols-8 gap-2">
                  {K.slice(0, 8).map((k, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-gray-100 p-2 rounded font-mono text-xs">
                        {k.toString(16)}
                      </div>
                      <div className="text-xs mt-1 text-gray-600">K{i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {state.currentStage === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Compression Function (Round {state.currentRound}/64)</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextRound}
                  disabled={state.currentRound >= 64}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Next Round
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(state.workingVariables).map(([key, value]) => (
                  <div key={key} className="bg-gray-100 p-3 rounded text-center">
                    <div className="text-sm font-mono">{value || '0'.repeat(8)}</div>
                    <div className="text-xs text-gray-600 mt-1">{key.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Current Operations</h4>
                <div className="space-y-2 text-sm">
                  <p>Ch(e,f,g) = (e AND f) XOR (NOT e AND g)</p>
                  <p>Maj(a,b,c) = (a AND b) XOR (a AND c) XOR (b AND c)</p>
                  <p>Σ₀(a) = ROTR²(a) XOR ROTR¹³(a) XOR ROTR²²(a)</p>
                  <p>Σ₁(e) = ROTR⁶(e) XOR ROTR¹¹(e) XOR ROTR²⁵(e)</p>
                </div>
              </div>
            </div>
          )}

          {state.currentStage === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Final Hash Calculation</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="font-mono text-lg break-all">
                    {state.finalHash || 'Complete all 64 rounds to see the final hash'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {state.intermediateHashes.map((hash, i) => (
                  <div key={i} className="bg-blue-50 p-3 rounded text-center">
                    <div className="text-sm font-mono">{hash}</div>
                    <div className="text-xs text-gray-600 mt-1">Block {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.currentStage === 5 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Hash Validation</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Input Text</h4>
                <p className="font-mono text-sm">{state.input}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Final SHA-256 Hash</h4>
                <p className="font-mono text-sm break-all">{state.finalHash}</p>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(state.finalHash);
                }}
              >
                Copy Hash
              </Button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevStage}
              disabled={state.currentStage === 0}
            >
              Previous Stage
            </Button>
            <Button
              className=" bg-green-500 hover:bg-green-600"
              onClick={handleNextStage}
              disabled={state.currentStage === stages.length - 1 || (state.currentStage === 3 && state.currentRound < 64)}
            >
              Next Stage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}