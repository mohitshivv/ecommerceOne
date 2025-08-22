import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Header from '../Header';

test('renders header title', () => {
renderWithProviders(<Header />);
expect(screen.getByText(/SwiftShop/i)).toBeInTheDocument();
});