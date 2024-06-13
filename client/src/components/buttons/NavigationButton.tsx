import React from "react";

interface NavigationButtonProps {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const NavigationButton = ({ children, onClick }: NavigationButtonProps) => {
  return (
    <div>
      <button onClick={onClick}>
        <span className="h-6 w-6 bg-white inline-block rounded-full"></span>
        <p>{children}</p>
      </button>
    </div>
  );
};

export default NavigationButton;
