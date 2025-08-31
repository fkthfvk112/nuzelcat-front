// app/(components)/DeletePostButton.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ColorCode } from "@/app/(constants)/Colors";
import { url } from "@/app/(constants)/Urls";
import { CommonInput } from "@/app/(components)/Input";
import { deletePost } from "@/app/(api)/(post)/post_client";
import { CRUDStateEnum } from "@/app/(api)/CRUDStateEnum";
import Swal from "sweetalert2";

type Props = {
  postId: number | string;
  /** 기본값: `/post/{postId}/delete` (스프링 백엔드 기준) */
  deleteUrl?: string;
  /** 삭제 성공 후 행동(선택): 전달 시 이 콜백 실행, 없으면 목록으로 이동 */
  onDeleted?: () => void;
  /** 버튼 라벨(선택) */
  label?: string;
};

const DeletePostButton: React.FC<Props> = ({
  postId,
  deleteUrl,
  onDeleted,
  label = "삭제",
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const endpoint =
    deleteUrl ?? `/post/${encodeURIComponent(String(postId))}/delete`;

  const handleOpen = () => {
    setErr(null);
    setPw("");
    setOpen(true);
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setErr(null);
    }
  };

  const handleSubmit = async () => {
    if (!pw.trim()) {
      setErr("비밀번호를 입력해 주세요.");
      return;
    }
    try {
        setLoading(true);
        setErr(null);

        const res = await deletePost(Number(postId), pw);
        if(res != CRUDStateEnum.DELETE_SUCCESS){
            let msg = "삭제에 실패했습니다.";
            setErr(msg)
            setLoading(false)
            return;
        }

        // 성공 처리
          setOpen(false);
        if (onDeleted) {
          onDeleted();
        } else {
          // 기본: 목록으로 이동
          Swal.fire({
              title: "삭제가 완료되었습니다!",
              icon: "success",
          }).then(() => {
            router.push(`${url.LIST}/1`);
          });
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      {/* 트리거 버튼 */}
      <div
        onClick={handleOpen}
        className="cursor-pointer flex flex-col items-center text-[#4D4D4D]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {label}
      </div>

      {/* 모달 */}
      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />
          {/* Dialog */}
          <div className="relative w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              정말 삭제하시겠습니까?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              삭제를 진행하려면 게시글 비밀번호를 입력해 주세요.
            </p>

            <div className="mt-4">
            <CommonInput title="게시글 비밀번호" maxLength={20} type="password" placeholder="6자 이상" value={pw}
                onChange={(e)=>setPw(e.target.value)}/>
              {err && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {err}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg text-white disabled:opacity-70"
                style={{ backgroundColor: ColorCode.lightRed }}
                disabled={loading}
              >
                {loading ? "삭제 중..." : "삭제 확인"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePostButton;
