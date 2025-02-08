import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const data = [
  { name: 'Coral', Tier1: 4, Tier2: 5, Tier3:6, Tier4:7},
  { name: 'Algae', Processor: 5, Net: 6, Remove: 7},
  {name: 'Fouls', InsideRobot: 1, ProtectedZone: 2, Pinning: 3, MultiplePiece: 5, CageFoul: 4, Other: 6},
];


const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
        <p className="font-bold">{payload[0].payload.name}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-gray-700">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarChartWIP: React.FC = () => {
  return (
    
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="Tier1" stackId='a' fill="#9C16FF" />
        <Bar dataKey="Tier2" stackId='a' fill="#82ca9d" />
        <Bar dataKey="Tier3" stackId='a' fill="#c73260" />
        <Bar dataKey="Tier4" stackId='a' fill="#FFA343" />
        <Bar dataKey="Processor" stackId='a' fill="#82ca9d" />
        <Bar dataKey="Net" stackId='a' fill="#c73260" />
        <Bar dataKey="Remove" stackId='a' fill="#9C16FF" />
        <Bar dataKey="InsideRobot" stackId='a' fill="#FFFF72" />
        <Bar dataKey="Pinning" stackId='a' fill="#FF00FF" />
        <Bar dataKey="CageFoul" stackId='a' fill="#FFA343" />
        <Bar dataKey="ProtectedZone" stackId='a' fill="#82ca9d" />
        <Bar dataKey="MultiplePiece" stackId='a' fill="#c73260" />
        <Bar dataKey="Other" stackId='a' fill="#9C16FF" />
      </BarChart>
    </ResponsiveContainer>
    
  );
};

export default BarChartWIP;
