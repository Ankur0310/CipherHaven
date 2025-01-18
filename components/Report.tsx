import React from 'react';
import { FileDown, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { VulnerabilityReport } from '@/types';

interface Props {
  report: VulnerabilityReport;
}

export function Report({ report }: Props) {
  const downloadReport = () => {
    const jsonString = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vulnerability-report-${report.algorithm}-${report.timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Vulnerability Report</h2>
        <button
          onClick={downloadReport}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-500"
        >
          <FileDown className="w-5 h-5" />
          <span>Download Report</span>
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {report.algorithm} Analysis Results
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Scan completed at {new Date(report.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-6">
            {report.vulnerabilities.map((vuln, index) => (
              <div key={index} className="border-l-4 border-l-indigo-500 pl-4">
                <div className="flex items-center space-x-2">
                  {getSeverityIcon(vuln.severity)}
                  <h4 className="text-lg font-medium text-gray-900">{vuln.name}</h4>
                </div>
                <p className="mt-2 text-sm text-gray-600">{vuln.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Attack Vector</h5>
                    <p className="mt-1 text-sm text-gray-600">{vuln.attackVector}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Impact</h5>
                    <p className="mt-1 text-sm text-gray-600">{vuln.impact}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-900">Mitigation</h5>
                  <p className="mt-1 text-sm text-gray-600">{vuln.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h4 className="text-lg font-medium text-gray-900">Recommendations</h4>
          <ul className="mt-4 space-y-2">
            {report.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}