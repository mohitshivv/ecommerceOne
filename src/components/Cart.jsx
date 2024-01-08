import React, { useContext } from 'react';
import { userContext } from '../context/UserContext';


export default function Cart() {

  const {isLoggedIn} = useContext(userContext);

  return (
    <div>
      cart page - {isLoggedIn? 'logged in': 'logged out'}
    </div>
  )
}
