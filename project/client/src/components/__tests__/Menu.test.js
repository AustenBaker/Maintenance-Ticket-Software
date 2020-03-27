import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../Menu';

test('renders login link', () => {
  const { getByText } = render(<Menu />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders profile link', () => {
    const { getByText } = render(<Menu />);
    const linkElement = getByText(/Profile/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders new ticket link', () => {
    const { getByText } = render(<Menu />);
    const linkElement = getByText(/New Ticket/i);
    expect(linkElement).toBeInTheDocument();
});

test('', () => {

});
