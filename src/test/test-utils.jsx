import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Store from '../redux/Store';
import UserContextTestProvider from './UserContextTestProvider';

export function renderWithProviders(
ui,
{ route = '/', store = Store, userCtx = { isLoggedIn: false } } = {}
) {
window.history.pushState({}, 'Test page', route);
return render(
<Provider store={store}>
<MemoryRouter initialEntries={[route]}>
<UserContextTestProvider value={userCtx}>{ui}</UserContextTestProvider>
</MemoryRouter>
</Provider>
);
}