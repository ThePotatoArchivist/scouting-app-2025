import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { MatchDataAggregations, SuperDataAggregations } from 'requests';


const matchStats: Exclude<keyof MatchDataAggregations, '_id'>[] = [
  'totalL1' ,
  'totalL2',
  'totalL3',
  'totalL4' ,
  'totalCoral',
  'totalProcessor' ,
  'totalNet' ,
  'totalRemoved' ,
  'totalAlgae',
  'coralDrop1',
  'coralDrop2',
  'coralDrop3',
  'coralDrop4',
  'coralDrop5',
  'coralDrop6' 
];
const superStats: Exclude<keyof SuperDataAggregations, '_id'>[] = [
  'maxFouls',
];


const data = [
  { name: 'Match6576576', Level1: 4, Level2: 5, Level3:6, Level4:7, Processor: 5, Net: 6, Remove: 7, InsideRobot: -1, ProtectedZone: -2, Pinning: -3, MultiplePiece: -5, CageFoul: -4, Other: -6},
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

const teamNumber = 1 //should be defined outta this file, this is placeholder (it tells which team to show)

const chartData = matchStats


const BarChartWIP: React.FC = () => {
  return (
    
    <ResponsiveContainer width="100%" height={300}>
      <BarChart stackOffset='sign' data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="Level1" stackId='a' fill="#9C16FF" />
        <Bar dataKey="Level2" stackId='a' fill="#82ca9d" />
        <Bar dataKey="Level3" stackId='a' fill="#c73260" />
        <Bar dataKey="Level4" stackId='a' fill="#FFA343" />
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
