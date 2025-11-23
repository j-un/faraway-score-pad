import { Trophy, RotateCcw } from './Icons';

type HeaderProps = {
  onReset: () => void;
};

export const Header = ({ onReset }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-orange-600 text-white p-2 rounded-lg shadow-md">
          <Trophy size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Faraway Score Pad
        </h1>
      </div>

      <div className="flex gap-2 w-full md:w-auto justify-end">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg shadow-xs transition-colors font-medium"
          title="得点のみリセット"
        >
          <RotateCcw size={18} />
          <span className="text-sm">Reset Scores</span>
        </button>
      </div>
    </div>
  );
};
