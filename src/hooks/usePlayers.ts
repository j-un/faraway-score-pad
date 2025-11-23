import { useReducer, useEffect } from 'react';
import type { Player, Sanctuary } from '../types.ts';

// --- Action Types ---
type Action =
  | { type: 'ADD_PLAYER'; payload: { newPlayer: Player } }
  | { type: 'REMOVE_PLAYER'; payload: { id: number } }
  | { type: 'UPDATE_NAME'; payload: { id: number; name: string } }
  | {
      type: 'UPDATE_REGION_SCORE';
      payload: { playerId: number; regionNum: number; value: string };
    }
  | {
      type: 'UPDATE_SANCTUARY_SCORE';
      payload: { playerId: number; sanctuaryId: string; value: string };
    }
  | {
      type: 'ADD_SANCTUARY_ROW';
      payload: { playerId: number; newSanctuary: Sanctuary };
    }
  | {
      type: 'REMOVE_SANCTUARY_ROW';
      payload: { playerId: number; sanctuaryId: string };
    }
  | { type: 'RESET_ALL' }
  | { type: 'SET_WINNER'; payload: { winnerIds: number[] } };

// --- State Type ---
export type State = {
  players: Player[];
  winningPlayerIds: number[];
};

// --- Helper Functions ---
let nextPlayerId = 1;
const createInitialPlayer = (): Player => {
  const newId = nextPlayerId++;
  return {
    id: newId,
    name: `Player ${newId}`,
    regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    sanctuaries: [{ id: `s${newId}-1`, value: '' }],
  };
};
let nextSanctuaryId = 1;

// --- Reducer ---
export const playersReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYER': {
      if (state.players.length >= 6) return state;
      return {
        ...state,
        players: [...state.players, action.payload.newPlayer],
      };
    }
    case 'REMOVE_PLAYER': {
      if (state.players.length <= 1) return state;
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.payload.id),
      };
    }
    case 'UPDATE_NAME': {
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.payload.id ? { ...p, name: action.payload.name } : p
        ),
      };
    }
    case 'UPDATE_REGION_SCORE': {
      const { playerId, regionNum, value } = action.payload;
      if (value !== '' && isNaN(parseInt(value, 10))) {
        return state;
      }
      let score: number | '' = value === '' ? '' : parseInt(value, 10);
      if (typeof score === 'number' && score > 99) {
        score = 99;
      }
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === playerId
            ? { ...p, regions: { ...p.regions, [regionNum]: score } }
            : p
        ),
      };
    }
    case 'UPDATE_SANCTUARY_SCORE': {
      const { playerId, sanctuaryId, value } = action.payload;
      if (value !== '' && isNaN(parseInt(value, 10))) {
        return state;
      }
      let score: number | '' = value === '' ? '' : parseInt(value, 10);
      if (typeof score === 'number' && score > 99) {
        score = 99;
      }
      return {
        ...state,
        players: state.players.map((p) => {
          if (p.id !== playerId) return p;
          const newSanctuaries: Sanctuary[] = p.sanctuaries.map((s) =>
            s.id === sanctuaryId ? ({ ...s, value: score } as Sanctuary) : s
          );
          return { ...p, sanctuaries: newSanctuaries };
        }),
      };
    }
    case 'ADD_SANCTUARY_ROW': {
      return {
        ...state,
        players: state.players.map((p) => {
          if (p.id !== action.payload.playerId) return p;
          // Max 7 sanctuaries per player
          if (p.sanctuaries.length >= 7) {
            return p;
          }
          return {
            ...p,
            sanctuaries: [...p.sanctuaries, action.payload.newSanctuary],
          };
        }),
      };
    }
    case 'REMOVE_SANCTUARY_ROW': {
      return {
        ...state,
        players: state.players.map((p) => {
          if (p.id !== action.payload.playerId) return p;
          return {
            ...p,
            sanctuaries: p.sanctuaries.filter(
              (s) => s.id !== action.payload.sanctuaryId
            ),
          };
        }),
      };
    }
    case 'RESET_ALL': {
      return {
        ...state,
        players: state.players.map((p) => ({
          id: p.id,
          name: p.name,
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [{ id: `s-${p.id}-1`, value: '' }],
        })),
      };
    }
    case 'SET_WINNER': {
      return {
        ...state,
        winningPlayerIds: action.payload.winnerIds,
      };
    }
    default:
      return state;
  }
};

// --- Initial State ---
const createInitialState = (): State => {
  resetIdCounters();
  return {
    players: [createInitialPlayer()],
    winningPlayerIds: [],
  };
};

export const resetIdCounters = () => {
  nextPlayerId = 1;
  nextSanctuaryId = 1;
};

// --- Custom Hook ---
export const usePlayers = () => {
  const [state, dispatch] = useReducer(
    playersReducer,
    undefined,
    createInitialState
  );
  const { players, winningPlayerIds } = state;

  const calculateTotal = (player: Player) => {
    const regionValues: (number | '')[] = Object.values(player.regions);
    const regionSum = regionValues.reduce(
      (acc: number, val: number | '') => acc + (val === '' ? 0 : Number(val)),
      0
    );
    const sanctuarySum = player.sanctuaries.reduce(
      (acc: number, s: Sanctuary) =>
        acc + (s.value === '' ? 0 : Number(s.value)),
      0
    );
    return regionSum + sanctuarySum;
  };

  useEffect(() => {
    if (players.length === 0) {
      dispatch({ type: 'SET_WINNER', payload: { winnerIds: [] } });
      return;
    }

    const scores = players.map((p) => calculateTotal(p));
    const maxScore = Math.max(...scores);

    if (maxScore === 0) {
      dispatch({ type: 'SET_WINNER', payload: { winnerIds: [] } });
      return;
    }

    const winnerIds = players
      .filter((p, index) => scores[index] === maxScore)
      .map((p) => p.id);

    dispatch({ type: 'SET_WINNER', payload: { winnerIds } });
  }, [players]);

  // --- Action Dispatchers (Side effects are here) ---
  const addPlayer = () => {
    const newPlayer = createInitialPlayer();
    dispatch({ type: 'ADD_PLAYER', payload: { newPlayer } });
  };
  const removePlayer = (id: number) =>
    dispatch({ type: 'REMOVE_PLAYER', payload: { id } });
  const updateName = (id: number, name: string) =>
    dispatch({ type: 'UPDATE_NAME', payload: { id, name } });
  const updateRegionScore = (
    playerId: number,
    regionNum: number,
    value: string
  ) =>
    dispatch({
      type: 'UPDATE_REGION_SCORE',
      payload: { playerId, regionNum, value },
    });
  const updateSanctuaryScore = (
    playerId: number,
    sanctuaryId: string,
    value: string
  ) =>
    dispatch({
      type: 'UPDATE_SANCTUARY_SCORE',
      payload: { playerId, sanctuaryId, value },
    });
  const addSanctuaryRow = (playerId: number) => {
    const newSanctuaryId = nextSanctuaryId++;
    const newSanctuary: Sanctuary = {
      id: `s-${playerId}-${newSanctuaryId}`,
      value: '',
    };
    dispatch({
      type: 'ADD_SANCTUARY_ROW',
      payload: { playerId, newSanctuary },
    });
  };
  const removeSanctuaryRow = (playerId: number, sanctuaryId: string) =>
    dispatch({
      type: 'REMOVE_SANCTUARY_ROW',
      payload: { playerId, sanctuaryId },
    });
  const resetAll = () => dispatch({ type: 'RESET_ALL' });

  return {
    players,
    winningPlayerIds,
    addPlayer,
    removePlayer,
    updateName,
    updateRegionScore,
    updateSanctuaryScore,
    addSanctuaryRow,
    removeSanctuaryRow,
    resetAll,
    calculateTotal,
  };
};
