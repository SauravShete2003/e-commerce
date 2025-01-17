import React from "react";

const getReadableTimeStamps = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
};

function OrderCard({ order }) {
  const { _id, status, products, createdAt, deliveryAddress } = order;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl m-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600">
          <span className="text-blue-500">Order ID:</span> {_id}
        </p>
        <p className="text-sm font-semibold text-gray-600">
          <span className="text-blue-500">Order On:</span> {getReadableTimeStamps(createdAt)}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-bold text-gray-800">
          Products:{" "}
          <span className="text-gray-600">
            {products.map((product) => product.productId.name).join(", ")}
          </span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-md font-semibold text-gray-800">
          Total Price:{" "}
          <span className="text-green-500">
            ₹{products.reduce((acc, product) => acc + product.price, 0).toFixed(2)}
          </span>
        </p>
      </div>

      <div className="mb-6">
        <p className="text-md font-semibold text-gray-800">
          Address:{" "}
          <span className="text-gray-600">{deliveryAddress}</span>
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <p
          className={`px-4 py-1 rounded-full text-sm font-bold ${
            status === "Delivered"
              ? "bg-green-500 text-white"
              : status === "Pending"
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

export default OrderCard;
