import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './doctorprofile.css';

const DoctorAppointments = () => {
    // States
    const [showDiagnosis, setShowDiagnosis] = useState(null);
    const [diagnoses, setDiagnoses] = useState({});
    const [activeTab, setActiveTab] = useState('today');
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDelay, setSelectedDelay] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [appointments, setAppointments] = useState([]);
  
    // Mock data - سيتم استبدالها بالبيانات الحقيقية من API
    const mockPatients = {
      "pat_1001": {
        name: "Shahed HishamEldin",
        phone: "+20123456789",
        email: "shahed@example.com"
      },
      "pat_1002": {
        name: "Mohamed Ali",
        phone: "+20111111111",
        email: "mohamed@example.com"
      },
      "pat_1003": {
        name: "Noura Ahmed",
        phone: "+20112233445",
        email: "noura@example.com"
      }
    };
  
    // Delay options
    const delayOptions = [
      { value: '15', label: '15 minutes' },
      { value: '30', label: '30 minutes' },
      { value: '45', label: '45 minutes' },
      { value: '60', label: '1 hour' },
      { value: '90', label: '1.5 hours' },
      { value: '120', label: '2 hours' }
    ];
  
    // Fetch appointments from API (مثال)
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          // هذا مثال للـ API الحقيقي - سيتم استبداله
          // const response = await fetch('https://your-api.com/appointments');
          // const data = await response.json();
          // setAppointments(data);
          
          // بيانات وهمية للتوضيح
          const mockAppointments = [
            { 
              id: 1, 
              patientId: "pat_1001",
              name: 'Shahed HishamEldin', 
              time: '11:00 AM',
              status: 'confirmed'
            },
            { 
              id: 2, 
              patientId: "pat_1002",
              name: 'Mohamed Ali', 
              time: '02:30 PM',
              status: 'confirmed'
            },
            { 
              id: 3, 
              patientId: "pat_1003",
              name: 'Noura Ahmed', 
              time: '04:15 PM',
              status: 'confirmed'
            }
          ];
          setAppointments(mockAppointments);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
  
      fetchAppointments();
    }, []);
  
    // Handlers
    const handleUploadClick = (appointmentId) => {
      setShowDiagnosis(showDiagnosis === appointmentId ? null : appointmentId);
    };
  
    const handleDiagnosisChange = (appointmentId, value) => {
      setDiagnoses(prev => ({
        ...prev,
        [appointmentId]: value
      }));
    };
  
    const openNotificationModal = (type, appointment = null) => {
      setNotificationType(type);
      setSelectedAppointment(appointment);
      setShowNotificationModal(true);
      setSelectedDelay('');
    };
  
    // إرسال الإشعار الحقيقي إلى الباك إند
    const sendNotification = async () => {
      if (notificationType === 'delay' && !selectedDelay) {
        alert('Please select delay duration');
        return;
      }
  
      setIsSending(true);
      
      try {
        // هنا يتم الاتصال بالباك إند الحقيقي
        const response = await fetch('https://your-api-endpoint.com/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-auth-token' // إذا كان يحتاج مصادقة
          },
          body: JSON.stringify({
            appointmentId: selectedAppointment?.id,
            patientId: selectedAppointment?.patientId,
            type: notificationType,
            delayMinutes: notificationType === 'delay' ? selectedDelay : null,
            message: notificationType === 'delay' 
              ? `Your appointment will be delayed by ${selectedDelay} minutes`
              : 'Your doctor is absent today'
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to send notification');
        }
  
        const result = await response.json();
        
        alert(`Notification sent successfully to patient: ${
          notificationType === 'delay' 
            ? `Appointment delayed by ${selectedDelay} minutes`
            : 'Doctor absence reported'
        }`);
        
        setShowNotificationModal(false);
      } catch (error) {
        console.error("Notification error:", error);
        alert('Failed to send notification. Please try again.');
      } finally {
        setIsSending(false);
      }
    };
  
    // Submit diagnosis (مثال)
    const submitDiagnosis = async (appointmentId) => {
      try {
        // await fetch('https://your-api-endpoint.com/diagnosis', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     appointmentId,
        //     diagnosis: diagnoses[appointmentId]
        //   })
        // });
        
        alert("Diagnosis submitted successfully!");
        setShowDiagnosis(null);
      } catch (error) {
        alert("Error submitting diagnosis");
      }
    };
  
    return (
      <div className="appointments-container">
        <h2 className="section-title">My Appointments</h2>
        
        {/* Global absence button */}
        <div className="global-notification-actions">
          <button 
            className="global-absence-btn"
            onClick={() => openNotificationModal('absence')}
          >
            Report Absence for Today
          </button>
        </div>
        
        {/* Appointment tabs */}
        <div className="appointment-tabs">
          <div 
            className={`tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Today<br />{new Date().toLocaleDateString()}
          </div>
          <div 
            className={`tab ${activeTab === 'tomorrow' ? 'active' : ''}`}
            onClick={() => setActiveTab('tomorrow')}
          >
            Tomorrow<br />{new Date(Date.now() + 86400000).toLocaleDateString()}
          </div>
        </div>
        
        {/* Appointments list */}
        <div className="appointments-list">
          {appointments.map(appointment => (
            <div className="appointment-card" key={appointment.id}>
              <div className="appointment-info">
                <h3>{appointment.name}</h3>
                <p className="appointment-time">{appointment.time}</p>
                <span className={`status-badge ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
              
              <div className="appointment-actions">
                <button 
                  className="upload-btn"
                  onClick={() => handleUploadClick(appointment.id)}
                >
                  {showDiagnosis === appointment.id ? 'Hide' : 'Upload Diagnosis'}
                </button>
                
                <button 
                  className="delay-btn"
                  onClick={() => openNotificationModal('delay', appointment)}
                >
                  Report Delay
                </button>
              </div>
              
              {showDiagnosis === appointment.id && (
                <div className="diagnosis-section">
                  <h4>Patient Diagnosis</h4>
                  <textarea
                    value={diagnoses[appointment.id] || ''}
                    onChange={(e) => handleDiagnosisChange(appointment.id, e.target.value)}
                    placeholder="Enter diagnosis, medications, and recommendations..."
                    rows="5"
                  />
                  <div className="diagnosis-actions">
                    <button 
                      className="cancel-btn" 
                      onClick={() => setShowDiagnosis(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="submit-btn"
                      onClick={() => submitDiagnosis(appointment.id)}
                    >
                      Submit Diagnosis
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Notification modal */}
        {showNotificationModal && (
          <div className="notification-modal">
            <div className="modal-content">
              <h3>
                {notificationType === 'delay' 
                  ? `Report Delay for ${selectedAppointment?.name}'s Appointment`
                  : 'Report Absence for All Today\'s Appointments'}
              </h3>
              
              {notificationType === 'delay' ? (
                <div className="delay-options">
                  <p>Select delay duration:</p>
                  <div className="delay-buttons">
                    {delayOptions.map(option => (
                      <button
                        key={option.value}
                        className={`delay-option ${selectedDelay === option.value ? 'selected' : ''}`}
                        onClick={() => setSelectedDelay(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p>This will notify all patients with appointments today. Are you sure?</p>
              )}
              
              <div className="modal-actions">
                <button 
                  onClick={sendNotification}
                  disabled={isSending || (notificationType === 'delay' && !selectedDelay)}
                  className="confirm-btn"
                >
                  {isSending ? 'Sending...' : 'Confirm'}
                </button>
                
                <button 
                  onClick={() => setShowNotificationModal(false)}
                  disabled={isSending}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default DoctorAppointments;