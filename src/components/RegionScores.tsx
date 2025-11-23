import type { RegionScores as RegionScoresType } from '../types.ts';
import { usePlayersActions } from '../contexts/PlayersContext';

type RegionScoresProps = {
  regions: RegionScoresType;
  playerId: number;
  playerIndex: number;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    playerIndex: number,
    regionNum: number
  ) => void;
};

export const RegionScores = ({
  regions,
  playerId,
  playerIndex,
  onKeyDown,
}: RegionScoresProps) => {
  const { updateRegionScore } = usePlayersActions();
  return (
    <div className="space-y-1.5 mb-4">
      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 pl-1">
        Regions
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <div key={num} className="flex items-center gap-2">
          {/* Turn Number Badge */}
          <div className="w-6 h-6 rounded-sm bg-slate-700 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
            {num}
          </div>
          <input
            id={`input-p${playerIndex}-r${num}`}
            type="text"
            inputMode="decimal"
            pattern="\d*"
            maxLength={2}
            placeholder="-"
            value={regions[num] === 0 ? 0 : regions[num] || ''}
            onChange={(e) => updateRegionScore(playerId, num, e.target.value)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => onKeyDown(e, playerIndex, num)}
            className="w-full bg-white border border-slate-200 rounded-sm px-1 py-1 text-center text-lg font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-hidden shadow-xs transition-all"
          />
        </div>
      ))}
    </div>
  );
};
