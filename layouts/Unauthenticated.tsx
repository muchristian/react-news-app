import React from "react";
import Image from "next/image";

interface props {
  children: JSX.Element;
}

const Unauthenticated: React.FC<props> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background1">
      {children}
    </div>
  );
};

export default Unauthenticated;
