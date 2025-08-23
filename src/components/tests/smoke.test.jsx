import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import PolicyStrip from '../PolicyStrip';

test('renders policy strip text', () => {
renderWithProviders(<PolicyStrip />);
// Allow multiple matches and assert at least one exists
const matches = screen.getAllByText(/what we believe|free returns|secure payments/i);
expect(matches.length).toBeGreaterThan(0);
});