import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Cart from '../Cart';
import Store from '../../redux/Store';
import { addToCart } from '../../redux/cartSlice';

function seedCart() {
  Store.dispatch(addToCart({ id: 1, title: 'Item', price: 10, image: '', qty: 1, category: 'electronics' }));
}

test('updates quantity and subtotal', () => {
  seedCart();
  renderWithProviders(<Cart />);

  // Subtotal starts at $10.00
  expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();

  // Increase
  fireEvent.click(screen.getByTitle(/Increase/i));
  expect(screen.getByText(/\$20\.00/)).toBeInTheDocument();

  // Decrease
  fireEvent.click(screen.getByTitle(/Decrease/i));
  expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();
});
