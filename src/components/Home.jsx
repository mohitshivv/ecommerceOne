import React, { useContext, useEffect, useState } from 'react';
import HomeShimmer from '../shimmerUI/HomeShimmer';
import ShowProduct from './ShowProduct';
import { REACT_APP_PRODUCTS_API } from '../utils';
import { userContext } from '../context/UserContext';

export default function Home() {

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {setIsLoggedIn} = useContext(userContext);


  useEffect(() => {

    const fetchData = () =>{

      fetch(REACT_APP_PRODUCTS_API)
      .then(res => res.json())
      .then(result => {
        console.log('result', result)
        setData(result);
        setFilterData(result);
      })
      .catch(err => {
        console.log('error in fetching all products: ', err);
        alert('Some API error, Try after some time.')
      })
    }
    fetchData();

    setIsLoggedIn(localStorage.getItem('login'));

  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the search term to the parent component or perform the search logic here
    console.log(searchTerm)
    const filteredProducts = data.filter((product) =>
      (product.title.toLowerCase()).includes(searchTerm.toLowerCase())
    );

    console.log(filteredProducts);
    setFilterData(filteredProducts);
    
  };

  if(data.length == 0){
    return <HomeShimmer/>
  }


  return (
    <div className='my-10'>


      <form className="mb-14 flex justify-center " onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-64 mr-2 "
          />
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
            Search
          </button>
        </div>
      </form>
      {filterData && filterData.length == 0 ? <h1>No data found.</h1> : 

      <div className="container flex flex-wrap justify-between mx-auto">

        {filterData.map((currdata, index) => (
          <ShowProduct data={currdata} key={currdata.id} />
        ))}
      </div>
}
    </div>
  )
}
