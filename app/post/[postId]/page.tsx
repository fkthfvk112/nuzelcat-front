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
import { url } from "@/app/(constants)/Urls";
import DeletePostButton from "./DeletePostButton";
import TimeDiff from "./TimeDiff";
import CopyUrl from "@/app/(components)/CopyUrl";
import ReviewContainer from "@/app/(components)/(comment)/ReviewContainer";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ postId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const postId = (await params).postId;
  const postData = await fetchPostDetail(Number(postId));

  const title = postData.title ?? "고양이 포스트";
  const description = postData.description ?? `${postData.catName ?? "고양이"}의 사진과 이야기`;
  const images = postData.images?.length ? postData.images : ["/common/favicon.png"];
  const keywords = [
    ...(postData.tags || []),
    postData.catName,
    "고양이",
    "냥이",
  ].filter(Boolean) as string[];

  return {
    title: `${title} - 누젤캣`,
    description,
    keywords,
    openGraph: {
      title: `${title} - 누젤캣`,
      description,
      type: "article",
      url: `${url.POST}/${postId}`,
      images: images.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    alternates: {
      canonical: `${url.POST}/${postId}`,
    },
  };
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
                        {postData.catName&&<Badge text={postData.catName} colorCode={ColorCode.yellow}/>}
                        {
                            postData.tags.map((tag, inx)=><Badge key={inx} text={tag} colorCode={ColorCode.green} href={url.LIST + "/1?tags=" + encodeURIComponent(tag)} />)
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
                            <CopyUrl/>
                        </div>
                        <div className="flex justify-around items-center w-[100px]">
                            <TimeDiff time={postData.createdAt as string}></TimeDiff>
                            <DeletePostButton postId={postId}
                                // deleteUrl="/post/{id}/delete" 기본값 사용 시 주석 가능
                                // onDeleted={() => router.push('/')} // 커스텀 성공 처리하고 싶으면 콜백 사용
                            />
                        </div>
                    </div>
                </div>
                <section className="w-full">
                    <ReviewContainer postId={Number(postId)}/>
                </section>
                <Line className="my-5" variant="half"/>
                <RecommandTagImgList tags={postData.tags} postId={postId}/>
            </InnerContainer>
        </Container>
    )    
}