// components/Navigation.tsx
import React, { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { ColorCode } from '../(constants)/Colors';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];               // 네비게이션 메뉴
  style?: CSSProperties;          // 추가 스타일
  className?: string;             // 추가 class
  children?: ReactNode;           // 추가 요소
}

const Navigation: React.FC<NavigationProps> = ({ items, style, className, children }) => {
  const defaultStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 24px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ...style,
  };

  return (
    <nav style={defaultStyle} className={className}>
      {items.map((item, index) => (
        <Link key={index} href={item.href} style={{ textDecoration: 'none', color:ColorCode.dark, fontSize:"1.5rem" }}>
          {item.label}
        </Link>
      ))}
      {children}
    </nav>
  );
};

export default Navigation;
