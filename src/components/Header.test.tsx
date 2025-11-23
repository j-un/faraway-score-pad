import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders the header title', () => {
    render(<Header onReset={() => {}} />);
    expect(screen.getByText('Faraway Score Pad')).toBeInTheDocument();
  });

  it('calls the onReset function when the reset button is clicked', () => {
    const handleReset = vi.fn();
    render(<Header onReset={handleReset} />);

    const resetButton = screen.getByRole('button', { name: /reset scores/i });
    fireEvent.click(resetButton);

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
