import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactMic from './ReactMic';

test('renders learn react link', () => {
  //const { getByText } = render(<App />);
  const { getByText } = render(<ReactMic />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
