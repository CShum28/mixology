"use client";

import React from "react";
import NavigationButton from "../buttons/NavigationButton";

const NavigationBar = () => {
  const navigationList = [
    { label: "Your mixes", url: "/mixes" },
    { label: "Discover", url: "/discover" },
    { label: "Coins", url: "/coins" },
    { label: "Library", url: "/library" },
  ];

  const navToPage = (url: string) => {
    console.log("Nav to: ", url);
  };

  return (
    <div className="flex flex-row justify-between px-6 py-3 bg-#E4E4E4">
      {navigationList.map((navigate, index) => (
        <div key={index}>
          <NavigationButton onClick={() => navToPage(navigate.url)}>
            {navigate.label}
          </NavigationButton>
        </div>
      ))}
    </div>
  );
};

export default NavigationBar;
