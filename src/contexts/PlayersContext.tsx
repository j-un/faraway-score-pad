import { createContext, useContext, type ReactNode, useMemo } from 'react';
import { usePlayers } from '../hooks/usePlayers';

// 型定義
type PlayersState = Pick<
  ReturnType<typeof usePlayers>,
  'players' | 'winningPlayerIds' | 'calculateTotal'
>;

type PlayersActions = Pick<
  ReturnType<typeof usePlayers>,
  | 'addPlayer'
  | 'removePlayer'
  | 'updateName'
  | 'updateRegionScore'
  | 'updateSanctuaryScore'
  | 'addSanctuaryRow'
  | 'removeSanctuaryRow'
  | 'resetAll'
>;

// コンテキストオブジェクトの作成
const PlayersStateContext = createContext<PlayersState | undefined>(undefined);
const PlayersActionsContext = createContext<PlayersActions | undefined>(
  undefined
);

// プロバイダーコンポーネント
export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const { players, winningPlayerIds, calculateTotal, ...actions } =
    usePlayers();

  // stateとactionsオブジェクトが不必要に再生成されないようにメモ化
  const state = useMemo(
    () => ({ players, winningPlayerIds, calculateTotal }),
    [players, winningPlayerIds, calculateTotal]
  );
  const memoizedActions = useMemo(() => actions, [actions]);

  return (
    <PlayersStateContext.Provider value={state}>
      <PlayersActionsContext.Provider value={memoizedActions}>
        {children}
      </PlayersActionsContext.Provider>
    </PlayersStateContext.Provider>
  );
};

// カスタムフック
export const usePlayersState = () => {
  const context = useContext(PlayersStateContext);
  if (context === undefined) {
    throw new Error('usePlayersState must be used within a PlayersProvider');
  }
  return context;
};

export const usePlayersActions = () => {
  const context = useContext(PlayersActionsContext);
  if (context === undefined) {
    throw new Error('usePlayersActions must be used within a PlayersProvider');
  }
  return context;
};
