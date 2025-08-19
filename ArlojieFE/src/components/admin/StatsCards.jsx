import React from "react";

const StatsCards = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition"
        >
          <div className="text-3xl">{stat.icon}</div>
          <div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
