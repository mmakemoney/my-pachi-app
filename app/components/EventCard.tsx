import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, description }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{date}</p>
      <p className="text-gray-600 mb-2">{location}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default EventCard;
