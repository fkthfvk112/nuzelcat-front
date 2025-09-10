import { Suspense } from "react";
import WriteReview from "./WriteReview";
import ReviewSkeletion from "./ReviewSkeleton";
import Reviews from "./Reviews";

export default function ReviewContainer({ postId }: { postId: number }) {

  const reviewSkeleton = [1, 2, 3, 4, 5].map((ele, inx)=><ReviewSkeletion key={inx}/>)
  return (
    <>
      <WriteReview postId={postId} ></WriteReview>
      <Suspense fallback={
        <div>{reviewSkeleton}</div>
      }>
        <Reviews postId={postId}></Reviews>
      </Suspense>
    </>
  );
}
