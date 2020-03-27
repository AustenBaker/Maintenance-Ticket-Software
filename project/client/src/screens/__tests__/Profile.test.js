import React from 'react';
import { render } from '@testing-library/react';
import Profile from '../Profile';

test('renders logout link', () => {
  const { getByText } = render(<Profile />);
  const linkElement = getByText(/Logout/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders edit link', () => {
    const { getByText } = render(<Profile />);
    const linkElement = getByText(/Edit/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders deactivate account link', () => {
    const { getByText } = render(<Profile />);
    const linkElement = getByText(/Deactivate Account/i);
    expect(linkElement).toBeInTheDocument();
});

test('', () => {
});
