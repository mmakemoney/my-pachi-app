import React from 'react';

interface WriterCardProps {
  name: string;
  image: string;
  description: string;
  articles: number;
}

const WriterCard: React.FC<WriterCardProps> = ({ name, image, description, articles }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600">記事数: {articles}</p>
        </div>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default WriterCard;
