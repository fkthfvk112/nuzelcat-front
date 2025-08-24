"use client"

import ClickImg from "@/app/(components)/ClickImg";
import ImgCard from "@/app/(components)/ImgCard";
import { DarkText, MediumDarkText } from "@/app/(components)/Texts";
import { ImageCardInterface } from "@/app/(types)/Image"
import { recommandImgCardMock } from "@/app/(utils)/mock";
import { useState } from "react"

export default function RecommandTagImgList({tagList}:{tagList:string[]}){
    const [cardData, setCardData] = useState<ImageCardInterface[]>(recommandImgCardMock);

    return(
        <div className="w-full">
            <MediumDarkText className="ms-3" text="관련 사진"/>
            <section className="grid grid-cols-3 w-full gap-1 p-2">
                {
                    cardData.map((card, inx)=><ClickImg key={inx} imgUrl={card.repreImgUrl} postId={card.postId} />)
                }
            </section>
        </div>
    )
}