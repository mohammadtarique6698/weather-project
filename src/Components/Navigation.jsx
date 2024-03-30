import React from "react";

import Header from "./Header.jsx";
import Weather from "./Weather.jsx";
import Footer from "./Footer.jsx";

const Navigation = () => {
  // Check if localStorage item exists and is not null
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const { given_name, family_name } = userData;

  // Concatenate given_name and family_name if available
  const fullName =
    given_name && family_name ? `${given_name} ${family_name}` : "";

  const name = {
    name: fullName,
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
