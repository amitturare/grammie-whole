import React, { useContext, useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import usericon from "./media/ctpfp.png";
import { ElderlyContext } from "./userdashboard/UserContext";

const Sidebar = () => {
  const { state, getProfileData } = useContext(ElderlyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileData().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-1/5 h-screen bg-[#8883f0] flex flex-col items-center fixed">
      <h1 className="my-8 text-5xl font-semibold text-white">Grammie</h1>
      {SidebarData.map((val, key) => {
        return (
          <div
            className="w-full h-16 flex hover:bg-[#6c65eb] duration-100 flex items-center"
            id={window.location.pathname == val.link ? "sidebaractive" : ""}
            key={key}
            onClick={() => {
              window.location.pathname = val.link;
            }}
          >
            <div className="mx-4 text-xl font-[400] text-[#ebebeb]">
              {val.title}
            </div>
          </div>
        );
      })}
      <div className="mb-4 mx-2 mr-auto mt-auto flex items-center">
        <Link to="/userdashboard/userprofile">
          <div className="rounded-full h-24 w-24 mx-1">
            <img
              className="h-20 w-20 rounded-full"
              src={state.profileData.user.pictureUrl}
            ></img>
          </div>
        </Link>
        <div className="flex flex-col h-24">
          <Link to="/userdashboard/userprofile">
            <h3 className="my-2 text-xl">{state.profileData.user.firstName}</h3>
          </Link>
          <Link to="/">
            <h3 className="p-2 px-4 bg-[#ebebeb] text-[#8883f0] rounded-2">
              Logout
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
