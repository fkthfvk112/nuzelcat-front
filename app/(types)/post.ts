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