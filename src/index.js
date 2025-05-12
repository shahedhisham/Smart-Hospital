import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/1-Home/Home';
import LogIn from "./pages/6-Login/Login";
import Aboutus from './pages/2-About/About';
import Contactus from './pages/3-Contact/Contact';
import Appointment from './pages/4-Appointment/Appointment';
import DoctorDetails from './pages/5-Doctor/DoctorDetails';
import OurDoctors from './pages/7-OurDoctors/OurDoctors';
import Confirmation from './pages/8-Confirmation/Confirmation';
import PatientProfile from "./pages/9-PatientProfile/PatientProfile";
import MedicalRecord from "./pages/9-PatientProfile/MedicalRecord";
import DoctorProfile from "./pages/10-DoctorProfile/DoctorProfile";
import MedicalExecuseD from "./pages/10-DoctorProfile/MedicalExcuseD";
import MedicalExecuseDetails from "./pages/10-DoctorProfile/MedicalExcuseDetails";
import ReseptionistProfile from "./pages/11-Receptionist/ReseptionistProfile";
import AddAppointment from "./pages/11-Receptionist/AddAppointment";
import ViewAppointment from "./pages/11-Receptionist/ViewAppointment";
import DoctorSchedule from "./pages/11-Receptionist/DoctorSchedule";
import SignUp from "./pages/SignUp";
import UploadResults from "./pages/12-LapReceptionist/UploadResults";
import EmployeeSignUp from "./pages/13-SignUps/EmployeeSignUp";
import DoctorSignUp from "./pages/13-SignUps/DoctorSignUp";
import LabSignUp from "./pages/13-SignUps/LabSignUp";
import SignUpSelection from "./SignUpSelection";
import PreviousAppointments from "./pages/9-PatientProfile/PreviousAppointments";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },

  {
    path: "/About",
    element: <Aboutus/>
  },

  {
    path: "/Contact",
    element: <Contactus/>
  },

  {
    path: "/Appointment",
    element: <Appointment/>
  },
  {
    path: "/DoctorDetails",
    element: <DoctorDetails/>
  },
  {
    path: "/SignUp",
    element: <SignUp/>
  },
  {
    path: "/LogIn",
    element: <LogIn/>
  },
  {
    path: "/OurDoctors",
    element: <OurDoctors/>
  },
  {
    path: "/Confirmation",
    element: <Confirmation/>
  },
  {
    path: "/PatientProfile",
    element: <PatientProfile/>
  },
  {
    path: "/MedicalRecord",
    element: <MedicalRecord/>
  },
  {
    path: "/DoctorProfile",
    element: <DoctorProfile/>
  },
  {
    path: "/MedicalExecuseD",
    element: <MedicalExecuseD/>
  },
  {
    path: "/MedicalExecuseDetails",
    element: <MedicalExecuseDetails/>
  },
  {
    path: "/ReseptionistProfile",
    element: <ReseptionistProfile/>
  },
  {
    path: "/AddAppointment",
    element: <AddAppointment/>
  },
  {
    path: "/ViewAppointment",
    element: <ViewAppointment/>
  },
  {
    path: "/DoctorSchedule",
    element: <DoctorSchedule/>
  },
  {
    path: "/UploadResults",
    element: <UploadResults/>
  },
  {
    path: "/EmployeeSignUp",
    element: <EmployeeSignUp/>
  },
  {
    path: "/DoctorSignUp",
    element: <DoctorSignUp/>
  },
  {
    path: "/LabSignUp",
    element: <LabSignUp/>
  },
  {
    path: "/SignUpSelection",
    element: <SignUpSelection/>
  },
  {
    path: "/PreviousAppointments",
    element: <PreviousAppointments/>
  },


]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);
