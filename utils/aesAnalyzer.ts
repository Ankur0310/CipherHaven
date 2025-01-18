import type { AESConfig, VulnerabilityReport } from '@/types';

export function analyzeAESConfig(config: AESConfig): VulnerabilityReport {
  const vulnerabilities = [];
  const recommendations = [];

  // Check key size
  if (config.keySize && config.keySize < 256) {
    const severity = config.keySize < 192 ? 'high' : 'medium';
    vulnerabilities.push({
      name: 'Suboptimal Key Length',
      severity,
      description: `AES-${config.keySize} provides less security margin than AES-256`,
      impact: 'Reduced security margin against future cryptographic advances',
      attackVector: 'Theoretical attacks may become practical with quantum computing advances',
      mitigation: 'Use AES-256 for maximum security',
    });
    recommendations.push('Upgrade to AES-256 for better security margin');
  }

  // Check mode of operation
  if (config.mode === 'ECB') {
    vulnerabilities.push({
      name: 'Insecure Mode of Operation',
      severity: 'critical',
      description: 'ECB mode does not provide semantic security',
      impact: 'Patterns in plaintext are visible in ciphertext, compromising confidentiality',
      attackVector: 'Pattern analysis and replay attacks are possible',
      mitigation: 'Use GCM mode for authenticated encryption or CBC/CTR with proper IV handling',
    });
    recommendations.push('Switch from ECB to GCM mode for stronger security');
  }

  // Check IV usage
  if (!config.iv && config.mode !== 'ECB') {
    vulnerabilities.push({
      name: 'Missing IV/Nonce',
      severity: 'critical',
      description: `${config.mode} mode requires IV/nonce for security`,
      impact: 'Identical plaintexts will produce identical ciphertexts',
      attackVector: 'Deterministic encryption enables various attacks',
      mitigation: 'Always use a unique IV/nonce for each encryption operation',
    });
    recommendations.push('Ensure IV/nonce is used for each encryption operation');
  }

  // Check padding scheme
  if (config.mode === 'CBC' && config.padding === 'Zero') {
    vulnerabilities.push({
      name: 'Weak Padding Scheme',
      severity: 'medium',
      description: 'Zero padding may leak information about message length',
      impact: 'Could enable padding oracle attacks in certain implementations',
      attackVector: 'Padding oracle attacks might be possible depending on implementation',
      mitigation: 'Use PKCS7 padding with CBC mode',
    });
    recommendations.push('Switch to PKCS7 padding for better security');
  }

  return {
    algorithm: 'AES',
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
