import React, { useContext, useEffect } from "react";
import Sidebar from "../Sidebar";
import { CTData } from "./../data/CTData";
import { ElderlyContext } from "./UserContext";

const MyRequests = () => {
  const { state, getAppointmentsUser } = useContext(ElderlyContext);
  console.log(state);
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-slate-300 text-white";
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };
  useEffect(() => {
    getAppointmentsUser();
  }, []);


  return (
    <div className="flex w-screen">
      <Sidebar />
      <div className="w-4/5 p-4 ml-auto h-[90%] overflow-scroll">
        <h1 className="text-4xl font-semibold text-[#8883f0] mt-3">
          My Requests
        </h1>
        <div className="bg-slate-100 mt-8 pb-4 rounded-4 shadowboxer">
          <div className="grid grid-cols-3 w-full justify-between items-center pt-4 px-16">
            <h1 className="font-semibold text-2xl">Name</h1>
            <div className="flex justify-center items-center">
              <h1 className="font-semibold ml-12 w-[150px] text-center text-2xl">
                Action
              </h1>
            </div>
            <div className="flex justify-end items-center">
              <h1 className="font-semibold ml-12 w-[150px] text-center text-2xl">
                Status
              </h1>
            </div>
          </div>
          {state.appointments.map((val, key) => (
            <div
              key={key}
              className="grid grid-cols-3 w-full justify-between items-center mt-12 px-16"
            >
              <div className="flex items-center">
                <img
                  src={val.caretakerId.pictureUrl}
                  className="h-10 mr-2 rounded-full"
                  alt={`${val.caretakerId.firstName}'s profile`}
                />
                <h1 className="font-normal text-xl">{val.caretakerId.firstName} {val.caretakerId.lastName}</h1>
              </div>
              <div className="ml-12 flex justify-center items-center">
                <h1
                  id="callbackground"
                  className="font-normal text-xl w-[120px] text-center p-2 rounded-2 cursor-pointer"
                >
                  Call Me
                </h1>
              </div>
              <div className="flex justify-end items-center">
                <h1
                  className={`font-normal ml-12 w-[150px] text-xl p-2 rounded-2 text-center ${getStatusStyle(
                    val.status
                  )}`}
                >
                  {val.status}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
