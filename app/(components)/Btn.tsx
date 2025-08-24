import React, { CSSProperties, ButtonHTMLAttributes, useState } from "react";
import { ColorCode } from "../(constants)/Colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  style?: CSSProperties;
  className?: string;
}

export const GreenButton: React.FC<ButtonProps> = ({ children, style, className, ...rest }) => {
  const [hover, setHover] = useState(false);

  const defaultStyle: CSSProperties = {
    backgroundColor: hover ? "#6EE7B7" : ColorCode.green, // hover 시 연하게
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    ...style,
  };

  return (
    <button
      style={defaultStyle}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </button>
  );
};

export const RedPinkButton: React.FC<ButtonProps> = ({ children, style, className, ...rest }) => {
  const [hover, setHover] = useState(false);

  const defaultStyle: CSSProperties = {
    backgroundColor: hover ? "#FCA5A5" : ColorCode.redPink, // hover 시 연하게
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    ...style,
  };

  return (
    <button
      style={defaultStyle}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </button>
  );
};
