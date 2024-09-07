import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Registration from './components/Registration';
import UserRegistration from './pages/UserRegistration';
import CTRegistration from './pages/CTRegistration';
import UserDashboard from './pages/UserDashboard';
import AttendEvent from './components/userdashboard/AttendEvent';
import CreateEvent from './components/userdashboard/CreateEvent';
import Medication from './components/userdashboard/Medication';
import MyRequests from './components/userdashboard/MyRequests';
import HireCT from './components/userdashboard/HireCT';
import BasicTimePicker from './components/BasicTimePicker';
import UserProfile from './components/userdashboard/UserProfile';
import CTProfile from './components/CTDashboard/CTProfile';
import CTRequests from './components/CTDashboard/CTRequests';
import CTDashboard from './components/CTDashboard/CTDashboard';
import CTCustomers from './components/CTDashboard/CTCustomers';
import CTReviews from './components/CTDashboard/CTReviews';
import { CTLayout } from './components/CTDashboard/CTLayout';
import ElderlyLayout from './components/userdashboard/ElderlyLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/userregister",
      element: <UserRegistration />,
    },
    {
      path: "/ctregister",
      element: <CTRegistration />,
    },
    {
      path: "/userdashboard",
      element: <ElderlyLayout />,
      children: [
        {
          path: "",
          element: <UserDashboard />,
        },
        {
          path: "attendevent",
          element: <AttendEvent />,
        },
        {
          path: "createevent",
          element: <CreateEvent />,
        },
        {
          path: "medication",
          element: <Medication />,
        },
        {
          path: "myrequests",
          element: <MyRequests />,
        },
        {
          path: "hirect",
          element: <HireCT />,
        },
        {
          path: "userprofile",
          element: <UserProfile />,
        },
        {
          path: "timepicker",
          element: <BasicTimePicker />,
        },
      ],
    },
    {
      path: "/caretaker",
      element: <CTLayout />,
      children: [
        {
          path: "ctdashboard",
          element: <CTDashboard />,
        },
        {
          path: "ctprofile",
          element: <CTProfile />,
        },
        {
          path: "ctcustomers",
          element: <CTCustomers />,
        },
        {
          path: "ctreviews",
          element: <CTReviews />,
        },
        {
          path: "ctrequests",
          element: <CTRequests />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
