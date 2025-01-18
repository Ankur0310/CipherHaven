import type { HashConfig, VulnerabilityReport } from '@/types';

export function analyzeHashConfig(config: HashConfig): VulnerabilityReport {
  const vulnerabilities = [];
  const recommendations = [];

  // Check hash algorithm strength
  const weakAlgorithms = ['MD5', 'SHA-1'];
  if (weakAlgorithms.includes(config.algorithm)) {
    vulnerabilities.push({
      name: 'Cryptographically Broken Hash Function',
      severity: 'critical',
      description: `${config.algorithm} is considered cryptographically broken and vulnerable to collisions`,
      impact: 'Collisions can be generated, compromising data integrity',
      attackVector: 'Practical collision attacks using modern computing resources',
      mitigation: 'Use a stronger hash function like SHA-256 or SHA-3',
    });
    recommendations.push(`Replace ${config.algorithm} with SHA-256 or SHA-3 for better security`);
  }

  // Check salt length for general-purpose hashing
  if (config.saltLength !== undefined && config.saltLength < 16) {
    vulnerabilities.push({
      name: 'Insufficient Salt Length',
      severity: 'high',
      description: 'Salt length is too short to effectively prevent rainbow table attacks',
      impact: 'Reduced defense against precomputed hash attacks',
      attackVector: 'More feasible rainbow table attacks due to short salt',
      mitigation: 'Use a salt of at least 16 bytes (128 bits)',
    });
    recommendations.push('Increase salt length to at least 16 bytes for adequate security');
  }

  // Check iteration count for password hashing algorithms
  if (['bcrypt', 'Argon2id'].includes(config.algorithm) && config.iterations !== undefined) {
    if (config.iterations < 10000) {
      vulnerabilities.push({
        name: 'Insufficient Iteration Count for Password Hashing',
        severity: 'medium',
        description: `Iteration count of ${config.iterations} is too low for secure password hashing`,
        impact: 'Weak resistance to brute-force attacks',
        attackVector: 'Fast computation allows more efficient password cracking attempts',
        mitigation: 'Increase iteration count to at least 10,000 or follow current best practices',
      });
      recommendations.push('Increase iteration count to 10,000 or higher for stronger brute-force resistance');
    }
  }

  // General-purpose hash functions with iterations > 1 (not suitable for password hashing)
  if (!['bcrypt', 'Argon2id'].includes(config.algorithm) && config.iterations > 1) {
    vulnerabilities.push({
      name: 'Inappropriate Hash Function for Password Hashing',
      severity: 'high',
      description: `Using ${config.algorithm} with iterations for password hashing is not recommended`,
      impact: 'Vulnerable to specialized cracking hardware like GPUs and ASICs',
      attackVector: 'High-efficiency password cracking with specialized hardware',
      mitigation: 'Use a dedicated password hashing function such as Argon2id or bcrypt',
    });
    recommendations.push('Use Argon2id or bcrypt for secure password hashing');
  }

  return {
    algorithm: 'Hash Function',
    timestamp: new Date().toISOString(),
    configuration: config,
    vulnerabilities,
    riskScore: calculateRiskScore(vulnerabilities),
    recommendations,
  };
}

function calculateRiskScore(vulnerabilities: VulnerabilityReport['vulnerabilities']): number {
  const severityWeights: Record<string, number> = {
    critical: 1.0,
    high: 0.7,
    medium: 0.4,
    low: 0.1,
  };

  const totalWeight = vulnerabilities.reduce((sum, vuln) => sum + (severityWeights[vuln.severity] || 0), 0);
  return Math.min(10, Math.round(totalWeight * 10) / 10);
}
