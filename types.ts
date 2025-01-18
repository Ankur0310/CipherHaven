export interface VulnerabilityReport {
    algorithm: string;
    timestamp: string;
    configuration: {
      [key: string]: any;
    };
    vulnerabilities: Vulnerability[];
    riskScore: number;
    recommendations: string[];
  }
  
  export interface Vulnerability {
    name: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    impact: string;
    attackVector: string;
    mitigation: string;
  }
  
  export interface RSAConfig {
    keySize: number;
    publicExponent: string;
    padding: string;
  }
  
  export interface AESConfig {
    keySize: number;
    mode: 'ECB' | 'CBC' | 'CTR' | 'GCM';
    iv: boolean;
    padding: string;
  }
  
  export interface HashConfig {
    algorithm: string;
    saltLength: number;
    iterations: number;
  }

  export interface Challenge {
    id: number;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    points: number;
    hint?: string;
    solution: string;
    completed: boolean;
    category: 'Caesar' | 'Vigenere' | 'Base64' | 'Hash';
  }
  
  export interface GameState {
    score: number;
    currentLevel: number;
    unlockedLevels: number[];
  }

  export interface SHA256State {
    input: string;
    currentStage: number;
    currentRound: number;
    showPadding: boolean;
    blockSize: number;
    selectedRounds: number[];
    binaryInput: string[];
    messageSchedule: string[];
    workingVariables: {
      a: string;
      b: string;
      c: string;
      d: string;
      e: string;
      f: string;
      g: string;
      h: string;
    };
    intermediateHashes: string[];
    finalHash: string;
  }
  
  export interface StageProps {
    state: SHA256State;
    onStateChange: (newState: Partial<SHA256State>) => void;
  }
  
  export const INITIAL_HASH_VALUES = [
    '6a09e667', 'bb67ae85', '3c6ef372', 'a54ff53a',
    '510e527f', '9b05688c', '1f83d9ab', '5be0cd19'
  ];

  export interface Message {
    id: string;
    sender: string;
    recipient: string;
    content: string;
    timestamp: number;
    sessionKey?: string;
  }
  
  export interface InterceptedMessage extends Message {
    isIntercepted: boolean;
    isModified: boolean;
    originalContent?: string;
  }
  
  export interface Session {
    id: string;
    key: string;
    timestamp: number;
    isExpired: boolean;
  }