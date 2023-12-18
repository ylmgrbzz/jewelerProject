import React from "react";
import JewelerMain from "../components/JewelerMain/JewelerMain";

const JewelerPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "30px",
        color: "green",
      }}
    >
      <JewelerMain />
    </div>
  );
};

export default JewelerPage;
