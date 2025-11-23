import { describe, it, expect, beforeEach } from 'vitest';
import { playersReducer, resetIdCounters, type State } from './usePlayers';
import type { Player, Sanctuary } from '../types';

describe('playersReducer', () => {
  beforeEach(() => {
    // Reset ID counters before each test to ensure a clean slate
    resetIdCounters();
  });

  it('should add a player', () => {
    const initialState: State = {
      players: [],
      winningPlayerIds: [],
    };
    const newPlayer: Player = {
      id: 1,
      name: 'Player 1',
      regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
      sanctuaries: [{ id: 's1-1', value: '' }],
    };
    const action = { type: 'ADD_PLAYER' as const, payload: { newPlayer } };
    const state = playersReducer(initialState, action);
    expect(state.players).toHaveLength(1);
    expect(state.players[0].name).toBe('Player 1');
  });

  it('should remove a player if more than one exists', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
        {
          id: 2,
          name: 'Player 2',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
      ],
      winningPlayerIds: [],
    };
    const action = { type: 'REMOVE_PLAYER' as const, payload: { id: 1 } };
    const state = playersReducer(initialState, action);
    expect(state.players).toHaveLength(1);
    expect(state.players[0].id).toBe(2);
  });

  it('should not remove the last player', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
      ],
      winningPlayerIds: [],
    };
    const action = { type: 'REMOVE_PLAYER' as const, payload: { id: 1 } };
    const state = playersReducer(initialState, action);
    expect(state.players).toHaveLength(1);
  });

  it('should update a player name', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
      ],
      winningPlayerIds: [],
    };
    const action = {
      type: 'UPDATE_NAME' as const,
      payload: { id: 1, name: 'New Name' },
    };
    const state = playersReducer(initialState, action);
    expect(state.players[0].name).toBe('New Name');
  });

  it('should update a region score', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
      ],
      winningPlayerIds: [],
    };
    const action = {
      type: 'UPDATE_REGION_SCORE' as const,
      payload: { playerId: 1, regionNum: 3, value: '50' },
    };
    const state = playersReducer(initialState, action);
    expect(state.players[0].regions[3]).toBe(50);
  });

  it('should update a sanctuary score', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [{ id: 's1-1', value: '' }],
        },
      ],
      winningPlayerIds: [],
    };
    const action = {
      type: 'UPDATE_SANCTUARY_SCORE' as const,
      payload: { playerId: 1, sanctuaryId: 's1-1', value: '25' },
    };
    const state = playersReducer(initialState, action);
    expect(state.players[0].sanctuaries[0].value).toBe(25);
  });

  it('should add a sanctuary row', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
      ],
      winningPlayerIds: [],
    };
    const newSanctuary: Sanctuary = { id: 's1-2', value: '' };
    const action = {
      type: 'ADD_SANCTUARY_ROW' as const,
      payload: { playerId: 1, newSanctuary },
    };
    const state = playersReducer(initialState, action);
    expect(state.players[0].sanctuaries).toHaveLength(1);
    expect(state.players[0].sanctuaries[0]).toEqual(newSanctuary);
  });

  it('should remove a sanctuary row', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [{ id: 's1-1', value: 10 }],
        },
      ],
      winningPlayerIds: [],
    };
    const action = {
      type: 'REMOVE_SANCTUARY_ROW' as const,
      payload: { playerId: 1, sanctuaryId: 's1-1' },
    };
    const state = playersReducer(initialState, action);
    expect(state.players[0].sanctuaries).toHaveLength(0);
  });

  it('should reset all scores but keep player names', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player One',
          regions: { 1: 10, 2: 20, 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [{ id: 's1-1', value: 30 }],
        },
      ],
      winningPlayerIds: [],
    };
    const action = { type: 'RESET_ALL' as const };
    const state = playersReducer(initialState, action);
    expect(state.players[0].name).toBe('Player One');
    expect(state.players[0].regions[1]).toBe('');
    expect(state.players[0].regions[2]).toBe('');
    expect(state.players[0].sanctuaries[0].value).toBe('');
  });

  it('should set multiple winners if scores are tied', () => {
    const initialState: State = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          regions: { 1: 50, 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
        {
          id: 2,
          name: 'Player 2',
          regions: { 1: 50, 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
        {
          id: 3,
          name: 'Player 3',
          regions: { 1: 30, 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
          sanctuaries: [],
        },
      ],
      winningPlayerIds: [],
    };
    const action = {
      type: 'SET_WINNER' as const,
      payload: { winnerIds: [1, 2] },
    };
    const state = playersReducer(initialState, action);
    expect(state.winningPlayerIds).toEqual([1, 2]);
  });
});
