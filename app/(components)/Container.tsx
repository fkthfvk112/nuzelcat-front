import React, { CSSProperties, ReactNode } from 'react';
import { ColorCode } from '../(constants)/Colors';

interface ContainerProps {
  children: ReactNode;                // 자식 요소
  style?: CSSProperties;              // 호출 시 추가 스타일
  className?: string;                 // 호출 시 className 추가 가능
}

const Container: React.FC<ContainerProps> = ({ children, style, className }) => {
  const defaultStyle: CSSProperties = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    padding: '16px',
    margin: '0 auto',
    width:'100%',
    maxWidth: '2450px',
    boxSizing: 'border-box',
    backgroundColor: ColorCode.peach, // 기본 배경색
    borderRadius: '8px',        // 기본 라운드
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // 기본 그림자
    ...style, // 호출 시 전달된 style 적용
  };

  return (
    <div style={defaultStyle} className={className}>
      {children}
    </div>
  );
};

export default Container;