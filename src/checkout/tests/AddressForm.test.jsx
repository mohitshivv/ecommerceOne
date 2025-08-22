import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import AddressForm from '../AddressForm';

test('requires basic fields and continues to payment', () => {
  renderWithProviders(<AddressForm />, { route: '/checkout/address' });

  fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));
  expect(screen.getByText(/Required/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '9876543210' } });
  fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: '560001' } });
  fireEvent.change(screen.getByLabelText(/Address Line 1/i), { target: { value: '123 Street' } });
  fireEvent.change(screen.getByLabelText(/^City$/i), { target: { value: 'Bengaluru' } });
  fireEvent.change(screen.getByLabelText(/^State$/i), { target: { value: 'Karnataka' } });

  fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));
  expect(window.location.pathname).toBe('/checkout/payment');
});
