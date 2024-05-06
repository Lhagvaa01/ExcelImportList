import React, { useRef, useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import { PostApi, GetApi, PutApi } from "../Components/Api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { successToast, errorToast } from "../Constant/ReacrToast";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [locations, setLocations] = useState([]);
  //   useEffect(() => {
  //     GetApi(`get_UserAddress/${userInfo.id}/`).then((val) => {
  //       setUserAddress(val.dtl);
  //     });
  //     GetApi(`get_locations/`).then((val) => {
  //       setLocations(val.dtl);
  //     });
  //   }, [userInfo, isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const saveUserField = () => {
    PutApi(`editUser/${userInfo.id}/`, JSON.stringify(userInfo)).then((val) => {
      secureLocalStorage.setItem("userInfo", JSON.stringify(val.dtl));
      successToast(`Хэрэглэгчийн мэдээлэл амжилттай шинчиллээ`);
      console.log(val.dtl);
    });
  };
  return (
    <div class="flex mt-10 md:mx-44 mx-3 bg-white  text-black">
      <div class="w-full p-4">
        <h2 class="text-2xl font-bold pb-2">Хувийн мэдээлэл</h2>
        <div className="md:grid md:grid-cols-2 w-full pt-8">
          <div className="md:pr-5">
            <div className="mb-4">
              <div className="relative">
                <label className="text-sm font-medium mb-1 block">Нэр</label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="font-semibold w-full h-10 px-4 mr-2"
                    name="TCUSERNAME"
                    value={userInfo.TCUSERNAME}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <div className="relative">
                <label className="text-sm font-medium mb-1 block">
                  Э-Мэйл хаяг
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className=" font-semibold w-full h-10 px-4 mr-2"
                    value={userInfo.TCEMAIL}
                    name="TCEMAIL"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:pr-5">
            <div className="mb-4">
              <div className="relative">
                <label className="text-sm font-medium mb-1 block">
                  Утасны дугаар
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className=" font-semibold w-full h-10 px-4 mr-2"
                    value={userInfo.TCPHONE}
                    name="TCPHONE"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <div className="relative">
                <label className="text-sm font-medium mb-1 block">
                  Нууц үг
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type={showPassword ? "text" : "password"}
                    className=" font-semibold w-full h-10 px-4 mr-2"
                    value={userInfo.TCPASSWORD}
                    name="TCPASSWORD"
                    onChange={handleInputChange}
                  />
                  <button
                    className="mr-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-5 w-full h-12 justify-end items-center">
          <button
            onClick={() => saveUserField()}
            className="bg-green-500 text-white rounded-lg px-4 py-2 w-32  h-8 items-center justify-center flex"
          >
            Хадгалах
          </button>
          {/* <button
            type="button"
            className=" px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={() => saveUserField()}
          >
            Хадгалах
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
