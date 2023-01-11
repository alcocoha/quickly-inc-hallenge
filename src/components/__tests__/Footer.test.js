import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

test('renders component', () => {
  render(<Footer />);
  expect(screen.getByText(/created by jorge hurtado/i)).toBeInTheDocument();
});
