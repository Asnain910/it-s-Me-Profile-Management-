import React from 'react';

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
    <input
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      {...props}
    />
  </div>
);

export default Input;
