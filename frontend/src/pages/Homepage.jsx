import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { loginUser } from "../services/Login.service";
const withGoogleAuth = (Child) => {
  return () => (
    <GoogleOAuthProvider clientId="560188308617-m5gr5kcoa5s81ch2lfu3ur55r70ttlg1.apps.googleusercontent.com">
      <Child />
    </GoogleOAuthProvider>
  );
};
const Homepage = () => {
  const navigate = useNavigate();

  const handleSuccessfulLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      const response = await loginUser(credentialResponse);
      if (response.role === "user") {
        navigate(`/userdashboard`);
      } else if (!response.role) {
        navigate(`/register`);
      } else if (response.role === "careTaker") {
        navigate(`caretaker/ctdashboard`);
      }
    } catch (e) {
      console.log("Login Failed ");
    }
  };

  const handleFailedLogin = () => {
    console.log("Login Failed, Please try again.");
  };

  return (
    <div className="flex flex-row w-screen h-screen bg-white justify-center googlecontainer">
      <div className="flex flex-col items-start justify-end p-12 bg-[#8883F0] w-1/2 m-12 mr-0 rounded-l-[24px]">
        <h1 className="text-5xl font-semibold text-[#dae3f0]">
          Health at your hand at your fingertips
        </h1>
        <h3 className="mt-4 text-white">
          Health app is a modern way to take charge of your well-being.
        </h3>
      </div>
      <div className="w-2/5 rounded-r-[24px] m-12 ml-0 bg-[#fbfafa] p-8">
        <div className="mt-8 flex items-center">
          <h1 className="text-4xl font-bold text-[#8883f0]">Grammie</h1>
        </div>
        <h1 className="text-5xl mt-12 text-[#928df1]">Welcome back</h1>
        <h3 className="my-2 mx-2 text-lg text-[#95989d]">
          Login to your account or create one using google
        </h3>
        <div className="p-0 mx-2 mt-5">
        <GoogleLogin
  
          onSuccess={handleSuccessfulLogin}
          onError={handleFailedLogin}
          useOneTap
        />
        </div>
      </div>
    </div>
  );
};

export default withGoogleAuth(Homepage);
