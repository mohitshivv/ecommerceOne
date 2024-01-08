import React, { useContext } from 'react';
import { userContext } from '../context/UserContext';

const Profile = () => {

    const user = {
        "address": {
            "geolocation": {
                "lat": "50.3467",
                "long": "-20.1310"
            },
            "city": "San Antonio",
            "street": "Hunters Creek Dr",
            "number": 6454,
            "zipcode": "98234-1734"
        },
        "id": 4,
        "email": "don@gmail.com",
        "username": "donero",
        "password": "ewedon",
        "name": {
            "firstname": "don",
            "lastname": "romer"
        },
        "phone": "1-765-789-6734",
        "__v": 0
    }

    
    const {logout} = useContext(userContext);
    const storageData = localStorage.getItem('currentUser');
    console.log('',storageData);
    if(storageData == 'null' || storageData == undefined){
        return(
            <h1>No SignIn user to go login</h1>
        )
    }
    const user2 = JSON.parse(atob(storageData));
    console.log(user2);
    

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 capitalize">{`${user.name.firstname} ${user.name.lastname}`}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p>{`${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p>{`Phone: ${user.phone}`}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Geolocation</h3>
                <p>{`Latitude: ${user.address.geolocation.lat}, Longitude: ${user.address.geolocation.long}`}</p>
            </div>

            <div className="flex justify-around">


                
                <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;



// import React, { useContext } from 'react'
// import { userContext } from '../context/UserContext'

// export default function Profile() {

//     const {logout} = useContext(userContext);
//   return (
//     <div>
//       currnet user profile


//       <button onClick={logout} className='border border-gray-600 p-5'>Logout</button>


//     </div>
//   )
// }
