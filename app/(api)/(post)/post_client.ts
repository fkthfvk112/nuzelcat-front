import { defaultAxios } from "@/app/(utils)/axiosInstance";
import { CRUDStateEnum } from "../CRUDStateEnum";

export async function requestPostLike(postId: number): Promise<number> {
  const res = await defaultAxios.post(
    `${process.env.NEXT_PUBLIC_API_URL}post/${postId}/like`,
    {},
    { withCredentials: true } 
  );

  return res.data;
}


export async function deletePost(postId:number, postPw:string):Promise<CRUDStateEnum>{
  const res = await defaultAxios.delete(`/post/${postId}`, {
    data: { pw: postPw }
  });

  return res.data
}