import type { Player } from '../types.ts';
import { usePlayersState, usePlayersActions } from '../contexts/PlayersContext';
import { Trash2, Trophy } from './Icons';
import { RegionScores } from './RegionScores';
import { SanctuaryScores } from './SanctuaryScores';
import { TotalScore } from './TotalScore';

type PlayerCardProps = {
  player: Player;
  playerIndex: number;
  isWinner: boolean;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    playerIndex: number,
    regionNum: number
  ) => void;
};

export const PlayerCard = ({
  player,
  playerIndex,
  isWinner,
  onKeyDown,
}: PlayerCardProps) => {
  const { calculateTotal, players } = usePlayersState();
  const { removePlayer, updateName } = usePlayersActions();
  const totalScore = calculateTotal(player);
  const playerCount = players.length;
  const cardClass =
    'bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col';

  return (
    <div
      className={`${cardClass} transition-all duration-300 ${isWinner ? 'ring-4 ring-orange-400 transform scale-[1.01] shadow-xl z-10' : 'hover:shadow-md'}`}
    >
      {/* Player Header */}
      <div
        className={`p-2 md:p-3 border-b border-slate-100 flex justify-between items-center ${isWinner ? 'bg-orange-50' : 'bg-white'}`}
      >
        <input
          type="text"
          value={player.name}
          onChange={(e) => updateName(player.id, e.target.value)}
          className={`font-bold text-sm md:text-base bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 focus:outline-hidden px-1 py-0.5 w-full mr-1 ${isWinner ? 'text-orange-800' : 'text-slate-800'}`}
        />
        {playerCount > 1 && (
          <button
            onClick={() => removePlayer(player.id)}
            className="text-slate-300 hover:text-red-500 transition-colors p-1"
            tabIndex={-1}
          >
            <Trash2 size={14} />
          </button>
        )}
        {isWinner && (
          <Trophy
            className="text-orange-500 ml-1 shrink-0"
            size={16}
            fill="currentColor"
          />
        )}
      </div>

      <div className="p-2 md:p-3 flex-1 bg-slate-50/50">
        <RegionScores
          regions={player.regions}
          playerId={player.id}
          playerIndex={playerIndex}
          onKeyDown={onKeyDown}
        />

        <SanctuaryScores
          sanctuaries={player.sanctuaries}
          playerId={player.id}
        />
      </div>

      <TotalScore totalScore={totalScore} isWinner={isWinner} />
    </div>
  );
};
