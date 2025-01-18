export const challenges = [
  {
    id: 1,
    title: "Caesar's Secret",
    description: "Decrypt this message using Caesar cipher: 'KHOOR ZRUOG'",
    difficulty: "Beginner",
    points: 10,
    hint: "Try shifting each letter back by 3 positions",
    solution: "HELLO WORLD",
    completed: false,
    category: "Caesar"
  },
  {
    id: 2,
    title: "Base64 Basics",
    description: "Decode this Base64 string: 'SGVsbG8gQ3J5cHRv'",
    difficulty: "Beginner",
    points: 10,
    hint: "This is a common encoding used in web applications",
    solution: "Hello Crypto",
    completed: false,
    category: "Base64"
  },
  {
    id: 3,
    title: "Vigenère Vault",
    description: "Decrypt using Vigenère cipher with key 'KEY': 'RIJVS GPCNR'",
    difficulty: "Intermediate",
    points: 15,
    hint: "Each letter in the key corresponds to a shift value",
    solution: "HELLO WORLD",
    completed: false,
    category: "Vigenere"
  },
  {
    id: 4,
    title: "Hash Hunter",
    description: "Find a string that produces this MD5 hash: '5d41402abc4b2a76b9719d911017c592'",
    difficulty: "Advanced",
    points: 25,
    hint: "It's a common 5-letter word",
    solution: "hello",
    completed: false,
    category: "Hash"
  }
] as const;