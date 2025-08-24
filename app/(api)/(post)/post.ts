// app/(apis)/post.ts
"use server";

import serverFetch from "@/app/(utils)/serverFetch";
import { PostDetailInterface } from "@/app/(types)/post";

export async function fetchPostDetail(postId: number): Promise<PostDetailInterface> {
  return serverFetch({
    url: `post/${postId}`,
    option: { method: "GET" },
  });
}
