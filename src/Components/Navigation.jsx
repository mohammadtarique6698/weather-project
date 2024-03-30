import React from "react";

import Header from "./Header.jsx";
import Weather from "./Weather.jsx";
import Footer from "./Footer.jsx";

const Navigation = () => {
  const getData = JSON.parse(localStorage.getItem("userData"));

  const name = {
    name: getData.given_name + " " + getData.family_name,
  };
  return (
    <div>
      <Header name={name} />
      <Weather />
      <Footer />
    </div>
  );
};

export default Navigation;
