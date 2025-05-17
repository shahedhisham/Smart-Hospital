import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; // Add these imports
import "./home.css";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name); // Assuming you store the name in your user object
    }
  }, [])
  const categories = [
    {
      title: "Obstetrics & Gynecology",
      description: "Advanced diagnostic imaging and observation techniques",
      image: "Obg.png",
      link: "/Appointment.js",
    },
    {
      title: "Ear, Nose & Throat",
      description: "Cutting-edge mineral deficiency research and treatments",
      image: "ENT.png",
      link: "/ent",
    },
    {
      title: "Dentistry",
      description: "Specialized dermatological and microsurgical procedures",
      image: "Dent.png",
      link: "/Appointment",
    },
    {
      title: "Gastroenterology",
      description: "Comprehensive gastrointestinal care and treatment",
      image: "Gst.png",
      link: "/gastroenterology",
    },
    {
      title: "Internal Medicine",
      description:
        "Holistic approach to adult disease prevention and management",
      image: "Internal.png",
      link: "/internal-medicine",
    },
    {
      title: "Orthopedics",
      description: "Vascular and circulatory system specialists",
      image: "Ortho.png",
      link: "/orthopedics",
    },
    {
      title: "Pediatrics",
      description: "Specialized dermatological and microsurgical procedures",
      image: "Pediatrics.png",
      link: "/pediatrics",
    },
    {
      title: "Cardiology",
      description: "Comprehensive gastrointestinal care and treatment",
      image: "Cardiology.png",
      link: "/cardiology",
    },
    {
      title: "Brain & Nerves",
      description:
        "Holistic approach to adult disease prevention and management",
      image: "Brain.png",
      link: "/neurology",
    },
    {
      title: "Physical Therapy",
      description: "Vascular and circulatory system specialists",
      image: "physical.png",
      link: "/physical-therapy",
    },
    {
      title: "Psychiatrist",
      description: "Comprehensive gastrointestinal care and treatment",
      image: "Psychiatrist.png",
      link: "/psychiatry",
    },
    {
      title: "Dermatology",
      description:
        "Holistic approach to adult disease prevention and management",
      image: "Dermatology.png",
      link: "/dermatology",
    },
    {
      title: "Urology",
      description: "Vascular and circulatory system specialists",
      image: "Urology.png",
      link: "/urology",
    },
  ];

  return (
     <div className="main-container">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
       <div className="nav-right">
      {isLoggedIn ? (
        <Link to="/PatientProfile" className="welcome-message">
          Hello, {userName}
        </Link>
      ) : (
            <>
              <Link to="/LogIn">Log In</Link>
              <Link to="/SignUpSelection">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <div className="image">
        <img src="/Hospital.jpg" alt="Hospital Logo" className="banner-image" />
      </div>

      <section className="medical-categories">
        <div className="section-header">
          <h2 className="section-title">Our Medical Specialties</h2>
          <p className="section-subtitle">
            Comprehensive care across all medical disciplines
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-image-container">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                  loading="lazy"
                />
              </div>
              <div className="category-content">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <Link to={category.link} className="explore-button">
                  Explore Department
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="about-section">
  <div className="about-container">
    <div className="about-content">
      <div className="about-text">
        <h1 className="about-title">About Us</h1>
        
        <p className="about-description">
          We are a leading healthcare institution dedicated to providing exceptional medical services 
          to our community and beyond. With a legacy built on compassion, innovation, and unwavering 
          dedication, we strive to be the healthcare destination of choice for individuals seeking 
          high-quality care and comprehensive treatment solutions.
        </p>

      </div>

      <div className="about-image-wrapper">
        <img 
          src="Souad kafafi.png" 
          alt="Souad Kafafi University Hospital" 
          className="about-image"
        />
      </div>
    </div>

  </div>
</div>

      <footer className="footer">
  <div className="footer__content">
    <img
      src="Hosptal1.png"
      alt="Hospital Building"
      className="footer__image"
    />

    <div className="footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/OurDoctors">Our Doctors</Link></li>
      </ul>
    </div>

    {/* Contact Section with your original image icons */}
    <div className="footer-contact">
      <h3>Get in Touch</h3>
      <div className="footer-contact-item">
        <a href="tel:16111" className="footer-contact-link">Call Us: 16111</a>
      </div>
      
      <div className="footer-contact-item">
        <a 
          href="https://maps.google.com?q=26th+of+July+Corridor,+6th+of+October,+Egypt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-contact-link"
        >
          26th of July Corridor<br/>6th of October, Egypt
        </a>
      </div>
      
      <div className="footer-contact-item">
        <a href="mailto:info@souadkafafihospital.com" className="footer-contact-link">
          info@souadkafafihospital.com
        </a>
      </div>
      <div className="footer__social-icons">
        <a
          href="https://www.instagram.com/souad_kafafi_hospital"
          aria-label="Instagram"
          className="footer__social-icon"
        >
          <img src="instagram.png" alt="Instagram" />
        </a>
        <a
          href="https://x.com/themskuh"
          aria-label="Twitter"
          className="footer__social-icon"
        >
          <img src="twitter.png" alt="Twitter" />
        </a>
        <a href="https://m.facebook.com/themskuh" aria-label="Facebook" className="footer__social-icon">
          <img src="facebook.png" alt="Facebook" />
        </a>
      </div>
    </div>
  </div>

  <div className="footer__copyright">
    <p>© 2025 Souad Kafafi Hospital. All Rights Reserved.</p>
  </div>
</footer>
    </div>
  );
};

export default Home;