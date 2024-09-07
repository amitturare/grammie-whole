import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ImageUploader from "../components/ImageUploader";
import { updateElderlyUserRegistration } from "../services/user.service";
import plusphoto from "../components/media/plus.png";
import pluswhitephoto from "../components/media/plus-hover.png";
import { registerElderly } from "../services/elderly.service";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      phoneNumber: "",
      age: "",
      gender: "",
      medicalHistory: [{ condition: "", diagnosisDate: "", treatments: "" }],
      medications: [{ name: "", dosage: "", frequency: "" }],
    },
  });

  const {
    fields: medicalHistoryFields,
    append: appendMedicalHistory,
    remove: removeMedicalHistory,
  } = useFieldArray({
    control,
    name: "medicalHistory",
  });

  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control,
    name: "medications",
  });

  const [selectedImage, setSelectedImage] = useState(null);

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

  const onSubmit = (data) => {
    const userRegisterData = new FormData();

    // Append form data to FormData instance
    userRegisterData.append("location", data.location);
    userRegisterData.append("phoneNumber", data.phoneNumber);
    userRegisterData.append("age", data.age);
    userRegisterData.append("gender", data.gender);

    data.medicalHistory.forEach((item, index) => {
      userRegisterData.append(
        `medicalHistory[${index}][condition]`,
        item.condition
      );
      userRegisterData.append(
        `medicalHistory[${index}][diagnosisDate]`,
        item.diagnosisDate
      );
      item.treatments.split(",").forEach((treatments, tIndex) => {
        userRegisterData.append(
          `medicalHistory[${index}][treatments][${tIndex}]`,
          treatments.trim()
        );
      });
    });

    data.medications.forEach((item, index) => {
      userRegisterData.append(`medications[${index}][name]`, item.name);
      userRegisterData.append(`medications[${index}][dosage]`, item.dosage);
      userRegisterData.append(
        `medications[${index}][frequency]`,
        item.frequency
      );
    });

    if (selectedImage) {
      userRegisterData.append("aadharCardImageUrl", selectedImage);
    }

    console.log(...userRegisterData); // For debugging purposes
    const response = registerElderly(userRegisterData);
    if (response) {
      navigate("/userdashboard");
    }
  };

  return (
    <div className="w-screen p-8">
      <div className="w-full h-full border-2 border-[#95989d] rounded-[24px] p-8 flex flex-col items-center shadowboxer bg-slate-50">
        <h1 className="text-5xl text-center text-[#8883f0] font-semibold">
          Join Old Citizens: Embrace a community that cares!
        </h1>
        <hr className="w-[95%] border-2 mt-4"></hr>
        <form
          className="w-full mt-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-1/2 mx-auto bg-slate-100 rounded-lg p-4">
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Location</label>
              <input
                placeholder="Location"
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Mobile Number</label>
              <input
                type="tel"
                placeholder="+91"
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                {...register("phoneNumber", {
                  required: "Mobile number is required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Age</label>
              <input
                type="number"
                placeholder="(18-50 years)"
                className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Minimum age is 18" },
                  max: { value: 50, message: "Maximum age is 50" },
                })}
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Gender</label>
              <select
                className="w-full p-1 px-2 bg-transparent rounded-2 border-1 border-[#dae3f0] text-xl text-[#95989d]"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="my-2 w-full grid grid-cols-2 items-center">
              <label className="text-xl">Aadhar Card Image</label>
              <Controller
                name="aadharCardImage"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    {...field}
                    selectedImage={selectedImage}
                    handleImageChange={handleImageChange}
                    handleRemoveImage={handleRemoveImage}
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full bg-slate-50 mt-8 flex justify-around">
            <div className="w-2/5 px-8">
              <div className="flex justify-between">
                <h1 className="text-2xl text-[#8883f0]">Medical History</h1>
                <div
                  className="relative h-8 w-8 rounded-full flex"
                  onClick={() =>
                    appendMedicalHistory({
                      condition: "",
                      diagnosisDate: "",
                      treatments: "",
                    })
                  }
                >
                  <img
                    className="h-full absolute hover:opacity-0 duration-100"
                    src={pluswhitephoto}
                  />
                  <img
                    className="h-full absolute hover:opacity-0 duration-100"
                    src={plusphoto}
                  />
                </div>
              </div>
              <hr className="w-full border-2 mt-4 relative -top-4"></hr>
              {medicalHistoryFields.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex flex-col m-0 mt-2 bg-slate-100 p-4 py-3 rounded-lg w-full"
                >
                  <div className="my-2 w-full grid grid-cols-2 items-center">
                    <label className="text-xl">Condition</label>
                    <input
                      className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                      {...register(`medicalHistory.${idx}.condition`, {
                        required: "Condition is required",
                      })}
                    />
                    {errors?.medicalHistory?.[idx]?.condition && (
                      <p className="text-red-500">
                        {errors?.medicalHistory?.[idx]?.condition?.message}
                      </p>
                    )}
                  </div>
                  <div className="my-2 w-full grid grid-cols-2 items-center">
                    <label className="text-xl">Diagnosis Date</label>
                    <input
                      type="date"
                      className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                      {...register(`medicalHistory.${idx}.diagnosisDate`, {
                        required: "Diagnosis date is required",
                      })}
                    />
                    {errors?.medicalHistory?.[idx]?.diagnosisDate && (
                      <p className="text-red-500">
                        {errors?.medicalHistory?.[idx]?.diagnosisDate?.message}
                      </p>
                    )}
                  </div>
                  <div className="my-2 w-full grid grid-cols-2 items-center">
                    <label className="text-xl">treatments</label>
                    <input
                      className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                      {...register(`medicalHistory.${idx}.treatments`, {
                        required: "treatments is required",
                      })}
                    />
                    {errors?.medicalHistory?.[idx]?.treatments && (
                      <p className="text-red-500">
                        {errors?.medicalHistory?.[idx]?.treatments?.message}
                      </p>
                    )}
                  </div>
                  <div
                    className="text-[#8883f0] ml-auto removeunderline"
                    onClick={() => removeMedicalHistory(idx)}
                  >
                    Remove
                  </div>
                </div>
              ))}
            </div>
            <div className="w-2/5 px-8">
              <div className="flex justify-between">
                <h1 className="text-2xl text-[#8883f0]">Medication</h1>
                <div
                  className="relative h-8 w-8 rounded-full flex"
                  onClick={() =>
                    appendMedication({ name: "", dosage: "", frequency: "" })
                  }
                >
                  <img
                    className="h-full absolute hover:opacity-0 duration-100"
                    src={pluswhitephoto}
                  />
                  <img
                    className="h-full absolute hover:opacity-0 duration-100"
                    src={plusphoto}
                  />
                </div>
              </div>
              <hr className="w-full border-2 mt-4 relative -top-4"></hr>
              {medicationFields.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex flex-col m-0 mt-2 bg-slate-100 p-4 py-3 rounded-lg w-full"
                >
                  <div className="my-2 w-full grid grid-cols-2 items-center">
                    <label className="text-xl">Name</label>
                    <input
                      className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                      {...register(`medications.${idx}.name`, {
                        required: "Name is required",
                      })}
                    />
                    {errors?.medications?.[idx]?.name && (
                      <p className="text-red-500">
                        {errors?.medications?.[idx]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="my-2 w-full grid grid-cols-2 items-center">
                    <label className="text-xl">Dosage</label>
                    <input
                      type="text"
                      className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                      {...register(`medication.${idx}.dosage`, {
                        required: "Dosage is required",
                      })}
                    />
                    {errors?.medications?.[idx]?.dosage && (
                      <p className="text-red-500">
                        {errors?.medications?.[idx]?.dosage?.message}
                      </p>
                    )}
                  </div>
                  <div className="my-2 w-full grid grid-cols-2 items-center">
                    <label className="text-xl">Frequency</label>
                    <input
                      type="text"
                      className="rounded-2 border-1 border-[#dae3f0] p-1 px-2 bg-transparent"
                      {...register(`medications.${idx}.frequency`, {
                        required: "Frequency is required",
                        validate: (value) =>
                          parseInt(value) <= 3 ||
                          "Frequency must be less than or equal to 3",
                      })}
                    />
                    {errors?.medications?.[idx]?.frequency && (
                      <p className="text-red-500">
                        {errors?.medications?.[idx]?.frequency?.message}
                      </p>
                    )}
                  </div>
                  <div
                    className="text-[#8883f0] ml-auto removeunderline"
                    onClick={() => removeMedication(idx)}
                  >
                    Remove
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="m-8 ml-auto p-2 px-4 rounded-[30px] border-0 bg-[#8883f0] text-white font-normal">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
