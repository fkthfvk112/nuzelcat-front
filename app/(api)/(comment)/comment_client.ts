"use client"

import { defaultAxios } from "@/app/(utils)/axiosInstance";
import { CRUDStateEnum } from "../CRUDStateEnum";
import { CommentInterface } from "@/app/(types)/comment";

export async function writeComment(comment: CommentInterface): Promise<CRUDStateEnum> {
  return defaultAxios.post(`${process.env.NEXT_PUBLIC_API_URL}comment/${comment.postId}`, comment)
}