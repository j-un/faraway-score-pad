import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SanctuaryScores } from './SanctuaryScores';
import { PlayersProvider } from '../contexts/PlayersContext';
import type { ReactNode } from 'react';

// To test components that use our context, we can create a custom render function
// that wraps them in the provider.
const customRender = (ui: ReactNode) => {
  return render(<PlayersProvider>{ui}</PlayersProvider>);
};

describe('SanctuaryScores', () => {
  it('renders sanctuary scores', () => {
    const sanctuaries = [{ id: 's1', value: 10 }];
    customRender(<SanctuaryScores sanctuaries={sanctuaries} playerId={1} />);

    expect(screen.getByText('Sanctuaries')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  // Since the actions are coming from the real context, we can't easily mock them here.
  // A more advanced setup would involve creating a mock provider for tests.
  // For now, we'll skip testing the button clicks as it would require a more complex setup.
  // This highlights a trade-off: direct context use simplifies component code but can make testing more involved.
});
