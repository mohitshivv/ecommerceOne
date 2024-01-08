import React, { useEffect, useState } from 'react';
import HomeShimmer from '../shimmerUI/HomeShimmer';
import ShowProduct from './ShowProduct';
import { REACT_APP_PRODUCTS_API } from '../utils';

export default function Home() {

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    fetch(REACT_APP_PRODUCTS_API)
      .then(res => res.json())
      .then(result => {
        console.log('result', result)
        setData(result);
        setFilterData(result);
      })
      .catch(err => {
        console.log('error in fetching all products: ', err);
      })
  }, []);



  return filterData && filterData.length == 0 ? <HomeShimmer /> : (
    <div className='my-10'>

      <input type="text" name="" id="" />


      <div className="container flex flex-wrap justify-between mx-auto">

        {filterData.map((currdata, index) => (
          <ShowProduct data={currdata} key={currdata.id} />
        ))}
      </div>
    </div>
  )
}
