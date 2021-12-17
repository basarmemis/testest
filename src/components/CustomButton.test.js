import { render, screen } from '@testing-library/react';
import CustomButton from './CustomButton';

test('renders learn react link', () => {
  render(<CustomButton />);
  const buttonElement = screen.getByText(/SubmitAQ/i);
  expect(buttonElement).toBeInTheDocument();
});
