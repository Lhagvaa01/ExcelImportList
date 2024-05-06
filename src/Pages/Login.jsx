import React, { useState, useEffect, useContext } from "react";
// import Img from "../images/form_img1.jpg";
import { Col, Row } from "antd";
// import GoogleLoginBtn from "../components/GoogleLogin";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PostApi, GetApi } from "../Components/Api";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = () => {
    const userJson = {
      TCEMAIL: email,
      TCPASSWORD: password,
    };

    const userDJson = JSON.stringify(userJson);
    PostApi("loginUser/", userDJson).then((val) => {
      if (val.statusCode == 200) {
        setUserInfo(val.body);
        console.log(val.body);
        secureLocalStorage.setItem("userInfo", JSON.stringify(val.body));
        navigate("/#");
        window.location.reload();
      }

      console.log("Logging in with:", userInfo);
    });
  };

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  useEffect(() => {
    secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  // Function to update user information
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  return (
    <div className="flex lg:mt-20 2xl:mx-72 mx-8 mt-3 mb-28  justify-center items-center ">
      <div className="grid grid-cols-1 h-1/3 lg:w-1/3 w-full shadow-lg  bg-white">
        <div className="w-full p-6">
          <div className="flex justify-center mb-6">
            <div>
              <h1 className="xl:text-4xl text-2xl font-bold text-black">
                Нэвтрэх
              </h1>
            </div>
          </div>
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 h-14 w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password input */}
          <div className=" text-black">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 text-black rounded-lg px-4 py-2 mb-4 w-full h-14 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {/* Sign in button */}
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white rounded-lg px-4 py-2 w-full h-14 items-center justify-center flex"
          >
            Sign In
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

export default LoginPage;
