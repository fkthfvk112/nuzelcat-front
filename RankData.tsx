"use server"

import { ImageCardInterface } from "./app/(types)/Image";
import { mockRankingData } from "./app/(utils)/mock";
import ImgCard from "./app/(components)/ImgCard";
import { MedalType } from "./app/(components)/Medal";
import { fetchPostCards } from "./app/(api)/(post)/post";

export default async function RankData(){
  const cardData  = await fetchPostCards({
    page:0,
    size:3,
    sortDir:"score_desc"
  });
  
  const getMedalType = (inx:number):MedalType|undefined=>{
    if(inx === 0) return "gold";
    if(inx === 1) return "silver";
    if(inx === 2) return "bronze";
  }

  return(
      <div className="flex justify-center items-center gap-4 max-w-full flex-wrap" style={{ padding: '1rem' }}>
        <div className="w-full flex justify-center">
          <ImgCard imgCardData={cardData.content[0]} maxWidth={180} minWidth={80} medalType={getMedalType(0)} />
        </div>
        <div className="flex justify-center w-full gap-3 flex-wrap">
            <ImgCard imgCardData={cardData.content[1]} maxWidth={180} minWidth={80} medalType={getMedalType(1)} />
            <ImgCard imgCardData={cardData.content[2]} maxWidth={180} minWidth={80} medalType={getMedalType(2)} />
        </div>
      </div>
  )
}