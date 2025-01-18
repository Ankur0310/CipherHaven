import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Key, Lock, Unlock, RefreshCw, Grid, Rows, Columns, Mic as Mix, ArrowRight, Play } from 'lucide-react';

type Step = {
  name: string;
  icon: React.ReactNode;
  description: string;
};

const steps: Step[] = [
  {
    name: 'Key Expansion',
    icon: <Key className="w-6 h-6" />,
    description: 'The initial key is expanded into a key schedule for each round'
  },
  {
    name: 'SubBytes',
    icon: <Grid className="w-6 h-6" />,
    description: 'Each byte is replaced with another byte according to a lookup table'
  },
  {
    name: 'ShiftRows',
    icon: <Rows className="w-6 h-6" />,
    description: 'The rows of the state are shifted cyclically to the left'
  },
  {
    name: 'MixColumns',
    icon: <Mix className="w-6 h-6" />,
    description: 'Each column is transformed using a linear transformation'
  },
  {
    name: 'AddRoundKey',
    icon: <RefreshCw className="w-6 h-6" />,
    description: 'Each byte is combined with the round key using XOR'
  }
];

const sBox = new Map([
  ['00', '63'], ['01', '7c'], ['02', '77'], ['03', '7b'], ['04', 'f2'], ['05', '6b'], ['06', '6f'], ['07', 'c5'],
  ['08', '30'], ['09', '01'], ['0a', '67'], ['0b', '2b'], ['0c', 'fe'], ['0d', 'd7'], ['0e', 'ab'], ['0f', '76'],
  ['10', 'ca'], ['11', '82'], ['12', 'c9'], ['13', '7d'], ['14', 'fa'], ['15', '59'], ['16', '47'], ['17', 'f0'],
  ['18', 'ad'], ['19', 'd4'], ['1a', 'a2'], ['1b', 'af'], ['1c', '9c'], ['1d', 'a4'], ['1e', '72'], ['1f', 'c0'],
  ['20', 'b7'], ['21', 'fd'], ['22', '93'], ['23', '26'], ['24', '36'], ['25', '3f'], ['26', 'f7'], ['27', 'cc'],
  ['28', '34'], ['29', 'a5'], ['2a', 'e5'], ['2b', 'f1'], ['2c', '71'], ['2d', 'd8'], ['2e', '31'], ['2f', '15'],
  ['30', '04'], ['31', 'c7'], ['32', '23'], ['33', 'c3'], ['34', '18'], ['35', '96'], ['36', '05'], ['37', '9a'],
  ['38', '07'], ['39', '12'], ['3a', '80'], ['3b', 'e2'], ['3c', 'eb'], ['3d', '27'], ['3e', 'b2'], ['3f', '75'],
  ['40', '09'], ['41', '83'], ['42', '2c'], ['43', '1a'], ['44', '1b'], ['45', '6e'], ['46', '5a'], ['47', 'a0'],
  ['48', '52'], ['49', '3b'], ['4a', 'd6'], ['4b', 'b3'], ['4c', '29'], ['4d', 'e3'], ['4e', '2f'], ['4f', '84'],
  ['50', '53'], ['51', 'd1'], ['52', '00'], ['53', 'ed'], ['54', '20'], ['55', 'fc'], ['56', 'b1'], ['57', '5b'],
  ['58', '6a'], ['59', 'cb'], ['5a', 'be'], ['5b', '39'], ['5c', '4a'], ['5d', '4c'], ['5e', '58'], ['5f', 'cf'],
  ['60', 'd0'], ['61', 'ef'], ['62', 'aa'], ['63', 'fb'], ['64', '43'], ['65', '4d'], ['66', '33'], ['67', '85'],
  ['68', '45'], ['69', 'f9'], ['6a', '02'], ['6b', '7f'], ['6c', '50'], ['6d', '3c'], ['6e', '9f'], ['6f', 'a8'],
  ['70', '51'], ['71', 'a3'], ['72', '40'], ['73', '8f'], ['74', '92'], ['75', '9d'], ['76', '38'], ['77', 'f5'],
  ['78', 'bc'], ['79', 'b6'], ['7a', 'da'], ['7b', '21'], ['7c', '10'], ['7d', 'ff'], ['7e', 'f3'], ['7f', 'd2'],
  ['80', 'cd'], ['81', '0c'], ['82', '13'], ['83', 'ec'], ['84', '5f'], ['85', '97'], ['86', '44'], ['87', '17'],
  ['88', 'c4'], ['89', 'a7'], ['8a', '7e'], ['8b', '3d'], ['8c', '64'], ['8d', '5d'], ['8e', '19'], ['8f', '73'],
  ['90', '60'], ['91', '81'], ['92', '4f'], ['93', 'dc'], ['94', '22'], ['95', '2a'], ['96', '90'], ['97', '88'],
  ['98', '46'], ['99', 'ee'], ['9a', 'b8'], ['9b', '14'], ['9c', 'de'], ['9d', '5e'], ['9e', '0b'], ['9f', 'db'],
  ['a0', 'e0'], ['a1', '32'], ['a2', '3a'], ['a3', '0a'], ['a4', '49'], ['a5', '06'], ['a6', '24'], ['a7', '5c'],
  ['a8', 'c2'], ['a9', 'd3'], ['aa', 'ac'], ['ab', '62'], ['ac', '91'], ['ad', '95'], ['ae', 'e4'], ['af', '79'],
  ['b0', 'e7'], ['b1', 'c8'], ['b2', '37'], ['b3', '6d'], ['b4', '8d'], ['b5', 'd5'], ['b6', '4e'], ['b7', 'a9'],
  ['b8', '6c'], ['b9', '56'], ['ba', 'f4'], ['bb', 'ea'], ['bc', '65'], ['bd', '7a'], ['be', 'ae'], ['bf', '08'],
  ['c0', 'ba'], ['c1', '78'], ['c2', '25'], ['c3', '2e'], ['c4', '1c'], ['c5', 'a6'], ['c6', 'b4'], ['c7', 'c6'],
  ['c8', 'e8'], ['c9', 'dd'], ['ca', '74'], ['cb', '1f'], ['cc', '4b'], ['cd', 'bd'], ['ce', '8b'], ['cf', '8a'],
  ['d0', '70'], ['d1', '3e'], ['d2', 'b5'], ['d3', '66'], ['d4', '48'], ['d5', '03'], ['d6', 'f6'], ['d7', '0e'],
  ['d8', '61'], ['d9', '35'], ['da', '57'], ['db', 'b9'], ['dc', '86'], ['dd', 'c1'], ['de', '1d'], ['df', '9e'],
  ['e0', 'e1'], ['e1', 'f8'], ['e2', '98'], ['e3', '11'], ['e4', '69'], ['e5', 'd9'], ['e6', '8e'], ['e7', '94'],
  ['e8', '9b'], ['e9', '1e'], ['ea', '87'], ['eb', 'e9'], ['ec', 'ce'], ['ed', '55'], ['ee', '28'], ['ef', 'df'],
  ['f0', '8c'], ['f1', 'a1'], ['f2', '89'], ['f3', '0d'], ['f4', 'bf'], ['f5', 'e6'], ['f6', '42'], ['f7', '68'],
  ['f8', '41'], ['f9', '99'], ['fa', '2d'], ['fb', '0f'], ['fc', 'b0'], ['fd', '54'], ['fe', 'bb'], ['ff', '16'],
]);

const Rcon = [
  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36,
  // ... (expand as needed for the number of rounds)
];




function aes() {

  const [currentStep, setCurrentStep] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [plaintext, setPlaintext] = useState('Hello, World!');
  const [key, setKey] = useState('MySecretKey12345');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [finalCiphertext, setFinalCiphertext] = useState('');

 
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentRound < 9) {
      setCurrentStep(0);
      setCurrentRound(currentRound + 1);
    }
  };

  const handlePrev = () => {
    setShowTransition(true);
    setTimeout(() => {
      if (currentStep === 1) {
        if (currentRound > 0) {
          setCurrentRound(prev => prev - 1);
          setCurrentStep(steps.length - 1); // Go to last step of previous round
        } else {
          setCurrentStep(0); // Go to initial key expansion
        }
      } else {
        setCurrentStep(prev => prev - 1);
      }
      setShowTransition(false);
    }, 500);
  };

  const completeCurrentRound = () => {
    // Simulate completing all steps of current round
    const finalState = getTransformedMatrix(4); // Get state after AddRoundKey
    setShowTransition(true);
    setTimeout(() => {
      if (currentRound < 9) {
        setCurrentRound(prev => prev + 1);
        setCurrentStep(1);
      }
      // Update final ciphertext after last round
      if (currentRound === 9) {
        const hexString = finalState.flat().join('');
        setFinalCiphertext(hexString);
      }
      setShowTransition(false);
    }, 500);
  };

  const getStateMatrix = () => {
    const matrix = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const charIndex = (i * 4 + j + (currentRound * 16)) % plaintext.length;
        row.push(plaintext.charCodeAt(charIndex).toString(16).padStart(2, '0'));
      }
      matrix.push(row);
    }
    return matrix;
  };

  const getTransformedMatrix = (targetStep = currentStep) => {
    let matrix = getStateMatrix();
    
    // Apply transformations up to the target step
    for (let step = 1; step <= targetStep; step++) {
      switch (step) {
        case 1: // SubBytes
          matrix = matrix.map(row =>
            row.map(cell => sBox.get(cell) || cell)
          );
          break;
        case 2: // ShiftRows
          matrix = [
            matrix[0],
            [...matrix[1].slice(1), matrix[1][0]],
            [...matrix[2].slice(2), ...matrix[2].slice(0, 2)],
            [...matrix[3].slice(3), ...matrix[3].slice(0, 3)]
          ];
          break;
        case 3: // MixColumns
          matrix = matrix.map(row =>
            row.map(cell => {
              const num = parseInt(cell, 16);
              return ((num + 0x20) % 0xff).toString(16).padStart(2, '0');
            })
          );
          break;
        case 4: // AddRoundKey
          matrix = matrix.map(row =>
            row.map(cell => {
              const keyByte = parseInt(key.charCodeAt(currentRound % key.length).toString(16), 16);
              const cellByte = parseInt(cell, 16);
              return (keyByte ^ cellByte).toString(16).padStart(2, '0');
            })
          );
          break;
      }
    }
    return matrix;
  };

  const renderStepVisualization = () => {
    const originalMatrix = getStateMatrix();
    const transformedMatrix = getTransformedMatrix();

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Before</h4>
            <div className="grid grid-cols-4 gap-2">
              {originalMatrix.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`before-${i}-${j}`}
                    className="bg-white border border-gray-200 p-2 text-center font-mono text-sm"
                  >
                    {cell}
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">After</h4>
            <div className="grid grid-cols-4 gap-2">
              {transformedMatrix.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`after-${i}-${j}`}
                    className={`bg-white border border-gray-200 p-2 text-center font-mono text-sm
                      ${originalMatrix[i][j] !== cell ? 'bg-indigo-50 border-indigo-300' : ''}`}
                  >
                    {cell}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {currentStep === 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Round Keys</h4>
            <div className="grid grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                  <div className="text-center font-mono">
                    {key.slice(i * 4, (i + 1) * 4).split('').map(char => 
                      char.charCodeAt(0).toString(16).padStart(2, '0')
                    ).join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">S-Box Substitution</h4>
            <div className="grid grid-cols-4 gap-4">
              {Array.from(sBox.entries()).slice(0, 4).map(([from, to], i) => (
                <div key={i} className="flex items-center justify-center gap-2">
                  <div className="bg-white p-2 rounded border border-gray-200 font-mono">{from}</div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="bg-indigo-50 p-2 rounded border border-indigo-200 font-mono">{to}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Row Shifting Pattern</h4>
            <div className="space-y-2">
              {[0, 1, 2, 3].map(row => (
                <div key={row} className="flex items-center gap-2">
                  <div className="w-20 text-right font-medium">Row {row}:</div>
                  <div className="flex-1 bg-white p-2 rounded border border-gray-200">
                    <div className="flex justify-center items-center gap-2">
                      <span className="font-mono">Shift {row} positions left</span>
                      {row > 0 && (
                        <ArrowRight className={`w-4 h-4 transform -translate-x-${row * 4}`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Column Mixing</h4>
            <div className="grid grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-center font-medium">Column {i + 1}</div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="flex flex-col items-center gap-1">
                      {Array(4).fill(0).map((_, j) => (
                        <div key={j} className="font-mono">
                          {transformedMatrix[j][i]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">XOR with Round Key</h4>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-md font-medium mb-2">Round Key</h5>
                <div className="grid grid-cols-4 gap-2">
                  {Array(16).fill(0).map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-2 text-center font-mono text-sm">
                      {key.charCodeAt((i + currentRound) % key.length).toString(16).padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono mb-2">XOR Operation</div>
                  <div className="text-4xl">⊕</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            {isEncrypting ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
            AES Encryption Visualization - Round {currentRound + 1}/10
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plaintext</label>
                <input
                  type="text"
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {finalCiphertext && currentRound === 9 && currentStep === steps.length - 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Final Ciphertext</label>
                  <div className="w-full p-2 bg-gray-50 border rounded-md font-mono">
                    {finalCiphertext}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0 && currentRound === 0}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 mr-1" /> Previous
              </button>
              <button
                onClick={completeCurrentRound}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md"
              >
                <Play className="w-5 h-5 mr-1" /> Complete Round
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1 && currentRound === 9}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
              >
                Next <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>

            <div className="flex justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.name}
                  className={`flex flex-col items-center w-1/5 ${
                    index === currentStep ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      index === currentStep
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{step.name}</span>
                </div>
              ))}
            </div>

            <div className={`bg-gray-50 p-6 rounded-lg transition-opacity duration-300 ${showTransition ? 'opacity-0' : 'opacity-100'}`}>
              <h3 className="text-xl font-semibold mb-4">{steps[currentStep].name}</h3>
              <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
              
              {renderStepVisualization()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default aes;