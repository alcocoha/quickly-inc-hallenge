import { render, screen, fireEvent } from '@testing-library/react';
import { CustomButton } from '../CustomButton';

test('renders component', () => {
  render(<CustomButton title="foo" />);
  expect(screen.getByText(/foo/i)).toBeInTheDocument();
  const button = screen.getByText(/foo/i);
  fireEvent.click(button);
});
