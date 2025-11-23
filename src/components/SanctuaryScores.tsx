import { Plus, Calculator, X } from './Icons';
import type { Sanctuary } from '../types.ts';
import { usePlayersActions } from '../contexts/PlayersContext';

type SanctuaryScoresProps = {
  sanctuaries: Sanctuary[];
  playerId: number;
};

export const SanctuaryScores = ({
  sanctuaries,
  playerId,
}: SanctuaryScoresProps) => {
  const { addSanctuaryRow, removeSanctuaryRow, updateSanctuaryScore } =
    usePlayersActions();
  return (
    <div className="mb-2">
      <div className="flex justify-between items-end mb-1 pl-1">
        <div className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">
          Sanctuaries
        </div>
        <button
          onClick={() => addSanctuaryRow(playerId)}
          className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-sm hover:bg-orange-100 transition-colors flex items-center gap-0.5 font-bold"
          tabIndex={-1}
        >
          <Plus size={10} />
        </button>
      </div>

      <div className="space-y-1.5 bg-orange-50/50 p-2 rounded-lg border border-orange-100">
        {sanctuaries.map((sanctuary) => (
          <div
            key={sanctuary.id}
            className="flex items-center gap-1.5 animate-fade-in"
          >
            <div className="w-6 h-6 rounded-sm flex items-center justify-center text-orange-300 shrink-0">
              <Calculator size={14} />
            </div>
            <input
              type="text"
              inputMode="decimal"
              pattern="\d*"
              maxLength={2}
              placeholder="-"
              value={sanctuary.value}
              onChange={(e) =>
                updateSanctuaryScore(playerId, sanctuary.id, e.target.value)
              }
              onFocus={(e) => e.target.select()}
              className="w-full bg-white border border-orange-200 rounded-sm px-1 py-1 text-center text-lg font-medium text-orange-700 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-hidden shadow-xs placeholder-orange-200"
            />
            {sanctuaries.length > 0 && (
              <button
                onClick={() => removeSanctuaryRow(playerId, sanctuary.id)}
                className="text-orange-300 hover:text-red-500 p-0.5"
                tabIndex={-1}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
        {sanctuaries.length === 0 && (
          <div
            onClick={() => addSanctuaryRow(playerId)}
            className="text-center py-1.5 text-xs text-orange-400 cursor-pointer hover:text-orange-600 border border-dashed border-orange-200 rounded-sm bg-white/50"
          >
            + Add Sanctuary
          </div>
        )}
      </div>
    </div>
  );
};
