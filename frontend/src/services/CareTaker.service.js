import { axiosInstance } from "./axiosInstance";

const careTakerService = {
  registerCareTaker: async (data) => {
    console.log("data sent while registering", data);
    try {
      const response = await axiosInstance.patch(
        `/api/user/careTaker/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from CT", response);
    } catch (error) {
      console.error("Error registering caretaker:", error);
      throw error;
    }
  },

  getCareTakerDashboardData: async () => {
    try {
      const response = await axiosInstance.get(`/api/user/careTaker/dashboard`);
      console.log("get careTaker dashboard Data", response);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching caretaker dashboard data:", error);
      throw error;
    }
  },

  getAllCustomers: async () => {
    try {
      const response = await axiosInstance.get('/api/appointment/careTaker/curr');
      console.log('all customers',response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all customers:', error);
      throw error;
    }
  },

  getCurrentCustomers: async () => {
    try {
      const response = await axiosInstance.get('/api/appointment/careTaker/curr?status=accepted');
      console.log('current customers',response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching current customers:', error);
      throw error;
    }
  },

  getPastCustomers: async () => {
    try {
      const response = await axiosInstance.get('/api/appointment/careTaker/terminated');
      console.log('past customers',response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching past customers:', error);
      throw error;
    }
  },

  getAllPendingRequests: async () => {
    try {
      const response = await axiosInstance.get('/api/appointment/careTaker/curr?status=pending')
      console.log('response from pending requests ',response)
      return response.data.data;
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      throw error;
    }
  },

  updateStatusForCustomers: async (appointmentId, status) => {
    try {
      console.log(appointmentId,status)
      const response = await axiosInstance.patch(`/api/appointment/updateStatus/${appointmentId}`, { "status":status });
      return response.data.data;
    } catch (error) {
      console.error('Error updating customer status:', error);
      throw error;
    }
  }
};

export default careTakerService;
