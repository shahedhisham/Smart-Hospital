import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // بيانات وهمية للمستخدمين
  const mockUsers = [
    {
      email: 'patient@example.com',
      password: 'Patient@123',
      role: 'patient',
      name: 'John Patient'
    },
    {
      email: 'doctor@example.com',
      password: 'Doctor@123',
      role: 'doctor',
      name: 'Dr. Sarah Smith'
    },
    {
      email: 'reception@example.com',
      password: 'Reception@123',
      role: 'receptionist',
      name: 'Reception User'
    },
    {
      email: 'lab@example.com',
      password: 'Lab@123',
      role: 'lab_receptionist',
      name: 'Lab Technician'
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }
    
    // محاكاة استدعاء API
    const user = mockUsers.find(u => 
      u.email === email && u.password === password
    );

    if (user) {
      // محاكاة استجابة السيرفر
      const mockResponse = {
        token: 'mock-jwt-token',
        role: user.role,
        user: {
          name: user.name,
          email: user.email
        }
      };
      // حفظ في localStorage
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('role', mockResponse.role);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      // الحته اللي بتحدد المسار حسب نوع المستخدم
      switch(mockResponse.role) {
        case 'patient':
          navigate('/');
          break;
        case 'doctor':
          navigate('/DoctorProfile');
          break;
        case 'receptionist':
          navigate('/ReseptionistProfile');
          break;
        case 'lab_receptionist':
          navigate('/UploadResults');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-auth-container">
      <div className="login-main-container">
        <div className="login-form-box">
          <h2 className="login-form-title">Login</h2>
          {error && <p className="login-error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <label className="login-input-label">Email</label>
              <input
                type="email"
                className="login-input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
  <label className="login-input-label">Password</label>
  <div className="password-input-container">
    <input
      type={showPassword ? "text" : "password"}
      className="login-input-field"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <span
      className="password-toggle"
      onClick={togglePasswordVisibility}
      style={{
        backgroundImage: `url(${showPassword ? "/eye-open.png" : "/eye-closed.png"})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
  </div>
  {error && <p className="login-error-message">{error}</p>}
</div>

            <div className="login-forgot-password">
              <Link to="/forgot-password" className="login-forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-submit-btn">Log In</button>

            <div className="login-signup-option">
              <p className="login-signup-text">Or <Link to="/SignUp" className="login-signup-link">Sign Up</Link></p>
            </div>
          </form>
          <div className="login-test-credentials">
            <h4>Test Credentials:</h4>
            <ul>
              <li><strong>Patient:</strong> patient@example.com / Patient@123</li>
              <li><strong>Doctor:</strong> doctor@example.com / Doctor@123</li>
              <li><strong>Reception:</strong> reception@example.com / Reception@123</li>
              <li><strong>Lab:</strong> lab@example.com / Lab@123</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;