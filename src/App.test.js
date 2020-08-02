import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Choose Airport dropdown', () => {
  const { getByText } = render(<App />);
  const btn = getByText(/Choose Airport/i);
  expect(btn).toBeInTheDocument();
});
