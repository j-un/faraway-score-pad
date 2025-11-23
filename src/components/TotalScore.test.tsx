import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TotalScore } from './TotalScore';

describe('TotalScore', () => {
  it('renders the total score', () => {
    render(<TotalScore totalScore={123} isWinner={false} />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('applies winner styles when isWinner is true', () => {
    const { container } = render(
      <TotalScore totalScore={123} isWinner={true} />
    );
    // Check if the specific background color class for winners is applied.
    // Note: The exact class name depends on your CSS/Tailwind setup.
    expect(container.firstChild).toHaveClass('bg-orange-500');
  });

  it('applies default styles when isWinner is false', () => {
    const { container } = render(
      <TotalScore totalScore={123} isWinner={false} />
    );
    // Check if the default background color class is applied.
    expect(container.firstChild).toHaveClass('bg-orange-600');
  });
});
