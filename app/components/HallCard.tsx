import React from 'react';

interface HallCardProps {
  name: string;
  address: string;
  machines: number;
  rating: number;
}

const HallCard: React.FC<HallCardProps> = ({ name, address, machines, rating }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">{address}</p>
      <div className="flex justify-between text-gray-600">
        <p>台数: {machines}</p>
        <p>評価: {'★'.repeat(rating)}</p>
      </div>
    </div>
  );
};

export default HallCard;
