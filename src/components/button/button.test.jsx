import { test, expect } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import { Button } from './button';

test('renders button with icon', () => {
  render(<Button icon="search">Search</Button>);
  const buttonElement = screen.getByRole('button');
  const iconElement = screen.getByTestId('icon');
  expect(buttonElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
});

test('renders button without icon', () => {
  render(<Button>Submit</Button>);
  const buttonElement = screen.getByRole('button');
  const iconElement = screen.queryByTestId('icon');
  expect(buttonElement).toBeInTheDocument();
  expect(iconElement).toBeNull();
});