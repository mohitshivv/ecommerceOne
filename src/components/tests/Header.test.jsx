import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Header from '../Header';

test('renders cart and wishlist icons and opens profile menu', () => {
  renderWithProviders(<Header />);

  // Icons present
  expect(screen.getByTitle(/Shopping Cart/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Wishlist/i)).toBeInTheDocument();
  expect(screen.getByTitle(/User Profile/i)).toBeInTheDocument();

  // Open dropdown
  fireEvent.click(screen.getByTitle(/User Profile/i));
  expect(screen.getByText(/Login|My Profile/i)).toBeInTheDocument();
});
