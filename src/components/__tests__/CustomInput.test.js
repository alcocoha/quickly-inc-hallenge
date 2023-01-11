import { render, screen } from '@testing-library/react';
import { CustomInput } from '../CustomInput';

test('renders component', () => {
  render(
    <CustomInput
      id="email"
      type="email"
      placeholder="Enter email"
      label="Email"
      onBlur={() => {}}
    />
  );
  expect(screen.getByText(/email/i)).toBeInTheDocument();
});
