import React, { useContext, useEffect } from "react";
import CTSidebar from "./CTSidebar";
import { CTContext } from "./CTContext";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CTRequests = () => {
  const { state, fetchPendingRequests, updateStatusForCustomer } =
    useContext(CTContext);

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const handleStatusUpdate = (appointmentId, status) => {
    updateStatusForCustomer(appointmentId, status);
  };

  return (
    <div className="flex w-screen">
      <CTSidebar />
      <div className="w-4/5 p-4 ml-auto h-screen">
        <h1 className="text-4xl font-semibold text-[#8883f0] mt-3">
          My Requests
        </h1>
        <div className="bg-slate-100 mt-8 pb-4 rounded-4 shadowboxer h-[90%] overflow-scroll">
          <div className="grid grid-cols-5 w-full justify-between items-center pt-4 px-8">
            <h1 className="font-semibold text-2xl w-[180px]">Name</h1>
            <h1 className="font-semibold ml-12 w-[150px] text-center text-2xl">
              Location
            </h1>
            <h1 className="font-semibold ml-12 w-[150px] text-center text-2xl">
              Date
            </h1>
            <h1 className="font-semibold ml-12 w-[150px] text-center text-2xl">
              Needs
            </h1>
            <h1 className="font-semibold ml-12 text-end text-2xl">Action</h1>
          </div>
          {state.pendingRequests.length > 0 ? (
            state.pendingRequests.map((val, key) => (
              <div
                key={key}
                className="grid grid-cols-5 w-full justify-between items-center mt-12 px-8"
              >
                <h1 className="font-normal w-[180px] text-xl">
                  {val?.caretakerId?.firstName} {val?.caretakerId?.lastName}
                </h1>
                <h1 className="font-normal text-xl w-[180px] text-center p-2 rounded-2 cursor-pointer mx-auto">
                  {val?.caretakerId?.location}
                </h1>
                <h1 className="font-normal text-xl text-center">
                  {formatDate(val.dateTime)}
                </h1>
                <h1
                  className={`font-normal ml-12 w-[150px] text-xl p-2 rounded-2 text-center`}
                >
                  {val?.description}
                </h1>
                <div className="flex flex-col items-end">
                  <button
                    className="bg-green-500 text-white p-1 px-3 font-semibold rounded-2 w-[100px]"
                    onClick={() => handleStatusUpdate(val._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 px-3 font-semibold rounded-2 mt-2 w-[100px]"
                    onClick={() => handleStatusUpdate(val._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-full mt-4">
              No requests to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTRequests;
