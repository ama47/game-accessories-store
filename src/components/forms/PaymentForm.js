import React from "react";

export default function PaymentForm(prop) {
  const { paymentData, setPaymentData } = prop;

  function handleSelectChange(event) {
    setPaymentData({
      ...paymentData,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <form class="max-w-sm mx-auto">
      <label
        for="payments"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="paymentMethod"
        onChange={handleSelectChange}
        className="bg-white border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
      >
        <option selected>Choose a payment method</option>
        <option value="Visa">Visa</option>
        <option value="Master Card">Master Card</option>
        <option value="PayPal">PayPal</option>
      </select>
    </form>
  );
}
