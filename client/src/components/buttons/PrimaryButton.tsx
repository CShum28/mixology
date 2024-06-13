import React from "react";
import { Children } from "react";

interface ButtonProps {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="border-2 w-375px h-10 rounded-full bg-#000 font-bold text-base text-#FFF"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
