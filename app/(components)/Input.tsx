import React, { CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ColorCode } from "../(constants)/Colors";
import { DarkText } from "./Texts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?:string;
  style?: CSSProperties;
  className?: string;
}

export const CommonInput: React.FC<InputProps> = ({ title, style, className, ...rest }) => {
  const defaultStyle: CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    color:ColorCode.textDark,
    ...style,
  };

  return <div className="w-full">
          {title&&<DarkText className="ms-1" text={title}/>}
          <input style={defaultStyle} className={className} {...rest} />
        </div>
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?:string;
  style?: CSSProperties;
  className?: string;
}

export const CommonTextArea: React.FC<TextAreaProps> = ({ title, style, className, ...rest }) => {
  const defaultStyle: CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    minHeight: "50px", // 기본 높이
    resize: "none",
    color:ColorCode.textDark,
    ...style,
  };

  return <div className="w-full">
          {title&&<DarkText className="ms-1" text={title}/>}
          <textarea style={defaultStyle} className={className} {...rest} />
        </div>;
};