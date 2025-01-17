import React from "react";

const getReadableTimeStamps = (date) => {
  const dateObj = new Date(date);
  return `
  ${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
};

function OrderCard({ order }) {
  const { _id, status, products, createdAt, deliveryAddress } = order;
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all relative duration-300 m-4">
      <p className="text-md font-semibold text-blue-500 ">
        Order ID: {_id} , Order On : {getReadableTimeStamps(createdAt)}
      </p>

      <p className="text-lg font-bold">
        {products.map((product) => product.productId.name).join(",")}
      </p>
      <p className="text-md font-semibold">
        Total Price: {products.reduce((acc, product) => acc + product.price, 0)}
      </p>
      <p className="text-md font-semibold">Address: {deliveryAddress}</p>

      <p className="bg-blue-500 rounded-3xl absolute top-2 right-2 px-4 p-1 text-md font-semibold">
        {" "}
        {status}
      </p>
    </div>
  );
}

export default OrderCard;
