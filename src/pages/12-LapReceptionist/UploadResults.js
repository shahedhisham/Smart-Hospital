import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadResults.css';

function UploadResults() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  
  // Lab receptionist info (would typically come from auth context or API)
  const [labReceptionist, setLabReceptionist] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@labclinic.com"
  });

  // جلب بيانات المرضى (في الواقع سيتم جلبها من API)
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const mockPatients = [
          { id: "20001467", name: "Mohamed Osama", age: 20, gender: "Male" },
          { id: "20001468", name: "Ahmed Ali", age: 35, gender: "Male" },
          { id: "20001469", name: "Samira Mahmoud", age: 28, gender: "Female" },
          { id: "20001470", name: "Youssef Ibrahim", age: 45, gender: "Male" },
          { id: "20001471", name: "Fatma Hassan", age: 32, gender: "Female" }
        ];
        setPatients(mockPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // تصفية المرضى حسب البحث
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  );

  const handleLogout = () => {
    navigate('/login');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleSubmit = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first");
      return;
    }

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      // Create form data with all necessary information
      const formData = new FormData();
      formData.append('patientId', selectedPatient.id);
      formData.append('patientName', selectedPatient.name);
      formData.append('labReport', file);
      formData.append('uploadedBy', labReceptionist.name);
      formData.append('uploadedByEmail', labReceptionist.email);
      formData.append('uploadDate', new Date().toISOString());
      
      // In a real app, you would send this to your API
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Mock success response
      const mockResponse = {
        success: true,
        message: `Report uploaded successfully by ${labReceptionist.name}`,
        details: {
          patient: selectedPatient.name,
          file: fileName,
          uploadedBy: labReceptionist.name,
          email: labReceptionist.email,
          date: new Date().toLocaleString()
        }
      };
      
      alert(`Report uploaded successfully!\n\n` +
            `Patient: ${selectedPatient.name}\n` +
            `File: ${fileName}\n` +
            `Uploaded by: ${labReceptionist.name}\n` +
            `Email: ${labReceptionist.email}\n` +
            `Date: ${new Date().toLocaleString()}`);
      
      // Reset form
      setFileName("");
      setFile(null);
      setSelectedPatient(null);
      setSearchTerm("");
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logout" onClick={handleLogout}>
          <img src="logout 1.png" alt="Logout" className="sidebar-icon" />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="upload-container">
          <h1 className="Upload-page-title">Upload Lab Results</h1>
          
          {/* Lab Receptionist Info */}
          <div className="receptionist-info">
            <h3>Lab Receptionist</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span>{labReceptionist.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span>{labReceptionist.email}</span>
              </div>
            </div>
          </div>

          {/* Patient Search */}
          <div className="form-group">
            <label className="form-label">Search Patient (Name or ID)</label>
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter patient name or ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedPatient(null);
                }}
              />
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedPatient(null);
                  }}
                >
                  ×
                </button>
              )}
            </div>
            
            {/* Search Results */}
            {searchTerm && !selectedPatient && (
              <div className="search-results">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map(patient => (
                    <div 
                      key={patient.id}
                      className="patient-result"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setSearchTerm(`${patient.name} (ID: ${patient.id})`);
                      }}
                    >
                      <div className="patient-info">
                        <span className="patient-name">{patient.name}</span>
                        <span className="patient-id">ID: {patient.id}</span>
                      </div>
                      <span className="patient-age-gender">
                        {patient.age}y, {patient.gender}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    No patients found for "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Patient Info */}
          {selectedPatient && (
            <div className="patient-info-card">
              <div className="patient-header">
                <h3>Patient Information</h3>
                <span className="patient-status">Active</span>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Full Name:</span>
                  <span>{selectedPatient.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Patient ID:</span>
                  <span>{selectedPatient.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Gender:</span>
                  <span>{selectedPatient.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age:</span>
                  <span>{selectedPatient.age} years</span>
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="form-group">
            <label className="form-label">Upload Lab Report</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="labReport"
                className="file-input"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <label htmlFor="labReport" className="file-label">
                <span className="file-name">
                  {fileName || "Choose file or drag here"}
                </span>
                <span className="browse-btn">Select File</span>
              </label>
            </div>
            <div className="file-requirements">
              Supported formats: PDF (Max 10MB)
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="upload-cancel-btn"
              onClick={() => {
                setSelectedPatient(null);
                setSearchTerm("");
                setFile(null);
                setFileName("");
              }}
            >
              Cancel
            </button>
            <button 
              className="Lab-upload-btn" 
              onClick={handleSubmit}
              disabled={!selectedPatient || !file}
            >
              <span className="Lab-upload-icon">↑</span> Upload Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadResults;