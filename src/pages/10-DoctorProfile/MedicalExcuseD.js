import React from 'react';
import { useNavigate } from 'react-router-dom';
import './doctorprofile.css';

const MedicalExcuseD = () => {
   const navigate = useNavigate();
   
   const requests = [
     {
       id: 1,
       name: 'Nooran Khaled',
       email: 'Nooran6@gmail.com',
       phone: '01102470308',
       startDate: '12/4/2025',
       endDate: '19/4/2025',
       reason: 'Dog bite injury',
       file: 'medical_report.pdf',
       diagnosis: 'Patient shows signs of infection...',
       medications: 'Antibiotics and pain relievers'
     },
     {
       id: 2,
       name: 'Sarah Mohamed',
       email: 'sarah@example.com',
       phone: '01012345678',
       startDate: '15/4/2025',
       endDate: '22/4/2025',
       reason: 'Severe back pain',
       file: 'xray_results.pdf',
       diagnosis: 'Herniated disc',
       medications: 'Anti-inflammatory medication'
     }
   ];
 
   const handleViewDetails = (request) => {
     navigate('/MedicalExecuseDetails', { state: { request } });
   };
 
   const handleAccept = (id, e) => {
     e.stopPropagation();
     alert(`Accepted request #${id}`);
     // Add your acceptance logic here
   };
 
   const handleReject = (id, e) => {
     e.stopPropagation();
     alert(`Rejected request #${id}`);
     // Add your rejection logic here
   };
 
   return (
     <div className="medical-excuse-container">
       <h2 className="section-title">Medical Execuse Requests</h2>
       
       {requests.length === 0 ? (
         <p className="no-requests">No current requests</p>
       ) : (
         <div className="excuse-cards-container">
           {requests.map((req) => (
             <div className="excuse-card" key={req.id} onClick={() => handleViewDetails(req)}>
               <div className="patient-info">
                 <h3>{req.name}</h3>
                 <p><span className="info-label">Email:</span> {req.email}</p>
                 <p><span className="info-label">Phone:</span> {req.phone}</p>
                 <p>
                   <span className="info-label">Period:</span> 
                   From {req.startDate} to {req.endDate}
                 </p>
                 <p><span className="info-label">Reason:</span> {req.reason}</p>
               </div>
               
               <div className="card-actions">
                 <div className="decision-buttons">
                   <button 
                     className="excuse-btn reject-btn"
                     onClick={(e) => handleReject(req.id, e)}
                   >
                     Reject
                   </button>
                   <button 
                     className="excuse-btn accept-btn"
                     onClick={(e) => handleAccept(req.id, e)}
                   >
                     Accept
                   </button>
                 </div>
                 <button 
                   className="excuse-btn details-btn"
                   onClick={(e) => {
                     e.stopPropagation();
                     handleViewDetails(req);
                   }}
                 >
                   View Details
                 </button>
               </div>
             </div>
           ))}
         </div>
       )}
     </div>
   );
 };

export default MedicalExcuseD;