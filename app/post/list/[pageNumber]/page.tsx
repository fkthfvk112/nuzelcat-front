"use server";

import { fetchPostCards } from "@/app/(api)/(post)/post";
import Container from "@/app/(components)/Container";
import CustomPageNation from "@/app/(components)/CustomPageNation";
import ImgCard from "@/app/(components)/ImgCard";
import { ImageCardInterface } from "@/app/(types)/Image";

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

export default async function CatCardList({
  params,
  searchParams
}: {
  params: { pageNumber: string;};
  searchParams?: { [key: string]: string | string[] | undefined };
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
  
  console.log("데이터", cardData)

  const recentCats =
      cardData.content &&
      cardData.content.map((card, inx) => (
          <div key={card.postId}>
          <ImgCard imgCardData={card} maxWidth={400} minWidth={300} />
          </div>
      ));

  return (
    <Container style={{padding:"2rem"}}>
      <div className="flex flex-wrap gap-4 justify-center">
        {recentCats}
      </div>
      {/* {fetchData.content?.length <= 0 && <NoContent_Recipe />} */}
      <CustomPageNation
          queryStr={queryStr}
          pageNow={Number(params.pageNumber)}
          pageMax={cardData.totalPages}
      />
    </Container>
  );
}
