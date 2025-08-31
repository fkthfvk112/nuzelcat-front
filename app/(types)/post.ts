export interface PostDetailInterface{
    postId:number;
    images:string[];
    title:string;
    catName:string;
    author:string;
    description:string;
    tags:string[];
    likeCnt:number;
    viewCnt:number;
    createdAt?:string;
}

export interface UploadPayload {
  title: string;
  catName: string|null;
  authorNickname: string|null;
  description: string|null;
  authorPassword: string|null;
  tags: string[]|null;
  locationRegion: string | null;
  base64ImgList: string[];
}