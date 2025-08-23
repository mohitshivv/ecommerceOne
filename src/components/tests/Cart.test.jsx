import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Cart from '../Cart';
import Store from '../../redux/Store';
import { addToCart } from '../../redux/cartSlice';

function resetStore() {
// Soft reset: if your cartSlice has a clearCart action, prefer dispatching it.
// Otherwise, re-importing a fresh Store isn’t trivial in Vitest without module isolation.
// For this suite, we’ll ensure each test seeds exactly what it needs.
}

function seedCartOneItem() {
Store.dispatch(
addToCart({
id: 1,
title: 'Item',
price: 10,
image: '',
qty: 1,
category: 'electronics',
})
);
}

describe('Cart totals', () => {
beforeEach(() => {
resetStore();
});

test('updates quantity and subtotal', () => {
seedCartOneItem();
renderWithProviders(<Cart />);

// Scope to the Order Summary box to avoid matching the line-item total
const summary = screen.getByRole('heading', { name: /Order Summary/i }).parentElement;

// Subtotal starts at $10.00
expect(within(summary).getByText(/\$10\.00/)).toBeInTheDocument();

// Increase quantity (assumes the first row buttons change the only item)
fireEvent.click(screen.getByTitle(/Increase/i));
expect(within(summary).getByText(/\$20\.00/)).toBeInTheDocument();

// Decrease back to 1
fireEvent.click(screen.getByTitle(/Decrease/i));
expect(within(summary).getByText(/\$10\.00/)).toBeInTheDocument();
});
});