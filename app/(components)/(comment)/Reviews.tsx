"use server";

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import TimeDiff from "./TimeDiff";
import serverFetch from "@/app/(utils)/serverFetch";
import { CommentInterface } from "@/app/(types)/comment";
import WriteReviewReply from "./WriteReviewReply";
import { fetchCommentList } from '@/app/(api)/(comment)/comment';

export default async function Reviews({ postId }: { postId: number  }) {
  const reviewKey = `reviews-${postId}`;

  const fetchData: CommentInterface[] = await fetchCommentList(postId, reviewKey);

  const review = fetchData.map((review, inx) => (
    <div key={inx} className={`m-2 mb-10 ${review.parentId != null&&"ms-16"}`}>
      <div className="flex justify-start items-center">
        {review.parentId && <SubdirectoryArrowRightIcon/>}
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
          {
            review.isDel ? (
              <div>
                <h3 className="ms-2 me-2">삭제</h3>
              </div>
            ) : (
                <TimeDiff time={review.createdAt as string}/>
            )
          }
          </div>
          {(review.parentId === null || review.parentId === undefined) && (
            <WriteReviewReply postId={postId} parentReviewId={review.id as number}/>
          )}
        </div>
      </div>
      <div className="ms-6 break-words break-keep whitespace-pre-wrap">
        {
          review.isDel?"삭제된 댓글입니다."
          :
          review.body
        }
      </div>
    </div>
  ));

  return (
    <div>
      <div className="font-bold mt-5">댓글 <span className="text-orange-400">{fetchData.length}</span></div>
      {review}
    </div>);
}
