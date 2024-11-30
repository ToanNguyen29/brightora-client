import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  mode: string;
}

const Logo: React.FC<LogoProps> = ({ mode }) => {
  return (
    <Link to="/">
      <img
        src={`/bt_logo2.png`}
        alt="Logo"
        style={{
          width: 150,
          height: "80%",
          color: mode === "dark" ? "black" : "white",
          marginBottom: "6px",
          cursor: "pointer",
        }}
      />
    </Link>
  );
};

export default Logo;
