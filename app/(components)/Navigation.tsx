// components/Navigation.tsx
import React, { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { ColorCode } from '../(constants)/Colors';
import Image from 'next/image';
import { url } from '../(constants)/Urls';
import { Search } from '@mui/icons-material';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
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
        <Link
          key={index}
          href={item.href}
          style={{
            textDecoration: 'none',
            color: ColorCode.dark,
            fontSize: '1.5rem',
          }}
        >
          {item.label === '홈' ? (
            <Image
              src="/nuzellogo.png"
              alt="홈"
              width={60}
              height={60}
              style={{ verticalAlign: 'middle', marginRight: '1rem' }}
            />
          ) : (
            item.label
          )}
        </Link>
      ))}
      {children}

      {/* 오른쪽 정렬을 위해 marginLeft: auto */}
      <div style={{ marginLeft: 'auto' }}>
        <Link href={`${url.SEARCH}`}>
          <Search sx={{ width: '40px', height: '40px', cursor: 'pointer' }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
