import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import star from "./../media/star.png";
import HireMePopup from "./HireMePopup";
import { ElderlyContext } from "./UserContext";

const HireCT = () => {
  const { state, getAllCareTakerData } = useContext(ElderlyContext);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);

  useEffect(() => {
    getAllCareTakerData();
  }, []);

  useEffect(() => {
    if (state.data.length > 0) {
      setSelectedCaretaker(state.data[0]);
    }
  }, [state.data]);

  const handleCaretakerClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-screen flex">
      <Sidebar />
      <div className="w-4/5 p-4 ml-auto h-screen">
        <h1 className="text-4xl font-semibold text-[#8883f0] mt-3">
          Hire Caretaker
        </h1>

        <div className="h-[90%] rounded-[24px] p-2 mt-4 shadowboxer flex">
          {/* data showing all caretakers  */}
          <div className="w-[30%] bg-gray-300 rounded-4 overflow-scroll overflow-x-hidden">
            {state.data.map((val, key) => (
              <div
                key={key}
                id="ctbackground"
                className="hover:bg-slate-200 h-30 m-2 p-3 flex items-center rounded-4 cursor-pointer"
                onClick={() => handleCaretakerClick(val)}
              >
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={val.pictureUrl}
                  alt={val.firstName}
                />
                <h1 className="text-[#424242] text-xl font-[500]">
                  {val.firstName} {val.lastName}
                </h1>
              </div>
            ))}
          </div>
          {selectedCaretaker && (
            <div className="p-4 w-[70%] overflow-scroll">
              <div className="p-4 pl-2 rounded flex items-start">
                <img
                  className="h-20 w-20 rounded-full mr-8"
                  src={selectedCaretaker.pictureUrl}
                  alt={selectedCaretaker.firstName}
                />
                <div>
                  <h3 className="text-2xl font-semibold text-[#8883f0]">
                    {selectedCaretaker.firstName}
                  </h3>
                  <p>Age: {selectedCaretaker.age} years</p>
                  <p>Location: {selectedCaretaker.location}</p>
                  <p>Price: {selectedCaretaker.price}</p>
                </div>
                <div className="flex flex-col gap-4 mr-4 ml-auto">
                  <button
                    onClick={handleOpenPopup}
                    className="bg-blue-500 text-white p-2 px-4 rounded"
                  >
                    Hire Me
                  </button>
                  {isPopupVisible && (
                    <HireMePopup
                      onClose={handleClosePopup}
                      careTakerId={selectedCaretaker._id}
                    />
                  )}
                  <button className="bg-green-500 text-white p-2 px-4 rounded">
                  <a href={`tel:${selectedCaretaker.phoneNumber}`}> Call Me</a>
                  </button>
                </div>
              </div>
              <div className="mt-8 px-2 w-full flex flex-col">
                <div className="flex items-center my-2">
                  <h1 className="text-xl w-2/5">Rates per Month (in Rs)</h1>
                  <p className="text-xl">{selectedCaretaker.ratePerMonth}</p>
                </div>
                <div className="flex items-center my-2">
                  <h1 className="text-xl w-2/5">Experience</h1>
                  <p className="text-xl">{selectedCaretaker.workExperience} years</p>
                </div>
                <div className="flex items-center my-2">
                  <h1 className="text-xl w-2/5">Services</h1>
                  <p className="text-xl">{selectedCaretaker.servicesOffered}</p>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-xl font-bold">Reviews</h1>
                <div className="grid grid-cols-2 gap-2 overflow-scroll">
                  {selectedCaretaker.reviews?.map((review, index) => (
                    <div key={index} className="mt-1 p-4 bg-gray-100 rounded">
                      <div className="flex flex-col w-full justify-between">
                        <h3 className="text-lg font-semibold">Anonymous</h3>
                        <div className="flex items-center">
                          <h1 className="text-xl mr-1">{review.feedback}</h1>
                          <img className="w-6 h-6" src={star} alt="star" />
                        </div>
                      </div>
                      <p className="mt-2">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HireCT;
