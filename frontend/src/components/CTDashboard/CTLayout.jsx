import { Route, Routes } from "react-router-dom";
import { CTProvider } from "./CTContext";
import CTCustomers from "./CTCustomers";
import CTDashboard from "./CTDashboard";
import CTProfile from "./CTProfile";
import CTSidebar from "./CTSidebar";
import CTRequests from "./CTRequests";

export const CTLayout = () => {
  return (
    <CTProvider>
      <CTSidebar />
      <div className="">
        <Routes>
          <Route path="/" element={<CTDashboard />} />
          <Route path="/ctdashboard" element={<CTDashboard />} />
          <Route path="/ctprofile" element={<CTProfile />} />
          <Route path="/ctcustomers" element={<CTCustomers />} />
          <Route path="/ctreviews" element={<CTProfile />} />
          <Route path="/ctrequests" element={<CTRequests />} />
        </Routes>
      </div>
    </CTProvider>
  );
};
