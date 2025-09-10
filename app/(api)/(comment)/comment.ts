"use server"

import serverFetch from "@/app/(utils)/serverFetch"

export async function fetchCommentList(postId:number, reviewKey:string){
    return serverFetch({
        url:`comment/${postId}`,
        option:{
            cache:"default",
            next: {
            tags: [reviewKey],
            },
        }
    })   
}
