import { axiosInstance } from "./axiosInstance";

export const updateElderlyUserRegistration = async (data) => {
  try {
    const response = await axiosInstance.patch(`/user/elderly/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating elderly user registration:", error);
    throw error;
  }
};
