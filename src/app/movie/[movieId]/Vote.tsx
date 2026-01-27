import { Star } from "lucide-react";

type VoteProps = {
  vote_average: number;
  vote_count: number;
};

export const Vote = ({ vote_average, vote_count }: VoteProps) => {
  return (
    <div className="flex items-center gap-1 mt-2">
      <span className="font-semibold flex gap-2">
        <Star className="text-yellow-500 w-5 h-5" />
        {vote_average?.toFixed(1)}
      </span>
      /10
      <div className="font-semibold ">{vote_count}</div>
    </div>
  );
};
