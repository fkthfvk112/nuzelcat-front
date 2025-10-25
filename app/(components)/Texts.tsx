import React, { CSSProperties, ReactNode } from 'react';
import { ColorCode } from '../(constants)/Colors';

interface TextProp{
  text: string;                // 자식 요소
  style?: CSSProperties;              // 호출 시 추가 스타일
  className?: string;                 // 호출 시 className 추가 가능
}


export const LightDartText: React.FC<TextProp> = ({ text, style, className }) => {
  const defaultStyle: CSSProperties = {
    color:ColorCode.lightDark,
    ...style,
  };

  return (
    <div style={defaultStyle} className={className}>
      {text}
    </div>
  );
};


export const DarkText: React.FC<TextProp> = ({ text, style, className }) => {
  const defaultStyle: CSSProperties = {
    color:ColorCode.dark,
    ...style,
  };

  return (
    <div style={defaultStyle} className={className}>
      {text}
    </div>
  );
};

export const MediumDarkText: React.FC<TextProp> = ({ text, style, className }) => {
  const defaultStyle: CSSProperties = {
    color:ColorCode.mediumDark,
    ...style,
  };

  return (
    <div style={defaultStyle} className={className}>
      {text}
    </div>
  );
};

export const RedPinkText: React.FC<TextProp> = ({ text, style, className }) => {
  const defaultStyle: CSSProperties = {
    color:ColorCode.redPink,
    ...style,
  };

  return (
    <div style={defaultStyle} className={className}>
      {text}
    </div>
  );
};

export const LightRedText: React.FC<TextProp> = ({ text, style, className }) => {
  const defaultStyle: CSSProperties = {
    color:ColorCode.lightRed,
    ...style,
  };

  return (
    <div style={defaultStyle} className={className}>
      {text}
    </div>
  );
};
