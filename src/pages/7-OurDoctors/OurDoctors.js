import { Link } from "react-router-dom";
import "./ourdoctors.css";

const OurDoctors = () => {
  const doctors = [
    {
      id: 1,
      name: "Prof. Dr. Tamer Farouk Siam",
      title: "Cardiology Specialist",
      rating: 4.5,
      reviews: 128,
      image: "Prof. Dr. Tamer Farouk Siam.png",
      className: "doctor-card-tamer" // Unique class name
    },
    {
      id: 2,
      name: "Dr. Nourhan Mokhtar",
      title: "Neurology Expert",
      rating: 4.8,
      reviews: 215,
      image: "Dr.NourhanMokhtar.png",
      className: "doctor-card-chen"
    },
    {
      id: 3,
      name: "Dr. Ahmed Tharwat",
      title: "Pediatric Care",
      rating: 4.2,
      reviews: 87,
      image: "Dr. Ahmed Tharwat.png",
      className: "doctor-card-tharwat"
    },
    {
      id: 4,
      name: "Prof. Dr. Ahmed Basyony",
      title: "Orthopedic Surgeon",
      rating: 4.7,
      reviews: 176,
      image: "Dr. Ahmed Basyony.png",
      className: "doctor-card-williams"
    },
    {
      id: 5,
      name: "Prof. Dr. Mahmoud Al-Aseel",
      title: "Dermatologist",
      rating: 4.3,
      reviews: 94,
      image: "Prof. Dr. Mahmoud Al-Aseel.png",
      className: "doctor-card-park"
    },
    {
      id: 6,
      name: "Dr. Mohamed Nashaat",
      title: "General Practitioner",
      rating: 4.0,
      reviews: 65,
      image: "Dr. Mohamed Nashaat.png",
      className: "doctor-card-wilson"
    },
    {
      id: 7,
      name: "Dr. Nehal Kabil",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Dr. Nehal Kabil.png",
      className: "Dr. Nehal Kabil.png"
    },
    {
      id: 8,
      name: "Dr. Amr Khairy Morsy",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Dr. Amr Khairy Morsy.png",
      className: "doctor-card-kim"
    },
    { 
      id: 9,
      name: "Dr. Mohammed Ali Al-Zamel",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Dr. Mohammed Ali Al-Zamel.png",
      className: "doctor-card-kim"
    },
    {
  
      id:10,
      name: "Prof. Dr. Gamal Abdel Fattah",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Prof. Dr. Gamal Abdel Fattah.png",
      className: "Dr. Nehal Kabil.png"
    },
    {
      id: 11,
      name: "Dr. Wael Ali Mohamed El-Zomor",
      title: "General Practitioner",
      rating: 4.0,
      reviews: 65,
      image: "Dr. Wael Ali Mohamed El-Zomor.png",
      className: "doctor-card-wilson"
    },
    {
      id: 12,
      name: "Dr. Kareem Mourad",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Dr. Kareem Mourad.png",
      className: "Dr. Nehal Kabil.png"
    },
    {
      id: 13,
      name: "Prof. Dr. Magda Abdel Hamid",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Prof. Dr. Magda Abdel Hamid.png",
      className: "doctor-card-kim"
    },
    { 
      id: 14,
      name: "Prof. Dr. Sherif Abdel Rahman",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Prof. Dr. Sherif Abdel Rahman.png",
      className: "doctor-card-kim"
    },
    {
  
      id:15,
      name: "Prof. Dr. Hamdy Mohamed Ibrahim",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Prof. Dr. Hamdy Mohamed Ibrahim.png",
    },
    {
      id: 16,
      name: "Dr. Kareem Mourad",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Dr. Kareem Mourad.png",
      className: "Dr. Nehal Kabil.png"
    },
    {
      id: 17,
      name: "Dr. Mina Safwat Samble",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Dr. Mina Safwat Samble.png",
      className: "doctor-card-kim"
    },
    { 
      id: 18,
      name: "Dr. Nauman Mohamed Kamal El-Shafie",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Dr. Nauman Mohamed Kamal El-Shafie.png",
      className: "doctor-card-kim"
    },
    {
  
      id:19,
      name: "Dr. Lotfi El-Kilani",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Dr. Lotfi El-Kilani.png",
    },
    { 
      id: 20,
      name: "Prof. Dr. Khairy El-Morsy",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Prof. Dr. Khairy El-Morsy.png",
      className: "doctor-card-kim"
    },
    {
      id: 21,
      name: "Dr. Lobna Abdel Azim Rifaat",
      title: "ENT Specialist",
      rating: 4.4,
      reviews: 118,
      image: "Dr. Lobna Abdel Azim Rifaat.png",
      className: "doctor-card-kim"
    },
    
    {
  
      id:22,
      name: "Dr. Hany Gamal",
      title: "Ophthalmologist",
      rating: 4.6,
      reviews: 142,
      image: "Dr. Hany Gamal.png",
    },
    
   
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star">½</span>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <>
      <header>
        <div className="nav-logo">
          <img src="logo.png" alt="Hospital Logo" className="hospital-logo" />
        </div>
        <nav className="navbar1">
          <ul className="nav-links1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <div className="nav-right">
            <Link to="/LogIn">Log In</Link>
            <Link to="/SignUp">Sign Up</Link>
          </div>
        </nav>
      </header>
      
      <main>
  <div className="ourdoctors-grid-container">
    <h2 className="oursection-title">Our Medical Specialists</h2>
    <p className="oursection-subtitle">Top-rated healthcare professionals</p>

    <div className="ourcompact-doctors-grid">
      {doctors.map((doctor) => (
        <div key={doctor.id} className={`ourcompact-doctor-card ${doctor.className}`}>
          <div className="ourdoctor-image-container">
            <img src={doctor.image} alt={doctor.name} className="ourdoctor-image" />
          </div>
          <div className="ourcompact-doctor-info">
            <h3 className="ourdoctor-name">{doctor.name}</h3>
            <p className="ourdoctor-title">{doctor.title}</p>
            <div className="ourdoctor-rating">
              <div className="stars">
                {renderStars(doctor.rating)}
                <span className="rating-value">{doctor.rating.toFixed(1)}</span>
              </div>
              <p className="review-count">({doctor.reviews} reviews)</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</main>

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
        <a href="#" aria-label="Facebook" className="footer__social-icon">
          <img src="facebook.png" alt="Facebook" />
        </a>
      </div>
    </div>
  </div>

  <div className="footer__copyright">
    <p>© 2025 Souad Kafafi Hospital. All Rights Reserved.</p>
  </div>
</footer>
    </>
  );
};

export default OurDoctors;
