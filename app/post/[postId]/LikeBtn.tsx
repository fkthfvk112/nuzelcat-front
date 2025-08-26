"use client";

import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ColorCode } from "@/app/(constants)/Colors";
import { MediumDarkText } from "@/app/(components)/Texts";
import { requestPostLike } from "@/app/(api)/(post)/post_client";

interface LikeButtonProps {
  postId: number;
  initialLikeCnt: number;
}

export default function LikeButton({ postId, initialLikeCnt }: LikeButtonProps) {
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const updatedCnt = await requestPostLike(postId);
      setLikeCnt(updatedCnt);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center"
      disabled={loading}
    >
      <FavoriteIcon
        className="w-4 h-4 cursor-pointer"
        sx={{ color: ColorCode.lightRed }}
      />
      <MediumDarkText className="ms-1" text={String(likeCnt)} />
    </button>
  );
}
