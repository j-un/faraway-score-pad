import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, afterAll } from 'vitest';
import {
  PlayersProvider,
  usePlayersState,
  usePlayersActions,
} from './PlayersContext';
import type { ReactNode } from 'react';

// Suppress console.error output for the intentional error test
const mockError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('PlayersContext', () => {
  it('throws an error when usePlayersState is used outside of a PlayersProvider', () => {
    const TestComponent = () => {
      usePlayersState();
      return null;
    };
    expect(() => render(<TestComponent />)).toThrow(
      'usePlayersState must be used within a PlayersProvider'
    );
  });

  it('throws an error when usePlayersActions is used outside of a PlayersProvider', () => {
    const TestComponent = () => {
      usePlayersActions();
      return null;
    };
    expect(() => render(<TestComponent />)).toThrow(
      'usePlayersActions must be used within a PlayersProvider'
    );
  });

  it('provides state and actions to child components', () => {
    const TestComponent = () => {
      const { players } = usePlayersState();
      const { addPlayer } = usePlayersActions();

      return (
        <div>
          <span>Player Count: {players.length}</span>
          <button onClick={addPlayer}>Add Player</button>
        </div>
      );
    };

    render(
      <PlayersProvider>
        <TestComponent />
      </PlayersProvider>
    );

    // Check initial state
    expect(screen.getByText('Player Count: 1')).toBeInTheDocument();

    // Check if action works
    const button = screen.getByRole('button', { name: 'Add Player' });
    act(() => {
      button.click();
    });

    expect(screen.getByText('Player Count: 2')).toBeInTheDocument();
  });
});

// Restore console.error
afterAll(() => {
  mockError.mockRestore();
});
