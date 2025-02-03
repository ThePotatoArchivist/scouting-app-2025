import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Coral', t1: 4, t2: 5, t3:6, t4:7},
  { name: 'Algae', proc: 5, net: 6, remove: 7},
];

const BarChartWIP: React.FC = () => {
  return (
    <div className="w-2/5 h-2/5 bg-gray-800 border-2 border-gray-800 rounded-lg p-4 ml-0">
      <div className="w-full h-full flex justify-center items-center">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Legend />
        <Bar dataKey="t1" stackId='a' fill="#8884d8" />
        <Bar dataKey="t2" stackId='a' fill="#82ca9d" />
        <Bar dataKey="t3" stackId='a' fill="#c73260" />
        <Bar dataKey="t4" stackId='a' fill="#c6dc30" />
        <Bar dataKey="proc" stackId='a' fill="#82ca9d" />
        <Bar dataKey="net" stackId='a' fill="#c73260" />
        <Bar dataKey="remove" stackId='a' fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartWIP;
