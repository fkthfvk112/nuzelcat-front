"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { url } from "../(constants)/Urls";

export default function ClickImg({imgUrl, postId}:{imgUrl:string, postId:number}){
    const router = useRouter();

    const goPost = (postId:number)=>{
        router.push(url.POST + postId)
    }

    return (
        <div onClick={()=>goPost(postId)} className="relative w-full aspect-square overflow-hidden rounded-2xl
            cursor-pointer transform transition-transform duration-200 hover:scale-105">
            <Image
                src={imgUrl}
                alt=""
                fill
                className="object-cover"
                loading="lazy"
            />
        </div>
    )
}