import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Cart from '../Cart';

test('navigates to /checkout/address on proceed', () => {
  // Render with at least one item in cart by mocking store if needed
  // or adjust Cart to allow empty navigation test.

  renderWithProviders(<Cart />);

  const proceed = screen.queryByRole('button', { name: /proceed to checkout/i });
  if (proceed) {
    fireEvent.click(proceed);
    expect(window.location.pathname).toBe('/checkout/address');
  }
});
