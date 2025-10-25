"use server";

import { fetchPostCards } from "@/app/(api)/(post)/post";
import ConditionBtns from "@/app/(components)/ConditionBtn";
import Container from "@/app/(components)/Container";
import CustomPageNation from "@/app/(components)/CustomPageNation";
import ImgCard from "@/app/(components)/ImgCard";
import { ImageCardInterface } from "@/app/(types)/Image";
import Image from "next/image";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "고양이 카드 - 머그인",
//     description: "귀여운 고양이들을 모아봤어요.",
//     icons: {
//       icon: "/common/favicon.png",
//     },
//     openGraph: {
//       title: "고양이 카드 - 머그인",
//       description: "귀여운 고양이들을 모아봤어요.",
//     },
//   };
// }

export default async function SearchPage({ params, searchParams }: {
  params: any;
  searchParams: any;
}) {

  // 쿼리스트링 유지용
  const queryStr = new URLSearchParams(
    Object.entries(searchParams ?? {})
      .filter(([_, v]) => v !== undefined) as [string, string][]
  ).toString();

  const apiPage = Math.max(Number(params.pageNumber) - 1, 0);

  const cardData = await fetchPostCards({
    ...searchParams,
    page: apiPage,
  });
  
  let recentCats =
      cardData.content &&
      cardData.content.map((card, inx) => (
          <ImgCard key={card.postId} imgCardData={card} maxWidth={180} minWidth={80} />
      ));

  return (
    <Container style={{ padding: "1rem" }}>
      <ConditionBtns/>
      <div className="flex flex-wrap gap-4 justify-center">
        {cardData.content && cardData.content.length > 0 ? (
          cardData.content.map((card) => (
            <ImgCard
              key={card.postId}
              imgCardData={card}
              maxWidth={180}
              minWidth={80}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center py-10">
            <div className="relative w-full aspect-square w-[300px] h-[300px]">
              <Image
                  src={"/emptybox.png"}
                  alt=""
                  fill
                  className="object-cover"
                  loading="lazy"
              />
            </div>
            찾는 내용이 없어요.
          </div>
        )}
      </div>

      {/* 페이지네이션은 데이터 있을 때만 노출 */}
      {cardData.totalPages > 0 && (
        <CustomPageNation
          queryStr={queryStr}
          pageNow={Number(params.pageNumber)}
          pageMax={cardData.totalPages}
        />
      )}
    </Container>
  );
}
