import { ScouterDataAggregations } from 'requests';
import camelToSpaced from '../../../lib/camelCaseConvert';

function StatRow({
    teams,
    stat,
    data,
}: {
    teams: (number | undefined)[];
    stat: Exclude<keyof ScouterDataAggregations, '_id'>;
    data: ScouterDataAggregations[] | undefined;
}) {
    const datapoints = teams.map(
        name => data?.find(dataName => name === dataName.accuracy)?.[stat]
    );
    return (
        <tr>
            <th className=' border-4 border-slate-700 px-16 py-2'>
                {camelToSpaced(stat)}
            </th>
            {datapoints.map((dataNumbers, columnIndex) => (
                <td
                    className={`${dataNumbers === 0 ? 'bg-red-600' : columnIndex % 2 === 0 ? '' : 'bg-white/10'} w-16 overflow-auto border-4 border-slate-700 text-center`}>
                    {dataNumbers && Math.round(dataNumbers * 10) / 10}
                </td>
            ))}
        </tr>
    );
}



export { StatRow };
