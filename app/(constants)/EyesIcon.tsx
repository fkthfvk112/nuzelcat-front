// EyesIcon.tsx
import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function EyesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 60 40">
      {/* 왼쪽 눈 (세로로 긴 타원) */}
      <ellipse cx="35" cy="20" rx="8" ry="14" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="20" r="5" fill="currentColor" />

      {/* 오른쪽 눈 (세로로 긴 타원) */}
      <ellipse cx="45" cy="20" rx="8" ry="14" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="42" cy="20" r="5" fill="currentColor" />
    </SvgIcon>
  );
}
