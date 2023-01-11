import { render, screen } from '@testing-library/react';
import { CustomCard } from '../CustomCard';

test('renders component', () => {
  render(
    <CustomCard title="foo">
      <h1>hello world!</h1>
    </CustomCard>
  );
  expect(screen.getByText(/foo/i)).toBeInTheDocument();
  expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
});
