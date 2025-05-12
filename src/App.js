import SignUp from "./pages/SignUp";
import Home from './pages/1-Home/Home';
import About from './pages/2-About/About';
import Contact from './pages/3-Contact/Contact';
import Appointment from './pages/4-Appointment/Appointment';
import DoctorDetails from './pages/5-Doctor/DoctorDetails';
import LogIn from "./pages/6-Login/Login";
import OurDoctors from './pages/7-OurDoctors/OurDoctors';
import Confirmation from './pages/8-Confirmation/Confirmation';
import PatientProfile from "./pages/9-PatientProfile/PatientProfile";
import DoctorProfile from "./pages/10-DoctorProfile/DoctorProfile";
import MedicalExecuseD from "./pages/10-DoctorProfile/MedicalExcuseD";
import MedicalExecuseDetails from "./pages/10-DoctorProfile/MedicalExcuseDetails";
import ReseptionistProfile from "./pages/11-Receptionist/ReseptionistProfile";
import AddAppointment from "./pages/11-Receptionist/AddAppointment";
import ViewAppointment from "./pages/11-Receptionist/ViewAppointment";
import DoctorSchedule from "./pages/11-Receptionist/DoctorSchedule";
import UploadResults from "./pages/12-LapReceptionist/UploadResults";
import EmployeeSignUp from "./pages/13-SignUps/EmployeeSignUp";
import DoctorSignUp from "./pages/13-SignUps/DoctorSignUp";
import LabSignUp from "./pages/13-SignUps/LabSignUp";
import SignUpSelection from "./SignUpSelection";
import PreviousAppointments from "./pages/9-PatientProfile/PreviousAppointments";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
       <Router>
      <Routes>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/OurDoctors" element={<OurDoctors />} />
      <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Appointment" element={<Appointment/>} />
        <Route path="/DoctorDetails" element={<DoctorDetails />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/DoctorProfile" element={<DoctorProfile />} />
        <Route path="/MedicalExecuseD" element={<MedicalExecuseD/>} />
        <Route path="/MedicalExecuseDetails" element={<MedicalExecuseDetails/>} />
        <Route path="/ReseptionistProfile" element={<ReseptionistProfile/>} />
        <Route path="/AddAppointment" element={<AddAppointment/>} />
        <Route path="/ViewAppointment" element={<ViewAppointment/>} />
        <Route path="/DoctorSchedule" element={<DoctorSchedule/>} />
        <Route path="/UploadResults" element={<UploadResults/>} />
        <Route path="/EmployeeSignUp" element={<EmployeeSignUp/>} />
        <Route path="/DoctorSignUp" element={<DoctorSignUp/>} />
        <Route path="/LabSignUp" element={<LabSignUp/>} />
        <Route path="/SignUpSelection" element={<SignUpSelection/>} />
       <Route path="/PreviousAppointments" element={<PreviousAppointments/>} />

        </Routes>
    </Router>
    </div>
  )

 
}

export default App;



