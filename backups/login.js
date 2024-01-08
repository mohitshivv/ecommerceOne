import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);


export default function UserContext({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);


  const login = (values) => {
    console.log('login called from context', values);

    console.log('all users from context', allUsers);

    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: "mor_2314",
        password: "83r5^_"
      })
    })
      .then(res => res.json())
      .then(json => console.log('login response',json))

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === values.email && allUsers[i].password === values.password) {
        console.log(allUsers[i]);
      }

    }

  }


  return (
    <div>

      <userContext.Provider value={{ isLoggedIn, currentUser, login, setAllUsers }}>
        {children}
      </userContext.Provider>

    </div>
  )
}
