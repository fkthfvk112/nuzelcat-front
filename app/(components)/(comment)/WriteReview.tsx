"use client";

import { writeComment } from "@/app/(api)/(comment)/comment_client";
import { revalidateByTagName } from "@/app/(utils)/revalidateByTagName";
import { Checkbox, Rating } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const domainReviewUrl = {
  recipe: "review/recipe/create",
  board:  "review/board/create"
} as const;

interface commonReview{
  message:string,
  score?:number,
  checkAnonymous?:boolean
}

export default function WriteReview({ postId }: { postId: number}) {
    const [review, setReview] = useState<string>("");
    const reviewKey = `reviews-${postId}`;

    const saveReview = ()=>{
        writeComment({
            postId:postId,
            body:review
        }).then((res)=>{
            revalidateByTagName(reviewKey);
            setReview("");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleChangeData = (evt:ChangeEvent<HTMLTextAreaElement>)=>{
        const messageNow = evt.target.value;
        if(messageNow.length > 1000) return;
        setReview(messageNow);
    }

    return <>
        <div className="flex justify-center flex-col items-center">
            <div className="w-full border border-slate-400">
                <textarea
                className="w-full h-30 p-3 border-none bottom-line-noM"
                placeholder="댓글을 작성해주세요."
                value={review}
                onChange={(e) => {
                    handleChangeData(e);
                }}
                />
                <div className="flex justify-between items-center p-2">
                    <div className="flex justify-end items-center w-full">
                    <div className="me-5">{review.length}/1000</div>
                    {
                    review.length >= 2 && review.length <= 1000?
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition"
                        onClick={saveReview}
                    >
                        댓글 쓰기
                    </button>:
                    <button
                        className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
                        disabled
                    >
                        댓글 쓰기
                    </button>
                    }
                </div>
                </div>
            </div>
        </div>
    </>;
}
