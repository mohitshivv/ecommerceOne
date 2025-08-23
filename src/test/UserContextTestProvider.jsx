import React from 'react';
import { userContext } from '../context/UserContext'; // adjust path if different

export default function UserContextTestProvider({ children, value }) {
const defaultValue = { isLoggedIn: false };
return (
<userContext.Provider value={{ ...defaultValue, ...(value || {}) }}>
{children}
</userContext.Provider>
);
}