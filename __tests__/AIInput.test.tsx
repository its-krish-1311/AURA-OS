import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AIInput from '@/components/dashboard/AIInput';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/os-core/ActionModalContext', () => ({
  useActionModal: () => ({ openModal: jest.fn() }),
}));

jest.mock('@/components/dashboard/DashboardContext', () => ({
  useDashboardContext: () => ({ 
    activeChatMode: 'normal',
    setActiveChatMode: jest.fn()
  }),
}));

describe('AIInput Component', () => {
  it('renders correctly', () => {
    render(<AIInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<AIInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello Aura' } });
    expect(input).toHaveValue('Hello Aura');
  });

  it('submits form correctly', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<AIInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello Aura' } });
    
    fireEvent.click(screen.getByRole('button', { name: /ask siya/i }));
    expect(mockPush).toHaveBeenCalledWith('/dashboard/chat?q=Hello%20Aura');
  });
});
