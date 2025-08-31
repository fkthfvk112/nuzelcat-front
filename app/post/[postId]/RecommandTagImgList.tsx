"use server"

import { fetchPostCards } from "@/app/(api)/(post)/post";
import ClickImg from "@/app/(components)/ClickImg";
import { DarkText, MediumDarkText } from "@/app/(components)/Texts";

export default async function RecommandTagImgList({postId, tags}:{postId:number|string, tags:string[]}){
      const cardData = await fetchPostCards({
        sortDir:"desc",
        page:0,
        size:12,
        tags:tags,
        exceptId:postId
      });
      
      const tagCat =
          cardData.content &&
          cardData.content.map((card, inx)=><ClickImg key={inx} imgUrl={card.repreImgUrl} postId={card.postId} />)



    return(
        <div className="w-full">
            <MediumDarkText className="ms-3" text="관련 사진"/>
            <section className="grid grid-cols-3 w-full gap-1 p-2">
                {
                    tagCat
                }
            </section>
        </div>
    )
}