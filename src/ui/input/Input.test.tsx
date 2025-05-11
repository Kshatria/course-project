import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, type InputProps } from './Input';

// Мокаем иконки, так как они не критичны для тестирования
jest.mock('react-icons/fi', () => ({
  FiEye: () => <span>FiEye</span>,
  FiEyeOff: () => <span>FiEyeOff</span>,
}));

describe('Input Component', () => {
  const defaultProps: InputProps = {
    type: 'text',
    value: '',
    onChange: jest.fn(),
    placeholder: 'Enter text',
  };

  // Базовые snapshot-тесты
  it('renders correctly with minimal props', () => {
    const { asFragment } = render(<Input {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with label', () => {
    const { asFragment } = render(<Input {...defaultProps} label="Test Label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with error', () => {
    const { asFragment } = render(<Input {...defaultProps} error="Test error" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders password input correctly', () => {
    const { asFragment } = render(<Input {...defaultProps} type="password" />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Тесты функциональности
  it('displays label when provided', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Input {...defaultProps} error="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Тесты для password input
  describe('Password Input', () => {
    it('shows password toggle button', () => {
      render(<Input {...defaultProps} type="password" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('toggles password visibility', async () => {
      render(<Input {...defaultProps} type="password" />);
      const button = screen.getByRole('button');

      // Находим input по placeholder или другому атрибуту
      const input = screen.getByPlaceholderText('Enter text');

      // По умолчанию пароль скрыт
      expect(input).toHaveAttribute('type', 'password');
      expect(screen.getByText('FiEye')).toBeInTheDocument();

      // Клик для показа пароля
      await userEvent.click(button);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByText('FiEyeOff')).toBeInTheDocument();

      // Клик для скрытия пароля
      await userEvent.click(button);
      expect(input).toHaveAttribute('type', 'password');
      expect(screen.getByText('FiEye')).toBeInTheDocument();
    });

    it('has proper aria-labels for toggle button', () => {
      render(<Input {...defaultProps} type="password" />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-label', 'Show password');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-label', 'Hide password');
    });
  });

  // Тесты для разных типов input
  describe('Input Types', () => {
    it('renders text input by default', () => {
      render(<Input {...defaultProps} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders email input correctly', () => {
      render(<Input {...defaultProps} type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });
  });
});
