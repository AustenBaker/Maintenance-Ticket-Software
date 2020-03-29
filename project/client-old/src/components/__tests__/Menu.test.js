import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import Menu from '../Menu';

let container = null;
const pages = [
  "Home",
  "New Ticket",
  "Profile",
  "Login"
];
beforeEach(() => {
  // set up DOM element as render target before each test
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // tear down DOM element after each test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

test('renders home link', () => {
  const { getByTitle } = render(<Menu id="Navigation" buttons={pages}/>);
  const linkElement = getByTitle(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders profile link', () => {
  const { getByTitle } = render(<Menu id="Navigation" buttons={pages}/>);
  const linkElement = getByTitle(/Profile/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders new ticket link', () => {
  const { getByTitle } = render(<Menu id="Navigation" buttons={pages}/>);
  const linkElement = getByTitle(/New Ticket/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login link', () => {
  const { getByTitle } = render(<Menu id="Navigation" buttons={pages}/>);
  const linkElement = getByTitle(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

/**
test('', () => {

}); */
