import { defaultAxios } from "@/app/(utils)/axiosInstance";

export async function requestPostLike(postId: number): Promise<number> {
  const res = await defaultAxios.post(
    `${process.env.NEXT_PUBLIC_API_URL}post/${postId}/like`,
    {},
    { withCredentials: true } 
  );

  console.log("결과아", res);
  return res.data;
}
