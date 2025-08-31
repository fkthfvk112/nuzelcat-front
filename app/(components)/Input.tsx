import React, { CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ColorCode } from "../(constants)/Colors";
import { DarkText } from "./Texts";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Require from "./Require";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?:string;
  style?: CSSProperties;
  className?: string;
  info?:string;
  required?:boolean;
}

export const CommonInput: React.FC<InputProps> = ({ title, style, className, info, required, ...rest }) => {
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
          <div className="flex">
            {title&&<DarkText className="ms-1" text={title}/>}
            {required&&<Require/>}
          </div>
          <input style={defaultStyle} className={className} {...rest} />
            {info && (
              <div className="flex">
                <InfoOutlinedIcon sx={{ fill: "#c1c1c1", marginRight: '0.25rem' }} />
                {<div style={{color:"#c1c1c1"}}>{info}</div>}
              </div>
            )}        
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