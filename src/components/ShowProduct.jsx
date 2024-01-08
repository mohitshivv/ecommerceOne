import React from 'react';
import { Link } from 'react-router-dom';

const ShowProduct = ({ data }) => {
    return (
        <div className="max-w-sm w-sm w-[325px] rounded overflow-hidden shadow-lg mb-5 mx-3 border border-gray-200 hover:scale-105 duration-150 hover:shadow-2xl ">


            <Link to={`/productdetails/${data.id}`}>

                <div className="w-full flex justify-center">


                    <img
                        className="w-full h-60 object-cover "
                        src={data.image}
                        alt={data.category}
                    />
                </div>
            </Link>
            <div className="px-6 py-2 ">
                <div className="font-bold text-xl ">{data.title}</div>
                <p className="text-gray-700 text-base">{data.category}</p>
                <div className="font-bold text-md ">$ {data.price}</div>
            </div>
            <div className="px-6 py-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {data.rating.rate} ⭐
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {data.rating.count} Rates
                </span>

            </div>
        </div>
    );
};

export default ShowProduct;
