import React from "react";

const RecentActivities = ({ activities = [] }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
      <ul className="space-y-3">
        {activities.length > 0 ? (
          activities.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b last:border-none pb-2"
            >
              <span>{item.activity}</span>
              <span className="text-gray-400 text-sm">{item.time}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-sm text-center">
            Tidak ada aktivitas terbaru.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivities;
