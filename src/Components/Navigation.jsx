import React from "react";

import Header from "./Header.jsx";
import Weather from "./Weather.jsx";
import Footer from "./Footer.jsx";

const Navigation = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const { given_name, family_name } = userData;

  const fullName =
    given_name && family_name ? `${given_name} ${family_name}` : "";

  const name = {
    name: fullName,
  };

  console.log(name);

  return (
    <div>
      <Header name={name} />
      <Weather />
      <Footer />
    </div>
  );
};

export default Navigation;
