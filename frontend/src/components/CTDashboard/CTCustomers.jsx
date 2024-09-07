import React, { useContext, useEffect, useState } from "react";
import CTSidebar from "./CTSidebar";
import { CTContext } from "./CTContext";

const CTCustomers = () => {
  const [view, setView] = useState("all");
  const {
    state,
    fetchAllCustomers,
    fetchCurrentCustomers,
    fetchPastCustomers,
  } = useContext(CTContext);

  const filterCustomers = () => {
    if (view === "current") {
      return state.currentCustomers || [];
    } else if (view === "past") {
      return state.pastCustomers || [];
    } else {
      return state.allCustomers || [];
    }
  };

  useEffect(() => {
    fetchAllCustomers();
    fetchCurrentCustomers();
    fetchPastCustomers();
  }, []);


  console.log(state)
  const customersToDisplay = filterCustomers();

  return (
    <div className="flex w-screen overflow-x-hidden">
      <CTSidebar />
      <div className="w-4/5 p-4 ml-auto h-screen">
        <h1 className="text-4xl font-semibold text-[#8883f0] mt-3">
          Customers
        </h1>
        <div className="w-full flex mt-8 rounded-4 shadowboxer overflow-hidden h-[90%]">
          <div className="w-[25%] bg-slate-50 p-2">
            <div
              id="medbackground"
              className="hover:bg-slate-200 h-30 p-3 flex items-center cursor-pointer border-0 rounded-2 mb-2"
              onClick={() => setView("all")}
            >
              <h1 className="text-[#424242] text-xl font-[500]">
                All Customers
              </h1>
            </div>
            <div
              id="medbackground"
              className="hover:bg-slate-200 h-30 p-3 flex items-center cursor-pointer border-0 rounded-2 mb-2"
              onClick={() => setView("current")}
            >
              <h1 className="text-[#424242] text-xl font-[500]">
                Current Customers
              </h1>
            </div>
            <div
              id="medbackground"
              className="hover:bg-slate-200 h-30 p-3 flex items-center cursor-pointer border-0 rounded-2 mb-2"
              onClick={() => setView("past")}
            >
              <h1 className="text-[#424242] text-xl font-[500]">
                Past Customers
              </h1>
            </div>
          </div>
          <div className="w-[75%] overflow-y-scroll">
            <div className="pb-4">
              <div className="grid grid-cols-3 w-full justify-between items-center pt-4 px-4 mb-4">
                <h1 className="font-semibold text-2xl">Name</h1>
                <h1 className="font-semibold ml-12 w-[200px] text-center text-2xl">
                  Location
                </h1>
                <h1 className="font-semibold ml-12 w-[200px] text-center text-2xl">
                  Date
                </h1>
              </div>
              {Array.isArray(customersToDisplay) && customersToDisplay.length > 0 ? (
                customersToDisplay.map((val, key) => (
                  <div
                    key={val.id || key} // Ensure unique keys
                    className="grid grid-cols-3 w-full justify-between items-center pt-4 px-4 mb-4"
                  >
                    <h1 className="text-xl">{val.userId.firstName}</h1>
                    <h1 className="ml-12 w-[200px] text-center text-xl">
                      {val.userId.location}
                    </h1>
                    <h1 className="ml-12 w-[200px] text-center text-xl">
                      {val.dateTime}
                    </h1>
                  </div>
                ))
              ) : (
                <div className="text-center w-full mt-4">No customers to display</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTCustomers;
