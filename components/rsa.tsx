import React, { useState, useEffect } from 'react';
import bigInt from 'big-integer';
import { AlertCircle, Lock, Unlock, RefreshCw, ChevronRight, ChevronLeft, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

// Helper functions for RSA calculations
const isPrime = (num: number): boolean => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

function modExp(base: string | number | bigint | boolean, exponent: string | number | bigint | boolean, modulus: string | number | bigint | boolean) {
  base = BigInt(base);
  exponent = BigInt(exponent);
  modulus = BigInt(modulus);
  let result = BigInt(1);
  while (exponent > 0) {
      if (exponent % BigInt(2) === BigInt(1)) {
          result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
      exponent = exponent / BigInt(2);
  }
  return result;
}

const gcd = (a: number, b: number): number => {
  if (!b) return a;
  return gcd(b, a % b);
};

const modInverse = (e: number, phi: number): number => {
  let m0 = phi;
  let y = 0;
  let x = 1;

  if (phi === 1) return 0;

  while (e > 1) {
    const q = Math.floor(e / phi);
    let t = phi;
    phi = e % phi;
    e = t;
    t = y;
    y = x - q * y;
    x = t;
  }

  if (x < 0) x += m0;
  return x;
};

// Predefined key sets for different security levels
const keyPresets = {
  weak: { p: 11, q: 13, e: 7 },
  standard: { p: 17, q: 19, e: 65537 },
  strong: { p: 23, q: 29, e: 65537 }
};

const RSAVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);
  const [p, setP] = useState(17);
  const [q, setQ] = useState(11);
  const [e, setE] = useState(7);
  const [n, setN] = useState(0);
  const [phi, setPhi] = useState(0);
  const [d, setD] = useState(0);
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState<number[]>([]);
  const [decrypted, setDecrypted] = useState('');
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [keyStrength, setKeyStrength] = useState<'weak' | 'standard' | 'strong'>('standard');
  const [showWorkings, setShowWorkings] = useState(false);

  const setKeyPreset = (strength: 'weak' | 'standard' | 'strong') => {
    const preset = keyPresets[strength];
    setP(preset.p);
    setQ(preset.q);
    setE(preset.e);
    setKeyStrength(strength);
  };

  useEffect(() => {
    if (isPrime(p) && isPrime(q)) {
      const newN = p * q;
      const newPhi = (p - 1) * (q - 1);
      setN(newN);
      setPhi(newPhi);
      setError('');
    } else {
      setError('Please select prime numbers for p and q');
    }
  }, [p, q]);

  useEffect(() => {
    if (e > 1 && e < phi && gcd(e, phi) === 1) {
      const newD = modInverse(e, phi);
      setD(newD);
      setError('');
    } else if (phi > 0) {
      setError('Invalid public exponent e');
    }
  }, [e, phi]);

  const encrypt = () => {
    setIsAnimating(true);
    const encrypted = message.split('').map(char => {
      const m = char.charCodeAt(0);
      return modExp(m, e, n);
    });
    setEncrypted(encrypted.map(Number));
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const decrypt = () => {
    setIsAnimating(true);
    const decrypted = encrypted.map(c => {
      const m = modExp(c, d, n);
      return String.fromCharCode(Number(m));
    }).join('');
    setDecrypted(decrypted);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const steps = [
    { 
      title: '1. Choose Key Strength',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setKeyPreset('weak')}
              className={`p-6 rounded-lg flex flex-col items-center transition-all ${
                keyStrength === 'weak' 
                  ? 'bg-red-100 border-2 border-red-500 shadow-lg' 
                  : 'bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <ShieldAlert className="h-8 w-8 text-red-500 mb-2" />
              <span className="font-medium">Weak Keys</span>
              <span className="text-sm text-gray-600 text-center">Educational Only</span>
            </button>
            <button
              onClick={() => setKeyPreset('standard')}
              className={`p-6 rounded-lg flex flex-col items-center transition-all ${
                keyStrength === 'standard' 
                  ? 'bg-blue-100 border-2 border-blue-500 shadow-lg' 
                  : 'bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <Shield className="h-8 w-8 text-blue-500 mb-2" />
              <span className="font-medium">Standard Keys</span>
              <span className="text-sm text-gray-600 text-center">Good Security</span>
            </button>
            <button
              onClick={() => setKeyPreset('strong')}
              className={`p-6 rounded-lg flex flex-col items-center transition-all ${
                keyStrength === 'strong' 
                  ? 'bg-green-100 border-2 border-green-500 shadow-lg' 
                  : 'bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <ShieldCheck className="h-8 w-8 text-green-500 mb-2" />
              <span className="font-medium">Strong Keys</span>
              <span className="text-sm text-gray-600 text-center">Maximum Security</span>
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-800">Key Strength Information</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <ShieldAlert className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="font-medium text-gray-800">Weak Keys:</span> Small prime numbers, easier to break but good for learning</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="font-medium text-gray-800">Standard Keys:</span> Medium-sized primes, balanced security</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="font-medium text-gray-800">Strong Keys:</span> Larger primes, higher security but more computational cost</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    { 
      title: '2. Prime Number Selection',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prime p</label>
              <input
                type="number"
                value={p}
                onChange={(e) => setP(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prime q</label>
              <input
                type="number"
                value={q}
                onChange={(e) => setQ(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-blue-900">Mathematical Background</h3>
            <p className="text-sm text-blue-800 mb-3">Two distinct prime numbers (p and q) are chosen to create the RSA key pair.</p>
            <button
              onClick={() => setShowWorkings(!showWorkings)}
              className="text-blue-600 text-sm hover:text-blue-800 font-medium flex items-center"
            >
              {showWorkings ? 'Hide' : 'Show'} Calculations
              <ChevronRight className={`h-4 w-4 ml-1 transform transition-transform ${showWorkings ? 'rotate-90' : ''}`} />
            </button>
            {showWorkings && (
              <div className="mt-4 space-y-4 text-sm text-blue-800">
                <div>
                  <p className="font-medium mb-1">Selected primes:</p>
                  <p className="font-mono bg-blue-100 p-2 rounded">p = {p}</p>
                  <p className="font-mono bg-blue-100 p-2 rounded mt-1">q = {q}</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Properties of chosen primes:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Both numbers must be prime</li>
                    <li>Should be similar in magnitude but not too close</li>
                    <li>Product should be large enough for security</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    { 
      title: '3. Calculate Modulus and Totient',
      component: (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-indigo-900">Key Components</h3>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <p className="font-medium text-indigo-900 mb-2">Modulus (n):</p>
                <p className="font-mono text-indigo-800 bg-indigo-50 p-2 rounded">
                  n = p × q = {p} × {q} = {n}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <p className="font-medium text-indigo-900 mb-2">Euler's Totient (φ(n)):</p>
                <p className="font-mono text-indigo-800 bg-indigo-50 p-2 rounded">
                  φ(n) = (p - 1) × (q - 1) = {p-1} × {q-1} = {phi}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-indigo-100 rounded-lg p-4">
              <p className="font-medium text-indigo-900 mb-2">Why these calculations matter:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-indigo-800">
                <li>Modulus (n) is used in both encryption and decryption</li>
                <li>Totient (φ(n)) is used to generate the private key</li>
                <li>Security relies on the difficulty of factoring n</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: '4. Choose Public Exponent',
      component: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Public Exponent (e)</label>
            <input
              type="number"
              value={e}
              onChange={(e) => setE(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-green-900">Public Key (n, e)</h3>
            <p className="font-mono bg-white p-3 rounded-lg border border-green-200 text-green-800">
              (n, e) = ({n}, {e})
            </p>
            <div className="mt-4">
              <p className="font-medium text-green-900 mb-2">Requirements for e:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-green-800">
                <li>Must be coprime with φ(n)</li>
                <li>1 &lt; e &lt; φ(n)</li>
                <li>Common choices: 3, 17, 65537 (2¹⁶ + 1)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: '5. Calculate Private Key',
      component: (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-yellow-900">Private Key (d)</h3>
            <p className="font-mono bg-white p-3 rounded-lg border border-yellow-200 text-yellow-800">
              d = {d}
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="font-medium text-yellow-900 mb-2">Mathematical Relationship:</p>
                <p className="font-mono bg-yellow-100 p-3 rounded-lg text-yellow-800">
                  d × e ≡ 1 (mod φ(n))
                </p>
                <p className="mt-2 text-yellow-800">This means:</p>
                <p className="font-mono bg-yellow-100 p-3 rounded-lg mt-1 text-yellow-800">
                  {d} × {e} ≡ 1 (mod {phi})
                </p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="font-medium text-yellow-900 mb-2">Security Note:</p>
                <p className="text-sm text-yellow-800">
                  The private key must be kept secret as it allows decryption of messages.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: '6. Encryption',
      component: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
              placeholder="Enter a message to encrypt"
            />
          </div>
          <button
            onClick={encrypt}
            disabled={!message || isAnimating}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnimating ? (
              <RefreshCw className="animate-spin-slow h-5 w-5" />
            ) : (
              <>
                <Lock className="h-5 w-5" />
                <span>Encrypt</span>
              </>
            )}
          </button>
          {encrypted.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-blue-900">Encryption Process</h3>
              <p className="text-sm text-blue-800 mb-2">For each character (m), compute:</p>
              <p className="font-mono bg-blue-100 p-3 rounded-lg text-blue-800">
                c = m^e mod n
              </p>
              <div className="mt-4">
                <p className="font-medium text-blue-900 mb-2">Ciphertext:</p>
                <p className="font-mono bg-white p-3 rounded-lg border border-blue-200 text-blue-800 break-all">
                  {encrypted.join(' ')}
                </p>
              </div>
            </div>
          )}
        </div>
      )
    },
    { 
      title: '7. Decryption',
      component: (
        <div className="space-y-6">
          <button
            onClick={decrypt}
            disabled={encrypted.length === 0 || isAnimating}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnimating ? (
              <RefreshCw className="animate-spin-slow h-5 w-5" />
            ) : (
              <>
                <Unlock className="h-5 w-5" />
                <span>Decrypt</span>
              </>
            )}
          </button>
          {decrypted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-green-900">Decryption Process</h3>
              <p className="text-sm text-green-800 mb-2">For each ciphertext value (c), compute:</p>
              <p className="font-mono bg-green-100 p-3 rounded-lg text-green-800">
                m = c^d mod n
              </p>
              <div className="mt-4">
                <p className="font-medium text-green-900 mb-2">Decrypted Message:</p>
                <p className="font-mono bg-white p-3 rounded-lg border border-green-200 text-green-800">
                  {decrypted}
                </p>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">RSA Encryption Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">Learn RSA encryption step by step</p>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{steps[step].title}</h2>
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              disabled={step === steps.length - 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            {steps[step].component}
          </div>

          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setStep(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === step ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSAVisualizer;