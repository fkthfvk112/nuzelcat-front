"use server"

import { Badge } from "@/app/(components)/Badge";
import Container from "@/app/(components)/Container";
import EmblaCarousel from "@/app/(components)/EmblaCarousel";
import InnerContainer from "@/app/(components)/InnerContaner";
import { DarkText, MediumDarkText, RedPinkText } from "@/app/(components)/Texts";
import { ColorCode } from "@/app/(constants)/Colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EyesIcon from "@/app/(constants)/EyesIcon";
import { timeDifferenceString } from "@/app/(utils)/timeUtil";
import Line from "@/app/(components)/Line";
import RecommandTagImgList from "./RecommandTagImgList";
import { fetchPostDetail } from "@/app/(api)/(post)/post";
import LikeButton from "./LikeBtn";

type Props = {
  params: Promise<{ postId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Post({ params }: Props,){
    const postId = (await params).postId;
    const postData = await fetchPostDetail(Number(postId));

    return(
        <Container style={{ padding: '1rem' }}>
            <InnerContainer style={{ maxWidth: '1024px', minHeight:'300px' }}>
            <div className="w-full aspect-square rounded-2xl overflow-hidden">
            <EmblaCarousel
                slides={Array.from(Array(postData.images?.length).keys())}
                options={{ loop: true }}
                imgUrls={postData.images}
            />
            </div>
                <div className="w-full flex-col flex flex-start my-3">
                    <div className="w-full">
                        <DarkText className="text-xl" text={postData.title}/>
                    </div>
                    <div>
                        <MediumDarkText text={postData.description}/>            
                    </div>
                    <div className="flex mt-3 flex-wrap">
                        {
                            postData.tags.map((tag, inx)=><Badge key={inx} text={tag} colorCode={ColorCode.green}/>)
                        }
                    </div>
                    <div className="text-[0.65rem] flex justify-between items-center mt-3">
                        <div className="flex space-x-2">
                            {/* <div className="flex items-center">
                                <FavoriteIcon className="w-4 h-4" sx={{color:ColorCode.lightRed}}/>
                                <MediumDarkText className="ms-1" text={String(postData.likeCnt)}/>
                            </div> */}
                            <LikeButton postId={Number(postId)} initialLikeCnt={postData.likeCnt} />
                            <div className="flex items-center">
                                <EyesIcon sx={{fontSize: 35, color:ColorCode.mediumDark}}/>
                                <MediumDarkText className="ms-1" text={String(postData.viewCnt)}/>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <MediumDarkText text={postData.createdAt ? timeDifferenceString(new Date(postData.createdAt)):""}/>
                        </div>
                    </div>
                </div>
                <Line className="my-5" variant="half"/>
                <RecommandTagImgList tagList={postData.tags}/>
            </InnerContainer>
        </Container>
    )    
}