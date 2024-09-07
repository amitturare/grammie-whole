import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "../components/ImageUploader";
import careTakerService from "../services/CareTaker.service";
import { useNavigate } from "react-router-dom";

const { registerCareTaker } = careTakerService;

const CTRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("Image uploaded: ", file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // onSubmit form
  async function handleCitizenRegister(data) {
    const formData = new FormData();
    formData.append("location", data.location);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("workExperience", data.workExperience);
    formData.append("ratePerMonth", data.ratePerMonth);
    formData.append(
      "servicesOffered",
      data.servicesOffered.split(",").map((service) => service.trim())
    );
    if (selectedImage) {
      formData.append("aadharCardImageUrl", selectedImage);
    }

    console.log("on Register submit", formData);
    const response = await registerCareTaker(formData);
    console.log({...formData});
  console.log(response);
    if (response.ok) {
      navigate(`/caretaker/ctdashboard`);
    }
  }

  return (
    <div className="w-screeen p-8">
      <div className="w-full h-full border-2 border-[#95989d] rounded-[24px] p-8 flex flex-col items-center shadowboxer bg-slate-50">
        <h1 className="text-5xl text-center text-[#8883f0] font-semibold">
          Join Old Citizens: Embrace a community that cares!
        </h1>
        <hr className="w-[95%] border-2 mt-4"></hr>
        <form
          className="w-full mt-4 flex flex-col"
          onSubmit={handleSubmit(handleCitizenRegister)}
        >
          <div className="flex flex-col w-1/2 mx-auto bg-slate-100 rounded-lg p-4">
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Location</label>
              <input
                placeholder="Location"
                {...register("location", { required: "Location is required" })}
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
              ></input>
              {errors.location && (
                <span className="text-red-500">{errors.location.message}</span>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Mobile Number</label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number",
                  },
                })}
                placeholder="+91"
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
              ></input>
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Age</label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Minimum age is 18" },
                  max: { value: 50, message: "Maximum age is 50" },
                })}
                placeholder="(18-50 years)"
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
              ></input>
              {errors.age && (
                <span className="text-red-500">{errors.age.message}</span>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Gender</label>
              <select
                className="w-full p-1 px-2 bg-transparent rounded-2 border-1 border-[#dae3f0] text-xl text-[#95989d]"
                {...register("gender", { required: "Gender is required" })}
                id="gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Aadhar Card Image</label>
              <ImageUploader
                selectedImage={selectedImage}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
              />
            </div>
            <div className="my-3 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Work Experience</label>
              <input
                type="number"
                placeholder="in years"
                {...register("workExperience", {
                  required: "Experience is required",
                })}
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
              ></input>
              {errors.workExperience && (
                <span className="text-red-500">
                  {errors.workExperience.message}
                </span>
              )}
            </div>
            <div className="my-3 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Cost</label>
              <input
                type="number"
                placeholder="in rupees per month"
                {...register("ratePerMonth", {
                  required: "ratePerMonth is required",
                })}
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
              ></input>
              {errors.ratePerMonth && (
                <span className="text-red-500">
                  {errors.ratePerMonth.message}
                </span>
              )}
            </div>
            <div className="my-3 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Services Provided</label>
              <input
                placeholder="comma separated"
                {...register("servicesOffered", {
                  required: "Services provided is required",
                })}
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
              ></input>
              {errors.servicesOffered && (
                <span className="text-red-500">
                  {errors.servicesOffered.message}
                </span>
              )}
            </div>
          </div>
          <button
            className="mx-auto mt-8 p-2 px-4 rounded-[30px] border-0 bg-[#8883f0] text-white text-xl font-normal"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CTRegistration;
