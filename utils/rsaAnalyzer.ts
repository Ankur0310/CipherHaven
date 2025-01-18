import type { RSAConfig, VulnerabilityReport } from '@/types';

export function generateRSAKeyPair(keySize: number): { publicExponent: string } {
  // Common public exponents
  const commonExponents = ['65537', '3', '17', '257'];
  return {
    publicExponent: commonExponents[0], // Using 65537 (0x10001) as default
  };
}

export function analyzeRSAConfig(config: RSAConfig): VulnerabilityReport {
  const vulnerabilities = [];
  const recommendations = [];

  // Check key size against NIST recommendations
  if (config.keySize < 2048) {
    vulnerabilities.push({
      name: 'Critically Insufficient Key Length',
      severity: 'critical',
      description: 'RSA key size is below the minimum recommended length of 2048 bits',
      impact: 'Keys can be factored using modern computing resources',
      attackVector: 'Number Field Sieve algorithm can factor the modulus and recover private key',
      mitigation: 'Increase key size to at least 2048 bits, preferably 3072 bits for post-2030 security',
    });
    recommendations.push('Increase RSA key size to at least 2048 bits immediately');
  } else if (config.keySize < 3072) {
    vulnerabilities.push({
      name: 'Suboptimal Key Length for Future Use',
      severity: 'medium',
      description: 'RSA key size may become insufficient for long-term security',
      impact: 'May become vulnerable to factorization in the next decade',
      attackVector: 'Future advances in classical and quantum computing',
      mitigation: 'Consider upgrading to 3072 bits for post-2030 security',
    });
    recommendations.push('Plan to upgrade to 3072-bit keys for long-term security');
  }

  // Check public exponent
  const publicExponent = BigInt(config.publicExponent);
  if (publicExponent < 65537n) {
    if (publicExponent === 3n) {
      vulnerabilities.push({
        name: 'Dangerous Public Exponent',
        severity: 'critical',
        description: 'Using e=3 is known to be vulnerable to several attacks',
        impact: 'Messages with low entropy might be recoverable without the private key',
        attackVector: 'Coppersmith\'s attack when message is short or has low entropy',
        mitigation: 'Use 65537 (0x10001) as the public exponent',
      });
    } else {
      vulnerabilities.push({
        name: 'Weak Public Exponent',
        severity: 'high',
        description: 'Public exponent is smaller than recommended',
        impact: 'May be vulnerable to specific attacks',
        attackVector: 'Low exponent attacks possible with improper padding',
        mitigation: 'Use 65537 (0x10001) as the public exponent',
      });
    }
    recommendations.push('Change public exponent to 65537 (0x10001)');
  }

  // Check padding scheme
  if (config.padding === 'PKCS1v1.5') {
    vulnerabilities.push({
      name: 'Deprecated Padding Scheme',
      severity: 'high',
      description: 'PKCS#1 v1.5 padding is vulnerable to padding oracle attacks',
      impact: 'May allow decryption of messages or signature forgery',
      attackVector: 'Bleichenbacher\'s attack and variants can exploit padding oracles',
      mitigation: 'Use RSA-OAEP for encryption and RSA-PSS for signatures',
    });
    recommendations.push('Migrate to RSA-OAEP for encryption operations');
    recommendations.push('Use RSA-PSS for digital signatures');
  }

  // Best practices recommendations
  recommendations.push(...getBestPractices(config));

  return {
    algorithm: 'RSA',
    timestamp: new Date().toISOString(),
    configuration: config,
    vulnerabilities,
    riskScore: calculateRiskScore(vulnerabilities),
    recommendations,
  };
}

function getBestPractices(config: RSAConfig): string[] {
  const practices = [];

  // Key generation and management
  practices.push('Generate keys using a cryptographically secure random number generator');
  practices.push('Store private keys in a secure hardware module (HSM) when possible');
  practices.push('Implement regular key rotation policies');

  // Implementation security
  practices.push('Ensure constant-time implementation for all RSA operations');
  practices.push('Implement blinding to prevent timing attacks');
  practices.push('Validate all inputs before processing');

  // Modern standards
  if (config.keySize < 3072) {
    practices.push('Consider transitioning to elliptic curve cryptography (ECC) for better performance');
  }

  return practices;
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