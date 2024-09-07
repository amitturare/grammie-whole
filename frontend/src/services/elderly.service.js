// get user data

import { axiosInstance } from "./axiosInstance";

export async function registerElderly(data) {
  try {
    const response = await axiosInstance.patch(
      `/api/user/elderly/register`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response from register Elderly", response);

    return response.data.data;
  } catch (error) {
    console.error("Error registering Elderly:", error);
    throw error;
  }
}

//to get elderly dashboard data
export async function getElderlyProfileData() {
  try {
    const response = await axiosInstance.get("/api/user/elderly/dashboard");
    console.log("data from elderly", response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
}

//to get all caretaker data for user
export default async function getAllCareTaker() {
  try {
    const response = await axiosInstance.get(`/api/user/careTaker`);
    console.log("get careTaker Data ", response);
    return response.data.data;
  } catch (error) {
    console.error("Error registering caretaker:", error);
    throw error;
  }
}

export async function HireCT(data, ctId) {
  try {
    console.log(data,ctId);
    const response = await axiosInstance.post(`/api/appointment/${ctId}`, data);
    console.log("Hire CT  ", response);
    return response.data.data;
  } catch (error) {
    console.error("Error registering caretaker:", error);
    throw error;
  }
}

export async function postAnEvent(data) {
  try {
    const response = await axiosInstance.post(`/api/event`, data);
    console.log("post event response  ", response);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllappointments() {
  try {
    const response = await axiosInstance.get(`/api/appointment/user/curr`);
    console.log("get all appointments  ", response);
    return response.data.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
