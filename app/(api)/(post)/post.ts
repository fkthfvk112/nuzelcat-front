// app/(apis)/post.ts
"use server";

import serverFetch from "@/app/(utils)/serverFetch";
import { PostDetailInterface } from "@/app/(types)/post";
import { ImageCardInterface } from "@/app/(types)/Image";
import { removeUndefined } from "@/app/(utils)/removeUndefined";
import { defaultAxios } from "@/app/(utils)/axiosInstance";

export async function fetchPostDetail(postId: number): Promise<PostDetailInterface> {
  return serverFetch({
    url: `post/${postId}`,
    option: { method: "GET", cache:"no-cache" },
  });
}

export async function fetchPostCards(params: {
  title?: string;
  catName?: string;
  tag?: string;
  sortDir?: "asc" | "desc";
  page?: number | string;
  size?: number | string;
}): Promise<{
  content: ImageCardInterface[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 번호 (0-based)
}> {
  const queryParams = removeUndefined({
    title: params.title,
    catName: params.catName,
    tag: params.tag,
    sortDir: params.sortDir ?? "score_desc", // 기본값  = 인기도 내림차순
    page: typeof params.page === "string" ? parseInt(params.page) : params.page ?? 0,
    size: typeof params.size === "string" ? parseInt(params.size) : params.size ?? 10,
  });

  return serverFetch({
    url: "post/list",
    queryParams,
    option: { method: "GET" },
  });
}

