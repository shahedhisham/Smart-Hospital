import { useEffect, useState } from "react"; // Add these imports
import { Link } from 'react-router-dom';
import './appointment.css';

const Appointment = () => {
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
    const doctors = [
        {
          id: 1,
          name: "Dr. Nourhan Mokhtar",
          title: "استشارى طب وحراجة الفم والاستان بمستشفى سعاد كفافي",
          image: "Dr.NourhanMokhtar.png",
          link: "/doctordetails" // Changed to lowercase 'link' and added ID
        },
        {
          id: 2,
          name: "Prof. Dr. Ahmed Basyony",
          title: "اسناد تقويم الاسنان كلية طب الاسنان واستشارى التقويم بمستشفى سعاد كفافي",
          image: "Dr. Ahmed Basyony.png",
          link: "/doctordetails/2"
        },
        {
          id: 3,
          name: "Dr. Ahmed Tharwat",
          title: "استشارى تركيات ورزاعة اسنان بمستشفى سعاد كفافي",
          image: "Dr. Ahmed Tharwat.png",
          link: "/doctordetails/3"
        },
        {
          id: 4,
          name: "Dr. Mohamed Nashaat",
          title: "اخصائي طب أسنان أطفال",
          image: "Dr. Mohamed Nashaat.png",
          link: "/doctordetails/4"
        },
        {
            id: 5,
            name: "Prof. Dr. Mahmoud Al-Aseel",
            title: "أستاذ علاج الجذور بكلية طب الفم و الأسنان جامعة مصر واستشاري علاج الجذور بمستشفي سعاد كفافي",
            image: "Prof. Dr. Mahmoud Al-Aseel.png",
            link: "/doctordetails/4"
        },
        {
            id: 6,
            name: "Dr. Nehal Kabil",
            title: "ا د اسنان اطفال وصحة المجتمع في كلية طب اسنان جامعة مصر ورئيس وحدة علاج اسنان الاطفال وذوي الاحتياجات تحت مخدر عام بمستشفي سعاد كفافي",
            image: "Dr. Nehal Kabil.png",
            link: "/doctordetails/4"
        },
        {
            id: 7,
            name: "Dr. Amr Khairy Morsy",
            title: "مدرس مساعد قسم تقويم الاسنان جامعه مصر للعلوم والتكنولوجيا واخصائي تقويم في مستشفي سعاد كفافي ",
            image: "Dr. Amr Khairy Morsy.png",
            link: "/doctordetails/4"

          }
 

      ];
    
    return (
        <>
 <header className="contact-header">
  <div className="nav-logo">
    <img src="logo.png" alt="Hospital Logo" className="hospital-logo" />
  </div>
  <nav className="navbar1">
    <ul className="nav-links1">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about-us">About Us</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
    </ul>
    <div className="About-nav-right">
      {isLoggedIn ? (
        <Link to="/PatientProfile" className="About-welcome-message">
          Hello, {userName}
        </Link>
      ) : (
        <>
          <Link to="/LogIn">Log In</Link>
          <Link to="/SignUpSelection">Sign Up</Link>
        </>
      )}
    </div>
  </nav>
</header>
            <main>        
                <div className="appointment-doctors-container">
                    <h2>Available Doctors</h2>
                    <div className="appointment-doctors-grid">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="appointment-doctor-card">
                                <div className="appointment-doctor-image">
                                    <img src={doctor.image} alt={doctor.name} />
                                </div>
                                <div className="appointment-doctor-info">
                                    <h3>{doctor.name}</h3>
                                    <p className="appointment-doctor-title">{doctor.title}</p>
                                    <Link to={doctor.link} className="appointment-book-button">
                                        BOOK NOW
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Appointment;