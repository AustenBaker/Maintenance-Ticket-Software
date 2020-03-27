import React from 'react';
import { render } from '@testing-library/react';
import User from '../User';
import { createRenderer } from 'react-dom/test-utils';

describe('<User />', () => {
    it('has ? children', () => {
        const tree = createRenderer(
            <User
                fname="John"
                lname="Doe"
                email="john.doe@gmail.com"
                phone="123-456-7890"
                entry="Accompanied"
                contact="Text"
                unit= { "203" }
                createTicket={() => Console.log('User.createTicket() not implemented')}
                editProfile={() => Console.log('User.editProfile() not implemented')}
                viewTicket={() => Console.log('User.viewTicket() not implemented')}
                notify={() => Console.log('User.notify() not implemented')}
                assignUnit={() => Console.log('User.assignUnit() not implemented')}
                
            />,
        )
        .toJSON();
        expect(some_value).toBe();
    });
});

test('renders User first name', () => {
  const { getByText } = render(<User />);
  const linkElement = getByText(/John/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders User last name', () => {
    const { getByText } = render(<User />);
    const linkElement = getByText(/Doe/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders User email', () => {
    const { getByText } = render(<User />);
    const linkElement = getByText(/john.doe@gmail.com/i);
    expect(linkElement).toBeInTheDocument();
});
  
test('renders User phone', () => {
    const { getByText } = render(<User />);
    const linkElement = getByText(/123-456-7890/i);
    expect(linkElement).toBeInTheDocument();
});
  
test('renders User entry', () => {
    const { getByText } = render(<User />);
    const linkElement = getByText(/Accompanied/i);
    expect(linkElement).toBeInTheDocument();
});
  
test('renders User contact', () => {
    const { getByText } = render(<User />);
    const linkElement = getByText(/Text/i);
    expect(linkElement).toBeInTheDocument();
});
  
test('renders User unit', () => {
    const { getByText } = render(<User />);
    const linkElement = getByText(/203/i);
    expect(linkElement).toBeInTheDocument();
});

test('', () => {

});
