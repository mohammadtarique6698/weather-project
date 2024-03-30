import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import Navigation from "./Components/Navigation";

const CLIENT_ID =
  "72763305888-92mmqjcjv6biv2eghabkq9qat0jhlvlc.apps.googleusercontent.com";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        window.location.href = "/weather";
      }, 100);
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (credentialResponse) => {
    setIsAuthenticated(true);
    //console.log(credentialResponse);
    const decoded = jwtDecode(credentialResponse.credential);
    setData(decoded);
  };
  localStorage.setItem("userData", JSON.stringify(data)); // Save user data to localStorage

  const handleLoginError = () => {
    enqueueSnackbar("Login failed", { variant: "error" });
  };

  return (
    <>
      <SnackbarProvider>
        <div className="w-screen h-screen">
          {/* Left side */}
          {!isAuthenticated && (
            <div className="md:grid grid-cols-12 h-screen sm:flex sm:flex-col justify-center items-center">
              <div className="col-span-4 h-full flex items-center justify-center bg-gradient-to-b from-purple-400 to-purple-500 text-black flex-col">
                <div className="w-auto h-auto p-4 text-left">
                  <h1 className="text-6xl font-semibold mb-4">Welcome</h1>
                  <h3 className="mb-2 text-6xl">Back !!</h3>
                  <h3 className="mb-5">
                    Your one-stop destination for real-time weather updates and
                    forecasts. Experience seamless navigation and beautiful
                    visuals. Check it out now
                  </h3>
                  <span>
                    <FaArrowRightLong />
                  </span>
                </div>
              </div>

              {/* Right side */}
              <div className="col-span-8 h-full flex items-center justify-center">
                <img
                  src="https://img.freepik.com/premium-photo/tsunami-big-wave-generative-ai_85622-633.jpg"
                  alt="bg-image"
                  className="w-screen h-screen object-cover relative opacity-50"
                />
                <div className="absolute z-10 border border-black/50 shadow-xl p-4 rounded-lg bg-transparent text-left">
                  <FaGoogle className="text-5xl mb-6 cursor-pointer" />
                  <h1 className="text-3xl font-bold mb-6 text-left">Sign in</h1>
                  <h3 className="text-left text-xl font-semibold mb-6">
                    Sign in with Google
                  </h3>
                  <GoogleOAuthProvider clientId={CLIENT_ID}>
                    {/* Wrap GoogleLogin with Link */}
                    <Link to="/weather">
                      <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                        useOneTap={true}
                        theme={{
                          background: "#fafafa",
                          color: "black",
                          borderRadius: "10px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </Link>
                  </GoogleOAuthProvider>
                  <div className="flex flex-row justify-start items-center gap-5 mt-6">
                    <h2 className="text-md font-semibold">Follow us On </h2>
                    <FaFacebook className="text-2xl" />
                    <RiInstagramFill className="text-2xl" />
                    <FaSquareXTwitter className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SnackbarProvider>
    </>
  );
};

export default App;
