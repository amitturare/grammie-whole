import React, { useContext, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ElderlyContext } from "../components/userdashboard/UserContext";
import { format } from "date-fns";
const Dashboard = () => {
  const { state, getProfileData } = useContext(ElderlyContext);
  const [loading, setLoading] = useState(true);
  console.log(state);
  useEffect(() => {
    getProfileData().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  const formatDate = (date) => format(new Date(date), "MMMM d, yyyy");

  return (
    <div className="w-screen flex">
      <div className="w-full md:w-4/5 p-4 ml-auto">
        <h1 className="text-4xl font-semibold text-[#8883f0] mt-3">
          Dashboard
        </h1>
        <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col p-4 rounded-lg">
            <h1 className="bg-[#8883f0] text-white font-semibold text-center text-2xl mb-1 p-2 rounded-lg">
              Hired Caretakers
            </h1>
            <div className="p-4 py-2 bg-slate-200 rounded-lg">
              {state.profileData?.appointments?.length ? (
                state.profileData.appointments.map((val, key) => (
                  <div
                    key={key}
                    className="flex items-center p-2 bg-white rounded-lg my-2"
                  >
                    <img
                      className="h-12 w-12 rounded-full mr-2"
                      src={val.userId.pictureUrl}
                      alt={val.userId.firstName}
                    />

                    <h1 className="text-xl text-black">
                      {val.userId?.firstName} {val.userId?.lastName} 

                    </h1>
                  </div>
                ))
              ) : (
                <p>No hired caretakers</p>
              )}
            </div>
          </div>
          <div className="flex flex-col p-4">
            <h1 className="bg-[#8883f0] text-white font-semibold text-center text-2xl mb-2 p-2 rounded-lg">
              Calendar
            </h1>
            <div className="rounded-lg bg-slate-200">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex flex-col p-4 rounded-lg relative md:-top-32">
            <h1 className="bg-[#8883f0] text-white font-semibold text-center text-2xl mb-2 p-2 rounded-lg">
              Upcoming Event
            </h1>
            <div className="bg-slate-200 p-4 py-2 rounded-lg">
              {state.profileData?.attendingEvents?.length ? (
                state.profileData.attendingEvents.map((event, index) => (
                  <div key={index} className="text-center p-2 my-2 bg-white text-xl rounded-lg">
                    <h2>{event.title}</h2>
                    <h2>{formatDate(event.dateTime)}</h2>
                    <h2>{event.location}</h2>
                  </div>
                ))
              ) : (
                <p>No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
