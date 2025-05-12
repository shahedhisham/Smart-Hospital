import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './doctorprofile.css';

const MedicalExcuseDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If no data is available, go back to previous page
  if (!state?.request) {
    navigate(-1);
    return null;
  }

  const { request } = state;

  const handleBack = () => {
    navigate(-1);
  };

  const handleAccept = () => {
    // Add your acceptance logic here
    alert('Medical excuse approved');
    navigate(-1);
  };

  const handleReject = () => {
    // Add your rejection logic here
    alert('Medical excuse rejected');
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
      
      <div className="action-buttons">
        <button className="btn reject-btn" onClick={handleReject}>
          Reject Request
        </button>
        <button className="btn accept-btn" onClick={handleAccept}>
          Approve Request
        </button>
      </div>
    </div>
  );
};

export default MedicalExcuseDetails;