import Image from "next/image";
import { ColorCode } from "../(constants)/Colors";
import { Badge } from "./Badge";
import { DarkText } from "./Texts";

export interface RankingInterface{
    rank:number;
    imgUrl:string;
    catName:string;
    tags:string[];
}

export default function Ranking({rank, imgUrl, catName, tags}:RankingInterface){

    return(
        <section style={{backgroundColor:ColorCode.lightPink}} 
            className="w-full max-w-[1024px] min-h-[100px] grid grid-cols-[minmax(0,4fr)_minmax(120px,1fr)] shadow-sm mb-6 rounded-xl p-4 gap-4"
        >
            <div className="flex flex-col p-1">
                <div>
                    {rank}
                </div>
                <div className="flex flex-wrap">
                    {tags.map((ele, inx)=><Badge key={inx} text={ele} colorCode={ColorCode.green}/>)}
                </div>
                <DarkText text={catName} className="text-[1.3rem]"/>
            </div>
            <div>
                <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <Image
                    src={imgUrl}
                    alt=""
                    fill
                    className="object-cover"
                    loading="lazy"
                />
                </div>
            </div>
        </section>
    )
}