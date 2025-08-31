"use client"

import Link from "next/link";
import Image from "next/image";
import React, { CSSProperties } from "react";
import { ColorCode } from "../(constants)/Colors";

type FooterLink = { label: string; href: string; external?: boolean };

interface FooterProps {
  style?: CSSProperties;
  className?: string;
  links?: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({
  style,
  className,
  links = [
    { label: "업로드", href: "/upload" },

  ],
}) => {
  const wrapStyle: CSSProperties = {
    width: "100%",
    background: ColorCode.lightGray, // 부드러운 아이보리/피치 톤 (페이지 섹션 배경과 통일감)
    borderTop: "1px solid rgba(0,0,0,0.06)",
    marginTop: 24,
    ...style,
  };

  const containerStyle: CSSProperties = {
    maxWidth: 1024,
    margin: "0 auto",
    padding: "20px 16px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12,
  };

  const topRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const brandTextStyle: CSSProperties = {
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "-0.2px",
  };

  const linkRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    opacity: 0.9,
  };

  const linkStyle: CSSProperties = {
    textDecoration: "none",
    color: "#333",
    fontSize: "0.9rem",
  };

  const descStyle: CSSProperties = {
    fontSize: "0.85rem",
    color: "#666",
    lineHeight: 1.5,
  };

  const bottomRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px dashed rgba(0,0,0,0.08)",
    paddingTop: 12,
    marginTop: 6,
    fontSize: "0.8rem",
    color: "#777",
  };

  return (
    <footer style={wrapStyle} className={className}>
      <div style={containerStyle}>
        {/* 브랜드/로고 */}
        <div style={topRowStyle}>
          <Image
            src="/nuzelicon.ico" // 이미 쓰는 홈 아이콘과 톤을 맞춤
            alt="누젤냥"
            width={24}
            height={24}
            style={{ borderRadius: 6 }}
          />
          <span style={brandTextStyle}>누젤냥</span>
        </div>

        {/* 링크 */}
        <nav style={linkRowStyle} aria-label="푸터 내비게이션">
          {links.map((l, i) =>
            l.external ? (
              <a key={i} href={l.href} target="_blank" rel="noreferrer" style={linkStyle}>
                {l.label}
              </a>
            ) : (
              <Link key={i} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* 설명/슬로건 */}
        <p style={descStyle}>
          누가누가 제일 귀여운 고양이인가? 간단히 고양이 사진을 업로드하고 자랑해요.<br />
        </p>

        {/* 하단 바 */}
        <div style={bottomRowStyle}>
          <span>© {new Date().getFullYear()} NUZELNYANG. All rights reserved.</span>
          <a
            href="#top"
            style={{ textDecoration: "none", color: "#555" }}
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ↑ 맨 위로
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
