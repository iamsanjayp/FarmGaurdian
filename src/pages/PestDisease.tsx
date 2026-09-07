import { useState } from 'react';
import { Header } from '../components/Header';
import { analyzeCropImage } from '../services/api';
import { Upload, Camera, AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import './PestDisease.css';

export const PestDisease = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleUpload = async () => {
    setImageUploaded(true);
    setAnalyzing(true);
    const res = await analyzeCropImage(null);
    setResult(res);
    setAnalyzing(false);
  };

  return (
    <div className="pest-disease-page">
      <Header 
        title="Pest & Disease Detection" 
        description="Upload a crop image or capture one using your camera."
      />

      <div className="grid grid-cols-2 gap-6 mobile-col-1">
        {/* Left Column: Upload & Image */}
        <div className="upload-column flex flex-col gap-6">
          <div className="card upload-card text-center">
            {!imageUploaded ? (
              <div className="upload-placeholder">
                <div className="upload-icon-circle">
                  <Upload size={32} className="text-primary" />
                </div>
                <h3>Upload Crop Image</h3>
                <p>Drag and drop or choose a file</p>
                <div className="upload-actions mt-6">
                  <button className="btn btn-primary" onClick={handleUpload}>
                    <Upload size={18} /> Upload Image
                  </button>
                  <button className="btn btn-outline" onClick={handleUpload}>
                    <Camera size={18} /> Use Camera
                  </button>
                </div>
              </div>
            ) : (
              <div className="image-preview-container">
                {/* Mock image placeholder (using a CSS gradient for mock) */}
                <div className="mock-leaf-image">
                  <div className="disease-spot spot-1"></div>
                  <div className="disease-spot spot-2"></div>
                </div>
                <div className="image-overlay-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => {setImageUploaded(false); setResult(null);}}>
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>

          {analyzing && (
            <div className="card text-center analyzing-card">
              <div className="spinner"></div>
              <h3 className="mt-4">Analyzing with AI...</h3>
              <p>Scanning for visual disease evidence</p>
            </div>
          )}

          {result && (
            <div className="card disclaimer-card">
              <Info size={20} className="text-primary" />
              <p>
                <strong>AI Analysis — Prototype</strong><br />
                This AI output is an advisory. Severe cases should be verified by an agricultural expert.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        {result && (
          <div className="results-column flex flex-col gap-6">
            <div className="card main-result-card">
              <div className="result-header">
                <div className="detected-disease">
                  <span className="result-label">Detected:</span>
                  <h2 className="disease-name text-critical">{result.detected}</h2>
                </div>
                <div className="confidence-badge">
                  {result.confidence}% Match
                </div>
              </div>
              
              <div className="symptoms-list mt-4">
                <span className="result-label">Symptoms:</span>
                <ul className="mt-2">
                  {result.symptoms.map((sym: string, i: number) => (
                    <li key={i}><AlertTriangle size={14} className="text-warning"/> {sym}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card visual-analysis-card">
              <h3>VISUAL ANALYSIS</h3>
              <div className="confidence-bars mt-4">
                {result.visualAnalysis.map((item: any, i: number) => (
                  <div key={i} className="confidence-bar-item">
                    <div className="bar-labels">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="bar-track">
                      <div className={`bar-fill ${i === 0 ? 'bg-critical' : 'bg-primary'}`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card risk-card">
                <h3>CROP HEALTH RISK</h3>
                <div className="risk-level mt-2 text-critical flex items-center gap-2">
                  <ShieldAlert size={24} />
                  <span className="text-2xl font-bold">{result.riskLevel}</span>
                </div>
                <div className="risk-factors mt-4">
                  <span className="result-label">Risk factors:</span>
                  <ul className="mt-2 text-sm text-text-secondary">
                    {result.riskFactors.map((rf: string, i: number) => (
                      <li key={i}>• {rf}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card action-card">
                <h3>RECOMMENDED ACTION</h3>
                <ul className="action-list mt-4">
                  {result.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-2 mb-2">
                      <CheckCircle size={16} className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
