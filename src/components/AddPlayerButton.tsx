import { Plus } from './Icons';

type AddPlayerButtonProps = {
  onAddPlayer: () => void;
};

export const AddPlayerButton = ({ onAddPlayer }: AddPlayerButtonProps) => {
  return (
    <button
      onClick={onAddPlayer}
      className="min-h-[150px] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-orange-500 hover:border-orange-400 hover:bg-orange-50 transition-all group bg-white/50 p-4"
    >
      <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
        <Plus size={20} className="group-hover:text-orange-600" />
      </div>
      <span className="font-medium text-sm">Add</span>
    </button>
  );
};
