"use server"

import Container from "./(components)/Container";
import { floatingBtnDatasMock, imageCardMock, mockRankingData } from "./(utils)/mock";
import ImgCard from "./(components)/ImgCard";
import FloatingBtn from "./(components)/FloatingBtn";
import { url } from "./(constants)/Urls";
import { useState } from "react";
import { RedPinkText } from "./(components)/Texts";
import { ImageCardInterface } from "./(types)/Image";
import { MedalType } from "./(components)/Medal";
import { fetchPostCards } from "./(api)/(post)/post";
import CustomPageNation from "./(components)/CustomPageNation";
import RankData from "@/RankData";

export default async function Home() {

  const flotingBtnItems = [
    { name: "홈", url: "/" },
    { name: '업로드', url: url.UPLOAD },
  ];


  const cardData  = await fetchPostCards({});
  
  return (
    <main className="w-full">
      <div className="w-full text-center mt-5">
        <RedPinkText className="text-3xl mb-10" text="누가누가 제일 귀여운 고양이일까"/>
      </div>
      <RankData/>
      <Container style={{padding:"2rem"}}>
        <div className="flex flex-wrap gap-4 justify-center">
        {cardData.content.map((ele, inx)=><ImgCard key={inx} imgCardData={ele} maxWidth={400} minWidth={300}></ImgCard>)}
        </div>
        <CustomPageNation
            queryStr={""}
            pageNow={1}
            pageMax={cardData.totalPages}
        />
      </Container>
      <FloatingBtn floatingBtnDatas={flotingBtnItems}/>
    </main>
  );
}
