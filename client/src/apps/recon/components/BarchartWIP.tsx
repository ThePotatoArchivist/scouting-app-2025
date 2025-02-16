import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { MatchDataAggregations, SuperDataFoulAggregationsDataDataDataDataData } from 'requests';



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


interface MatchAndSuper {
//  _id: any;

 matchData: MatchDataAggregations[];
 superData: SuperDataFoulAggregationsDataDataDataDataData[]
}


const BarChartWIP: React.FC<{ data: MatchAndSuper[]; teamNumber: number }> = ({ data, teamNumber }) => {

  //grabs data for a specific team
  const teamData = data.filter(d => d._id.teamNumber === teamNumber);

  // Transform data for charts to have nicer labels (when tooltip works), d. means the item in the teamdata, match is for the x-axis (i pray this works w/ data :sob:)
  const chartData = teamData.map(d => ({
      match: `Match ${d._id.matchnumber}`, 
      Coral: d.matchData.totalCoral,
      Processor: d.matchData.totalProcessor,
      Net: d.matchData.totalNet,
      Removed: d.matchData.totalRemoved,
      Algae: d.matchData.totalAlgae,
      Fouls: d.superData.maxFouls
  }));


  return (
    
    <ResponsiveContainer width="100%" height={300}>
      <BarChart stackOffset='sign' data={chartData}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="match" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="Coral" stackId='a' fill="#FFA343" />
        <Bar dataKey="Processor" stackId='a' fill="#82ca9d" />
        <Bar dataKey="Net" stackId='a' fill="#c73260" />
        <Bar dataKey="Removed" stackId='a' fill="#9C16FF" />
      </BarChart>
    </ResponsiveContainer>
    
  );
};

export default BarChartWIP;
