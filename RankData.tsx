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
        {cardData.content.map((ele, inx)=><ImgCard key={inx} imgCardData={ele} maxWidth={400} minWidth={300} medalType={getMedalType(inx)} />)}
      </div>
  )
}