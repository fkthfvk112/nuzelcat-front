"use client"

import Container from "./(components)/Container";
import { floatingBtnDatasMock, imageCardMock, mockRankingData } from "./(utils)/mock";
import ImgCard from "./(components)/ImgCard";
import FloatingBtn from "./(components)/FloatingBtn";
import { url } from "./(constants)/Urls";
import { useState } from "react";
import { RedPinkText } from "./(components)/Texts";
import { ImageCardInterface } from "./(types)/Image";
import { MedalType } from "./(components)/Medal";

export default function Home() {
  const [rank, setRank] = useState<ImageCardInterface[]>(mockRankingData);

  const flotingBtnItems = [
    { name: "홈", url: "/" },
    { name: '업로드', url: url.UPLOAD },
  ];

  const getMedalType = (inx:number):MedalType|undefined=>{
    if(inx === 0) return "gold";
    if(inx === 1) return "silver";
    if(inx === 2) return "bronze";
  }
  return (
    <main className="w-full">
      <div className="w-full text-center mt-5">
        <RedPinkText className="text-3xl mb-10" text="누가누가 제일 귀여운 고양이일까"/>
      </div>
      <div className="flex justify-center items-center gap-4 max-w-full flex-wrap" style={{ padding: '1rem' }}>
        {rank.map((ele, inx)=><ImgCard key={inx} imgCardData={ele} maxWidth={400} minWidth={300} medalType={getMedalType(inx)} />)}
      </div>
      <Container style={{padding:"2rem"}}>
        <div className="flex flex-wrap gap-4 justify-center">
        {imageCardMock.map((ele, inx)=><ImgCard key={inx} imgCardData={ele} maxWidth={400} minWidth={300}></ImgCard>)}
        </div>
      </Container>
      <FloatingBtn floatingBtnDatas={flotingBtnItems}/>
    </main>
  );
}
