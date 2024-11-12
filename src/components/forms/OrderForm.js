import React from "react";

export default function OrderForm(prop) {
  const { orderData, setOrderData } = prop;

  function onChangeHandler(event) {
    if (event.target.id === "postalCode") {
      setOrderData({
        ...orderData,
        [event.target.id]: Number(event.target.value),
      });
    } else {
      setOrderData({
        ...orderData,
        [event.target.id]: event.target.value,
      });
    }
  }
  return (
    <div className="md:col-span-2">
      <form>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Street address"
              id="address"
              onChange={onChangeHandler}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-pink-500 outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              id="city"
              onChange={onChangeHandler}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-pink-500 outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              id="state"
              onChange={onChangeHandler}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-pink-500 outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Zip Code"
              id="postalCode"
              onChange={onChangeHandler}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-pink-500 outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
