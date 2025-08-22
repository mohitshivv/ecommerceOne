import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import ProductCard from '../ProductCard';
import Store from '../../redux/Store';

const product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'https://example.com/img.png',
  rating: { rate: 4.2, count: 120 },
  category: 'electronics'
};

test('renders product info and adds to cart', () => {
  renderWithProviders(<ProductCard product={product} />);

  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();

  const addBtn = screen.getByRole('button', { name: /add to cart/i });
  fireEvent.click(addBtn);

  // Optionally assert store state changed:
  const state = Store.getState();
  expect(state.cart.items.find(i => i.id === product.id)).toBeTruthy();
});
