import React, { useState } from "react";
import './patientprofile.css';

const RequestMedicalExcuse = () => {
  const categories = [
    { id: "1", name: "Ear, Nose & Throat", doctors: ["Dr. Wael Ali Mohamed El-Zomor", "Prof. Dr. Gamal Abdel Fattah"] },
    { id: "2", name: "Dentistry", doctors: ["Dr. Nourhan Mokhtar", "Prof. Dr. Ahmed Basyony", "Dr. Ahmed Tharwat", "Dr. Mohamed Nashaat", "Prof. Dr. Mahmoud Al-Aseel" , "Dr. Nehal Kabil", "Dr. Amr Khairy Morsy" ] },
    { id: "3", name: "Urology", doctors: ["Dr. Mina Safwat Samble"] },
    { id: "4", name: "Pediatrics", doctors: ["Prof. Dr. Magda Abdel Hamid"] },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    category: "",
    doctor: "",
    reason: "",
    document: null
  });

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    
    setFormData({
      ...formData,
      category: categoryId,
      doctor: ""
    });

    if (selectedCategory) {
      setFilteredDoctors(selectedCategory.doctors);
    } else {
      setFilteredDoctors([]);
    }
  };

  const handleDoctorSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (formData.category) {
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      const filtered = selectedCategory.doctors.filter(doctor => 
        doctor.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Medical excuse request submitted successfully!");
  };

  return (
    <div className="excuse-container">
      <h1 className="excuse-title">Request Medical Excuse</h1>
      
      <form onSubmit={handleSubmit} className="excuse-form">
        <div className="excuse-section">
          <h2 className="excuse-section-title">Patient Information</h2>
          <div className="excuse-group">
            <label className="excuse-label">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="excuse-input"
              required
            />
          </div>
          
          <div className="excuse-group">
            <label className="excuse-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="excuse-input"
              required
            />
          </div>
          
          <div className="excuse-group">
            <label className="excuse-label">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="excuse-input"
              required
            />
          </div>
        </div>

        <div className="excuse-section">
          <h2 className="excuse-section-title">Excuse Details</h2>
          <div className="excuse-row">
            <div className="excuse-group">
              <label className="excuse-label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="excuse-input"
                required
              />
            </div>
            
            <div className="excuse-group">
              <label className="excuse-label">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="excuse-input"
                required
              />
            </div>
          </div>
          
          <div className="excuse-group">
            <label className="excuse-label">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="excuse-select"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {formData.category && (
            <div className="excuse-group">
              <label className="excuse-label">Doctor:</label>
              <div className="excuse-search-container">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={handleDoctorSearch}
                  className="excuse-search"
                />
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="excuse-select"
                  required
                >
                  <option value="">Select Doctor</option>
                  {filteredDoctors.map(doctor => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          <div className="excuse-group">
            <label className="excuse-label">Reason for medical excuse:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="excuse-textarea"
              required
              rows="4"
            />
          </div>
        </div>

        <div className="excuse-section">
          <h2 className="excuse-section-title">Document Upload</h2>
          <div className="excuse-group">
            <label className="excuse-label">Please upload your document:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="excuse-file-input"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
        </div>

        <div className="excuse-actions">
          <button type="submit" className="excuse-submit-btn">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestMedicalExcuse;