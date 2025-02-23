import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { MatchIndividualDataAggregations, SuperFoulAggregationsData } from 'requests';



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

// :3
export interface MatchAndSuper extends Pick<MatchIndividualDataAggregations, 'totalL1' | 'totalL2' | 'totalL3' | 'totalL4' | 'totalProcessor' | 'totalNet' | 'totalRemoved' | '_id' >, SuperFoulAggregationsData {}

const BarChartWIP: React.FC<{ data: MatchAndSuper[]; teamNumber: number }> = ({ data, teamNumber }) => { 

  // const bingus : MatchIndividualDataAggregations[] = [];
  // const bongus : SuperFoulAggregationsData[] = [];


  // const filterData = (teamNumber: number, matchNumber: number) => {
  //   return bongus.filter(item => 
  //     item._id.teamNumber === teamNumber && item._id.matchNumber === matchNumber
  //   );
  // }

  // const getChartData = (teamNumber: number, matchNumber: number) => {
  //   const filteredData = filterData(teamNumber, matchNumber);
  //   return filteredData.map(item => ({
  //     name: `${item._id.matchNumber}`,
  //     insideRobot: item.totalInsideRobot,
  //     protectedZone: item.totalProtectedZone,
  //     pinning: item.totalPinning,
  //     multiplePieces: item.totalMultiplePieces,
  //     cageFoul: item.totalCageFoul,
  //     other: item.totalOther
  //   }));
  // // }
  //const chartData = getChartData(teamNumber, matchNumber);


//   //grabs data for a specific team
   const teamData = data.filter(d => d._id.teamNumber === teamNumber);

 // Transform data for charts to have nicer labels (when tooltip works), d. means the item in the teamdata, match is for the x-axis (i pray this works w/ data :sob:)
  const chartData = teamData.map(d => ({
      match: `Match ${d._id.matchNumber}`, 
      Processor: d.totalProcessor,
      Net: d.totalNet,
      Removed: d.totalRemoved,
      InsideRobot: d.totalInsideRobot*-1,
      ProtectedZone: d.totalProtectedZone*-1,
      Pinning: d.totalPinning*-1,
      MultiplePieces: d.totalMultiplePieces*-1,
      CageFoul: d.totalCageFoul*-1,
      Other: d.totalOther*-1,
  }));

  
 
  return (
    
    <ResponsiveContainer width="100%" height={300}>
      <BarChart stackOffset='sign' data={chartData}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="match" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="Processor" stackId='a' fill="#82ca9d" />
        <Bar dataKey="Net" stackId='a' fill="#c73260" />
        <Bar dataKey="Removed" stackId='a' fill="#9C16FF" />
      </BarChart>
    </ResponsiveContainer>
    
  );
};

export default BarChartWIP;
