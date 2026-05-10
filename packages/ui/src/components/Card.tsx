import React from 'react';

export const Card = ({ title, children }: any) => (
  <div className="p-4 border rounded shadow-sm bg-white">
    {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
    {children}
  </div>
);
