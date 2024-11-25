import React from "react";

interface LogoProps {
  mode: string;
}

const Logo: React.FC<LogoProps> = ({ mode }) => {
  return (
    <img
      src={`/bt_logo2.png`}
      alt="Logo"
      style={{
        width: 150,
        height: "80%",
        color: mode === "dark" ? "black" : "white",
        marginBottom: "6px",
      }}
    />
  );
};

export default Logo;
