// components/Navigation.tsx
import React, { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { ColorCode } from '../(constants)/Colors';
import Image from 'next/image';
import { url } from '../(constants)/Urls';
import { Search, Upload } from '@mui/icons-material';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  leftItems?:NavItem[];
  rightItems?:NavItem[];
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const Navigation: React.FC<NavigationProps> = () => {
  const defaultStyle: CSSProperties = {
    display: 'flex',
    justifyContent:"space-between",
    alignItems: 'center',
    gap: '16px',
    padding: '12px 24px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const navItems = [
    { label: '홈', href: '/' },
    { label: '업로드', href: url.UPLOAD },
    // { label: '문의', href: '/contact' },
  ];

  return (
    <nav style={defaultStyle}>
      <Link
        href={"/"}
        style={{
          textDecoration: 'none',
          color: ColorCode.dark,
          fontSize: '1.5rem',
        }}
      >
        <Image
          src="/nuzellogo.png"
          alt="홈"
          width={60}
          height={60}
          style={{ verticalAlign: 'middle', marginRight: '1rem' }}
        />
      </Link>
      <div>
        <Image
          src="/nuzel_font.png"
          alt="누젤냥"
          width={100}
          height={50}
          style={{ verticalAlign: 'middle', marginRight: '1rem' }}
        />
      </div>
      <div>
        <Link href={`${url.UPLOAD}`} className='me-3'>
          <Upload sx={{ width: '40px', height: '40px', cursor: 'pointer' }} />
        </Link>
        <Link href={`${url.SEARCH}`}>
          <Search sx={{ width: '40px', height: '40px', cursor: 'pointer' }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
