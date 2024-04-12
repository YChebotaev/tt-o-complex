import { useMemo, type FC } from "react";
import { useGetReviews } from "@/hooks/useGetReviews";
import { Review } from "./Review";
import { ReviewSkeleton } from "./ReviewSkeleton";

export const Reviews: FC = () => {
  const { data: reviews, isLoading } = useGetReviews();

  const reviewsEls = useMemo(() => {
    if (isLoading) {
      return [0, 1].map((i) => <ReviewSkeleton key={i} />);
    }

    return reviews!.map(({ id, text }, i) => (
      <Review key={`${id}-${i}`} text={text} />
    ));
  }, [reviews, isLoading]);

  return (
    <div className="max-w-[1442px] m-auto p-[14px]">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-[20px]">
        {reviewsEls}
      </div>
    </div>
  );
};
