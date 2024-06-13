import React from "react";
import NavigationBar from "@/components/navigationBar/NavigationBar ";

const Profile = () => {
  return (
    <div className="h-dvh">
      <p>Welcome home!</p>
      <div className="absolute bottom-0 w-dvw">
        <NavigationBar />
      </div>
    </div>
  );
};

export default Profile;
