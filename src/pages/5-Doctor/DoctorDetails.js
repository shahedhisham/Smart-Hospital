import { useEffect, useState } from "react"; // Add these imports
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./doctordetails.css";

const DoctorDetails = () => {
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
  const [reviews] = useState([
    {
      id: 1,
      patientName: "Ahmed Mohamed",
      rating: 5,
      comment: "الدكتورة نورهان ممتازة جداً في التشخيص والعلاج، أنصح بها بشدة",
      date: "2023-05-15"
    },
    {
      id: 2,
      patientName: "Mariam Ali",
      rating: 4,
      comment: "طبيبة محترفة وشرحها واضح، لكن الانتظار كان طويلاً بعض الشيء",
      date: "2023-04-22"
    },
  ]);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [rating, setRating] = useState(4);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotStatus, setSlotStatus] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Doctor's weekly schedule (time slots for available days)
  const weeklySchedule = {
    0: ["09:00", "10:00", "11:00", "14:00", "15:00"], // Sunday
    1: ["09:00", "10:00", "11:00", "14:00", "15:00"], // Monday
    2: ["10:00", "11:00", "13:00", "16:00"], // Tuesday
    3: ["10:00", "11:00", "13:00", "16:00"], // Wednesday
    4: ["09:30", "11:30", "14:30", "15:30"], // Thursday
    6: ["09:30", "11:30", "14:30", "15:30"], // Saturday
    // Friday (5) is intentionally omitted - not available
  };

  // Generate dates for the next 2 weeks
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates.filter(date => date.getDay() !== 5); // Filter out Fridays
  };

  const availableDates = generateAvailableDates();

  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(date);
    setFormData({ ...formData, date: dateString });
    setShowDatePicker(false);
    checkSlotAvailability(dateString, formData.time);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "time") {
      checkSlotAvailability(formData.date, value);
    }
  };

  const checkSlotAvailability = (dateString, timeString) => {
    if (!dateString) return;

    setIsLoadingSlots(true);

    // Simulate API call
    setTimeout(() => {
      const date = new Date(dateString);
      const dayOfWeek = date.getDay();

      const slotsForDate = weeklySchedule[dayOfWeek] || [];
      setAvailableSlots(slotsForDate);

      if (timeString) {
        const isAvailable = slotsForDate.includes(timeString);
        setSlotStatus(isAvailable ? "available" : "unavailable");
      } else {
        setSlotStatus(null);
      }

      setIsLoadingSlots(false);
    }, 500);
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (slotStatus !== "available") {
      alert("Please select an available time slot before submitting.");
      return;
    }
    
    // Generate reservation number
    const reservationNumber = `D-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Navigate to confirmation page with state
    navigate("/confirmation", {
      state: {
        doctorName: "Dr. Nourhan Mokhtar",
        date: formData.date,
        time: formData.time,
        cost: "50 EGP",
        reservationNumber: reservationNumber
      }
    });
  };

  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Select a date";
    const options = { weekday: 'long', year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        <section className="scheduler-container">
          <div className="combined-container">
            {/* Left Column - Doctor Image and Reviews */}
            <div className="left-column">
              <div className="image-section">
                <div className="image-frame">
                  <img
                    src="/Dr.NourhanMokhtar.png"
                    alt="Dr. Nourhan Mokhtar"
                    className="service-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3>Dr. Nourhan Mokhtar</h3>
                      <p>Cardiologist</p>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${star <= rating ? "filled" : ""}`}
                            onClick={() => setRating(star)}
                          >
                            ★
                          </span>
                        ))}
                        <span className="rating-text">
                          {rating}.0 (24 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Reviews Section */}
              <div className="doctor-reviews-section">
                <div className="reviews-header">
                  <h2>Patient Reviews</h2>
                  <div className="average-rating">
                    <span className="rating-number">{rating}.0</span>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= rating ? "filled" : ""}>★</span>
                      ))}
                    </div>
                    <span className="total-reviews">({reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <h4>{review.patientName}</h4>
                          <div className="review-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} className={star <= review.rating ? "filled" : ""}>★</span>
                            ))}
                          </div>
                          <span className="review-date">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-reviews">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Appointment Form */}
            <div className="form-section">
              <div className="form-header">
                <h1 className="form-title">Schedule Your Appointment</h1>
                <p className="form-subtitle">Book with Dr. Nourhan Mokhtar</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date:</label>
                    <div className="date-picker-container">
                      <div 
                        className="date-display" 
                        onClick={() => setShowDatePicker(!showDatePicker)}
                      >
                        {selectedDate ? formatDate(selectedDate) : "Select a date"}
                      </div>
                      {showDatePicker && (
                        <div className="date-picker-popup">
                          {availableDates.map((date, index) => (
                            <div
                              key={index}
                              className={`date-option ${selectedDate && selectedDate.toDateString() === date.toDateString() ? "selected" : ""}`}
                              onClick={() => handleDateSelect(date)}
                            >
                              {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {isLoadingSlots && (
                      <div className="loading-indicator">
                        Checking availability...
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Time:</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      disabled={!formData.date}
                      className="compact-time-select"
                    >
                      <option value="">Select time</option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {slotStatus && !isLoadingSlots && formData.time && (
                      <div className={`slot-status ${slotStatus}`}>
                        {slotStatus === "available"
                          ? "✓ Slot available"
                          : "✗ Slot not available"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-divider"></div>

                <div className="form-group">
                  <label>Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="3"
                  ></textarea>
                </div>

                <div className="appointment-summary">
                  <h3>
                    Appointment: {formatDate(formData.date)} {formData.time && `at ${formData.time}`}
                  </h3>
                </div>
                <button
                  type="submit"
                  className="appointment-submit-btn"
                  disabled={slotStatus !== "available"}
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DoctorDetails;