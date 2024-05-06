import React, { useState, useEffect, useContext } from "react";
// import Img from "../images/form_img1.jpg";
import { Col, Row } from "antd";
// import GoogleLoginBtn from "../components/GoogleLogin";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PostApi, GetApi } from "../Components/Api";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const SignUp = () => {
  const navigate = useNavigate();
  const [Name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [pPassword, setPPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setSignUp] = useState(true);
  const handleClick = (isBtn) => {
    isBtn ? setIsLogin(!isLogin) : setSignUp(!isSignUp);
  };

  //   const clientId =
  //     "932737388320-ltbl50cuo9hgvag198hpnvdrqtc3a23r.apps.googleusercontent.com";

  //   useEffect(() => {
  //     function start() {
  //       gapi.client.init({
  //         clientId: clientId,
  //         scope: "",
  //       });
  //       gapi.load("client:auth2", start);
  //     }
  //   });

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo
      ? JSON.parse(storedUserInfo)
      : {
          TCUSERNAME: "",
          TCPASSWORD: "",
          TCPHONE: "",
          TCEMAIL: "",
        };
  });

  const handleLogin = () => {
    const userJson = {
      TCUSERNAME: userInfo.TCUSERNAME,
      TCEMAIL: userInfo.TCEMAIL,
      TCPHONE: userInfo.TCPHONE,
      TCPASSWORD: userInfo.TCPASSWORD,
    };

    const userDJson = JSON.stringify(userJson);
    PostApi("createUser/", userDJson).then((val) => {
      if (val.statusCode == 200) {
        setUserInfo(val.dtl);
        navigate("/#");
        window.location.reload();
      }

      console.log("Logging in with:", userInfo);
    });
  };

  useEffect(() => {
    secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  // Function to update user information
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="flex lg:mt-20 2xl:mx-72 mx-8 mt-3 mb-28  justify-center items-center ">
      <div className="grid h-1/3 lg:w-1/3 w-full shadow-lg  bg-white">
        <div className=" w-full p-6">
          <div className="flex justify-center mb-6">
            <div>
              <h1 className="xl:text-4xl text-2xl font-bold text-black">
                Бүртгүүлэх
              </h1>
            </div>
          </div>
          <div className="grid gap-5">
            <input
              type="text"
              placeholder="Хэрэглэгчийн нэр"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 h-14 w-full text-black"
              value={userInfo.TCUSERNAME}
              name="TCUSERNAME"
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Хэрэглэгчийн э-мэйл хаяг"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 h-14 w-full text-black"
              value={userInfo.TCEMAIL}
              name="TCEMAIL"
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Хэрэглэгчийн утасны дугаар"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 h-14 w-full text-black"
              value={userInfo.TCPHONE}
              name="TCPHONE"
              onChange={handleInputChange}
            />
            {/* Password input */}
            <div className="relative text-black">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Нууц үг"
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 h-14 w-full pr-10 text-black"
                value={userInfo.TCPASSWORD}
                name="TCPASSWORD"
                onChange={handleInputChange}
              />
              {/* Toggle password visibility */}
              <button
                className="absolute top-11 right-0 mt-3 mr-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  /* Show eye icon when password is visible */
                  <FaRegEye />
                ) : (
                  /* Show crossed eye icon when password is hidden */
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
            {/* PPassword input */}
            <div className="relative text-black">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Нууц үг давдах"
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 h-14 w-full pr-10 text-black"
                value={pPassword}
                onChange={(e) => setPPassword(e.target.value)}
              />
              {/* Toggle password visibility */}
              <button
                className="absolute top-11 right-0 mt-3 mr-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  /* Show eye icon when password is visible */
                  <FaRegEye />
                ) : (
                  /* Show crossed eye icon when password is hidden */
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white rounded-lg px-4 py-2 w-full h-14 items-center justify-center flex"
          >
            Бүртгүүлэх
          </button>
          {/* Link to sign up */}
          <p className="flex flex-wrap account-rel-text text-black gap-2">
            Don't have an account?{" "}
            <Link to="/SignUp" className="font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
