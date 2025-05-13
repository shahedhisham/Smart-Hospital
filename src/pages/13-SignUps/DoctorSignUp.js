import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./EmployeeSignUp.css";

const DoctorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    specialization: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    experience: '',
    education: ''
  });

  const specializations = [
    'Neurology',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Ophthalmology',
    'Gastroenterology',
    'Endocrinology',
    'Psychiatry',
    'Radiology',
    'General Surgery',
    'Internal Medicine'
  ];

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
      length: false,
      uppercase: false,
      number: false,
      specialChar: false
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Validate password in real-time
    if (name === 'password') {
      const newValidation = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      };
      setPasswordValidation(newValidation);
    }
  };

  const validatePassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include an uppercase letter, a number, and a special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.licenseNumber) newErrors.licenseNumber = 'Medical license number is required';
    if (!formData.experience) newErrors.experience = 'Years of experience is required';
    if (!formData.education) newErrors.education = 'Education background is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/DoctorProfile'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const isPasswordValid = passwordValidation.length && 
                         passwordValidation.uppercase && 
                         passwordValidation.number && 
                         passwordValidation.specialChar;
  return (
    <div className="employee-signup-container">
      <div className="employee-signup-box">
        <h2 className="employee-signup-title">Doctor Registration</h2>
        
        {success && (
          <div className="employee-signup-alert success">
            Registration successful! Redirecting...
          </div>
        )}
        
        {errors.submit && (
          <div className="employee-signup-alert error">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="employee-signup-form">
          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Specialization*</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={errors.specialization ? 'error' : ''}
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            {errors.specialization && <span className="error-message">{errors.specialization}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Medical License Number*</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={errors.licenseNumber ? 'error' : ''}
              placeholder="Enter your license number"
            />
            {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
          </div>

          <div className="form-group">
            <label>Years of Experience*</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={errors.experience ? 'error' : ''}
              placeholder="Enter years of experience"
            />
            {errors.experience && <span className="error-message">{errors.experience}</span>}
          </div>

          <div className="form-group">
            <label>Education Background*</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={errors.education ? 'error' : ''}
              placeholder="Enter your education background"
            />
            {errors.education && <span className="error-message">{errors.education}</span>}
          </div>

          <div className="form-row">
  <div className="form-group">
    <label>Password*</label>
    <div className="password-input-container">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        className={errors.password ? 'error' : ''}
      />
      <span
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          backgroundImage: `url(${showPassword ? "/eye-open.png" : "/eye-closed.png"})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
    </div>
    {errors.password && (
      <span className="error-message">{errors.password}</span>
    )}
    {formData.password && !isPasswordValid && (
      <div className="password-requirements">
        <p className="password-requirement" style={{ color: passwordValidation.length ? 'green' : 'red' }}>
          • At least 8 characters
        </p>
        <p className="password-requirement" style={{ color: passwordValidation.uppercase ? 'green' : 'red' }}>
          • At least one uppercase letter
        </p>
        <p className="password-requirement" style={{ color: passwordValidation.number ? 'green' : 'red' }}>
          • At least one number
        </p>
        <p className="password-requirement" style={{ color: passwordValidation.specialChar ? 'green' : 'red' }}>
          • At least one special character
        </p>
      </div>
    )}
  </div>
  
  <div className="form-group">
    <label>Confirm Password*</label>
    <div className="password-input-container">
      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className={errors.confirmPassword ? 'error' : ''}
      />
      <span
        className="password-toggle"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        style={{
          backgroundImage: `url(${showConfirmPassword ? "/eye-open.png" : "/eye-closed.png"})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
    </div>
    {errors.confirmPassword && (
      <span className="error-message">{errors.confirmPassword}</span>
    )}
  </div>
</div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;

