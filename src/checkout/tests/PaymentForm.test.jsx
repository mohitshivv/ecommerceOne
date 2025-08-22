import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import PaymentForm from '../PaymentForm';
import Store from '../../redux/Store';
import { saveAddress } from '../../redux/checkoutSlice';

test('places order and navigates to success', () => {
  // Seed address so guard passes
  Store.dispatch(saveAddress({
    fullName: 'John Doe', phone: '9876543210', address1: 'A', city: 'B', state: 'C', zip: '560001', country: 'India'
  }));

  renderWithProviders(<PaymentForm />, { route: '/checkout/payment' });

  // Choose COD to avoid card fields
  fireEvent.click(screen.getByLabelText(/Cash on Delivery/i));

  fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));
  expect(window.location.pathname).toBe('/checkout/success');
});
