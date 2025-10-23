"use client"

import Image from "next/image";
import { ImageCardInterface } from "../(types)/Image";
import { timeDifferenceString } from "../(utils)/timeUtil";
import { useRouter } from "next/navigation";
import { url } from "../(constants)/Urls";
import { Badge } from "./Badge";
import { ColorCode } from "../(constants)/Colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon  from '@mui/icons-material/Visibility';
import EyesIcon from "../(constants)/EyesIcon";
import Medal, { MedalType } from "./Medal";

interface ImgCardProps {
    imgCardData: ImageCardInterface,
    medalType?:MedalType,
    maxWidth: number,
    minWidth: number,
}

export default function ImgCard({ imgCardData, maxWidth, minWidth, medalType }: ImgCardProps) {
  const router = useRouter();

  const goPost = ()=>{
    router.push(url.POST+imgCardData.postId);
  }

  const goList = (tagName:string)=>{
    router.push(url.LIST + "/1?tags=" + tagName)
  }

  return (
    <div
      onClick={()=>{goPost()}}
      className={`flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full mb-4
                 cursor-pointer transform transition-transform duration-200 hover:scale-105 relative
                 ${
                    medalType === "gold"
                      ? "border-2 border-yellow-400"
                      : medalType === "silver"
                      ? "border-2 border-gray-300"
                      : medalType === "bronze"
                      ? "border-2 border-orange-100"
                      : ""
                  }
                 `}
      style={{ maxWidth: `${maxWidth}px`, minWidth: `${minWidth}px` }}
    >
      {medalType&&<div className="absolute top-2 z-10">
        <Medal medalType={medalType}/>
      </div>}
      {/* 이미지 */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={imgCardData.repreImgUrl}
          alt=""
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* 내용 */}
      <div className="p-2 flex flex-col flex-1">
        <div className="flex items-center justify-between mt-3 relative">
          {/* 버블링 차단 래퍼 */}
          <div
            className="absolute flex flex-col -top-[35px]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
            }}
          >
            <div className="flex">
              {imgCardData.tags.map((tag, inx) => (
                <Badge
                  key={inx}
                  text={tag}
                  colorCode={ColorCode.green}
                  href={url.LIST + "/1?tags=" + encodeURIComponent(tag)}
                />
              ))}
            </div>
          </div>
          <h1 className="text-lg font-medium truncate">{imgCardData.title}</h1>
        </div>
        <div className="text-[0.65rem] flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="flex items-center">
              <FavoriteIcon className="w-4 h-4" sx={{color:ColorCode.lightRed}}/>
              <span className="ml-1">{imgCardData.likeCnt}</span>
            </div>
            <div className="flex items-center">
              <EyesIcon sx={{fontSize: 35, color:ColorCode.mediumDark}}/>
              <span className="ml-1">{imgCardData.viewCnt}</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {imgCardData.createdAt && timeDifferenceString(new Date(imgCardData.createdAt))}
          </div>
        </div>
        <p className="text-[0.7rem] text-gray-700 truncate mb-1">{imgCardData.catName}</p>
      </div>
    </div>
  );
}
