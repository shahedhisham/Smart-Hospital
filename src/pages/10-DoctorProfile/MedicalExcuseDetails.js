import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './doctorprofile.css';

const MedicalExcuseDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [approvalFile, setApprovalFile] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // If no data is available, go back to previous page
  if (!state?.request) {
    navigate(-1);
    return null;
  }

  const { request } = state;

  const handleBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    setApprovalFile(e.target.files[0]);
  };

  const handleAccept = () => {
    if (!approvalFile) {
      alert('Please upload the approved medical excuse document');
      return;
    }

    setIsApproving(true);
    
    // Here you would typically upload the file to your backend
    // and update the request status in your database
    // This is just a simulation
    setTimeout(() => {
      alert('Medical excuse approved and document uploaded');
      setIsApproving(false);
      navigate(-1);
    }, 1500);
  };

  const handleReject = () => {
    if (!rejectionReason) {
      alert('Please provide a reason for rejection');
      return;
    }

    // Here you would typically send the rejection to your backend
    alert(`Medical excuse rejected. Reason: ${rejectionReason}`);
    navigate(-1);
  };

  return (
    <div className="excuse-details-container">
      <button className="back-button" onClick={handleBack}>
        &larr; Back
      </button>
      
      <h2 className="details-title">Medical Excuse Details</h2>
      
      <div className="details-section">
        <h3>Patient Information</h3>
        <div className="patient-details">
          <p><strong>Name:</strong> {request.name}</p>
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Phone:</strong> {request.phone}</p>
          <p><strong>Requested Period:</strong> From {request.startDate} to {request.endDate}</p>
          <p><strong>Reason:</strong> {request.reason}</p>
        </div>
      </div>
      
      <div className="details-section">
        <h3>Diagnosis and Notes</h3>
        <div className="diagnosis-info">
          <p><strong>Diagnosis:</strong></p>
          <p>{request.diagnosis || 'No information available'}</p>
          
          <p><strong>Suggested Medications:</strong></p>
          <p>{request.medications || 'No information available'}</p>
        </div>
      </div>
      
      <div className="details-section">
        <h3>Attached Documents</h3>
        <div className="document-preview">
          <p>
            <strong>File:</strong> 
            <a href={`/files/${request.file}`} target="_blank" rel="noopener noreferrer">
              {request.file}
            </a>
          </p>
          <div className="preview-area">
            {/* Document preview would appear here */}
            <p>Document preview will appear here</p>
          </div>
        </div>
      </div>
      
      {/* Approval File Upload Section */}
      <div className="details-section">
        <h3>Approval Documentation</h3>
        <div className="file-upload-section">
          <label>
            <strong>Upload Approved Excuse Document (PDF):</strong>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="file-input"
            />
          </label>
          {approvalFile && (
            <p className="file-info">
              Selected file: {approvalFile.name} ({Math.round(approvalFile.size / 1024)} KB)
            </p>
          )}
        </div>
      </div>
      
      {/* Rejection Reason Section */}
      <div className="details-section">
        <h3>Rejection Reason</h3>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="If rejecting, please provide a reason..."
          className="rejection-textarea"
        />
      </div>
      
      <div className="action-buttons">
        <button className="btn reject-btn" onClick={handleReject}>
          Reject Request
        </button>
        <button 
          className="btn accept-btn" 
          onClick={handleAccept}
          disabled={isApproving}
        >
          {isApproving ? 'Approving...' : 'Approve Request'}
        </button>
      </div>
    </div>
  );
};

export default MedicalExcuseDetails;