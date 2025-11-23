import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AddPlayerButton } from './AddPlayerButton';

describe('AddPlayerButton', () => {
  it('renders the button with text', () => {
    render(<AddPlayerButton onAddPlayer={() => {}} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('calls the onAddPlayer function when the button is clicked', () => {
    const handleAddPlayer = vi.fn();
    render(<AddPlayerButton onAddPlayer={handleAddPlayer} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleAddPlayer).toHaveBeenCalledTimes(1);
  });
});
