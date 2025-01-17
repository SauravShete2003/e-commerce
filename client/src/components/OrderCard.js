import React from 'react'

function OrderCard({ order }) {
    const { _id, status, products} = order;
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all relative duration-300 m-4">
      <div className="flex items-center justify-between mb rounded-lg">
        <span className="text-md font-semibold text-blue-500 ">Order ID: {_id}</span>
        <p>{products.map((product)=>product.productId.name).join(", ")}</p>
        <p className='bg-blue-500 p-1 rounded-3xl absolute top-1 right-1 px-4 text-md font-semibold'> {status}</p>
      </div>
    </div>
  )
}

export default OrderCard;
