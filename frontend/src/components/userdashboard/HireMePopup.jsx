import React, { useRef, useEffect, useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import BasicDatePicker from "../BasicDatePicker";
import cross from "./../media/cross.png";
import { ElderlyContext } from "./UserContext";

const HireMePopup = ({ onClose, careTakerId }) => {
console.log(careTakerId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,control
  } = useForm();
  const popupRef = useRef();
  const { hireCareTaker } = useContext(ElderlyContext);

  function handleDateChange(date) {
    console.log(date,'dateTime');
    setValue("dateTime", date);
  }
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data) => {
    const HireCTData = {
      dateTime: formatDate(data.dateTime),
      description: data.description,
    };
    console.log("Hire me Form data:", HireCTData);
    hireCareTaker(HireCTData, careTakerId);
    onClose();
  };

  return (
    <div className="top-0 left-0 w-screen h-screen fixed flex justify-center items-center bg-gray-50/50">
      <div
        ref={popupRef}
        className="bg-white p-4 border-2 border-[#d3d9dd] rounded-2xl flex flex-col w-[400px]"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-[#8883f0] font-[500] text-3xl">Hire Me</h1>
          <img
            className="h-6 w-6 cursor-pointer"
            src={cross}
            onClick={onClose}
            alt="Close"
          ></img>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl w-1/2">Date</h1>
            <div className="scale-75 ml-auto">
              <Controller
                name="dateTime"
                control={control}
                render={({ field }) => (
                  <BasicDatePicker
                    value={field.value}
                    onChange={(newDate) => {
                      field.onChange(newDate);
                      handleDateChange(newDate);
                    }}
                  />
                )}
              />
            </div>
            {errors.date && (
              <span className="text-red-500">{errors.date.message}</span>
            )}
          </div>

          <div className="flex justify-between items-center mt-1 w-full">
            <h1 className="text-xl w-1/2">Description</h1>
            <input
              className="scale-75 py-2 px-1 border-[0.5px] rounded-[3px] border-[#c4c4c4] w-[200px] hover:border-black"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="w-1/2 ml-auto flex justify-end mt-2">
            <button
              type="submit"
              className="ml-auto bg-[#8883f0] p-2 px-3 rounded-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HireMePopup;
