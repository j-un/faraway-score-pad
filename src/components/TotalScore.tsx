type TotalScoreProps = {
  totalScore: number;
  isWinner: boolean;
};

export const TotalScore = ({ totalScore, isWinner }: TotalScoreProps) => {
  return (
    <div
      className={`p-2 md:p-3 border-t mt-auto flex justify-between items-center transition-colors duration-300 ${isWinner ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-600 text-white border-orange-600'}`}
    >
      <span className="text-xs font-bold uppercase tracking-widest opacity-90">
        Total
      </span>
      <span className="text-2xl font-black tracking-tighter drop-shadow-xs">
        {totalScore}
      </span>
    </div>
  );
};
