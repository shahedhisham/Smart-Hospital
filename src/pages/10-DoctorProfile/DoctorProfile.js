import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './doctorprofile.css';
import DoctorAppointments from './DoctorAppointments';
import MedicalExcuseD from './MedicalExcuseD';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const [activePage, setActivePage] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: "Dr. Ahmed Tharwat",
    phone: "01102470308",
    id: "200010305",
    email: "Doctorname@gmail.com",
    age: "36",
    specialization: "Neurologist",
    experience: "12 Years",
    education: "M.D. in Neurology, Harvard Medical School, 2010",
    profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  });

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(prev => ({
      ...prev,
      height: (prev.width * height) / width
    }));
    imgRef.current = e.currentTarget;
  };

  const getCroppedImg = (image, crop) => {
    if (!image || !crop) return;
    
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        0.9
      );
    });
  };

  const handleSaveCrop = async () => {
    try {
      if (imgRef.current && completedCrop) {
        const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
        const reader = new FileReader();
        reader.onloadend = () => {
          setDoctorData(prev => ({
            ...prev,
            profileImage: reader.result
          }));
          setSrc(null);
        };
        reader.readAsDataURL(croppedImageBlob);
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
  };

  const renderContent = () => {
    switch (activePage) {
      case 'appointments':
        return <DoctorAppointments />;
      case 'excuses':
        return <MedicalExcuseD />;
      case 'profile':
      default:
        return (
          <div className="doctor-profile-content">
            {src && (
              <div className="crop-modal">
                <div className="crop-container">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                  >
                    <img
                      ref={imgRef}
                      src={src}
                      onLoad={onImageLoad}
                      alt="Crop me"
                    />
                  </ReactCrop>
                  <div className="crop-buttons">
                    <button onClick={() => setSrc(null)}>Cancel</button>
                    <button onClick={handleSaveCrop}>Save Crop</button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="profile-header">
              <div className="profile-image-container">
                <img
                  src={doctorData.profileImage}
                  alt="Doctor"
                  className="doctor-image"
                />
                {isEditing && (
                  <>
                    <button 
                      onClick={triggerFileInput}
                      className="change-photo-btn"
                    >
                      Change Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={onSelectFile}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </>
                )}
              </div>
              <div>
                <h2>{doctorData.name}</h2>
                <p className="doctor-title">{doctorData.title}</p>
              </div>
            </div>

            <div className="rating-box">{doctorData.specialization} ⭐⭐⭐⭐⭐ 5.0 Rating</div>

            <div className="contact-box">
              <h3>Contact</h3>
              {isEditing ? (
                <>
                  <div className="editable-field">
                    <img src="phone-call.png" alt="Phone" className="icon" />
                    <input
                      type="text"
                      name="phone"
                      value={doctorData.phone}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="editable-field">
                    <img src="iscon-identification 1.png" alt="ID" className="icon" />
                    <span>{doctorData.id}</span>
                  </div>
                  <div className="editable-field">
                    <img src="mail.png" alt="Email" className="icon" />
                    <input
                      type="text"
                      name="email"
                      value={doctorData.email}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p><img src="phone-call.png" alt="Phone" className="icon" />
                    {doctorData.phone}</p>
                  <p><img src="iscon-identification 1.png" alt="ID" className="icon" />
                   {doctorData.id}</p>
                  <p><img src="mail.png" alt="Email" className="icon" />
                     {doctorData.email}</p>
                </>
              )}
            </div>

            <div className="details-box">
              <h3>Doctor Details</h3>
              {isEditing ? (
                <>
                  <p><strong>Name:</strong> {doctorData.name}</p>
                  <p><strong>Specialization:</strong> {doctorData.specialization}</p>

                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {doctorData.name}</p>
                  <p><strong>Specialization:</strong> {doctorData.specialization}</p>
                  <p><strong>Age:</strong> {doctorData.age}</p>
                  <p><strong>Experience:</strong> {doctorData.experience}</p>
                  <p><strong>Education:</strong> {doctorData.education}</p>
                </>
              )}
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <button onClick={handleSave} className="save-btn">Save Changes</button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
              )}
            </div>
          </div>
        );
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  const logout = () => {
    navigate('/logIn');
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="sidebar-item" onClick={goToHome}>
          <img src="/icon-home.png" alt="Home" className="sidebar-icon" />
          <span>Home</span>
        </div>
        <div className="sidebar-item" onClick={() => setActivePage('profile')}>
          <img src="/icon-User.png" alt="Profile" className="sidebar-icon" />
          <span>My Profile</span>
        </div>
        <div className="sidebar-item" onClick={() => setActivePage('appointments')}>
          <img src="/icon-report.png" alt="Appointments" className="sidebar-icon" />
          <span>Appointments</span>
        </div>
        <div className="sidebar-item" onClick={() => setActivePage('excuses')}>
          <img src="/icon-event.png" alt="Medical Excuse" className="sidebar-icon" />
          <span>Medical Excuse</span>
        </div>
        <div className="sidebar-logout" onClick={logout}>
          <img src="/logout 1.png" alt="Logout" className="sidebar-icon" />
          <span>Logout</span>
        </div>
      </div>
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default DoctorProfile;