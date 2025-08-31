// 'use client' 불필요 (이벤트 핸들러 없음)
import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  colorCode: string;
  href?: string; // 있으면 클릭 가능 + hover 확대
};

export const Badge = ({ text, colorCode, href }: Props) => {
  const clsBase =
    "flex justify-center items-center w-fit px-3 me-2 mt-1 text-white rounded-md font-bold whitespace-nowrap transform transition-transform duration-200";
  const clsClickable = "cursor-pointer hover:scale-105";
  const clsStatic = "cursor-default";

  const span = (
    <span
      style={{ backgroundColor: colorCode }}
      className={`${clsBase} ${href ? clsClickable : clsStatic}`}
    >
      {text}
    </span>
  );

  return href ? <Link href={href}>{span}</Link> : span;
};
export default Badge;
