import { CredentialResponse } from "@react-oauth/google";
import {axiosInstance} from "./axiosInstance.js"

export const loginUser = async (credential) => {
  try {
    const {data} = await axiosInstance.post('/api/auth/google', credential, {
      headers: {
        authorization: `${credential.credential}`
      },
    });

    console.log('Login Response',data.data);
    const token = data.data.token;

    const role = data.data.role
    if (token) {

      localStorage.setItem("token", token);

    }
    return {
      token: token,
      role: role
    };
  } catch (error) {
   throw error;
  }
}