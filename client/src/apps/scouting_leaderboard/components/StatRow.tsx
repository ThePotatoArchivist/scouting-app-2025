import { ScouterData } from 'requests';

function StatRow({
    scouter,
}: {
    scouter: ScouterData;
}) {
   
    return (
        <tr>
            {/* <th className=' border-4 border-slate-700 px-16 py-2'>
                {camelToSpaced(stat)}
            </th> */}
           
                <td
                    className={`w-16 overflow-auto border-4 border-slate-700 text-center`}>
                    {scouter && scouter.scouterName}
                </td>
            
                <td
                    className={`w-16 overflow-auto border-4 border-slate-700 text-center`}>
                    {scouter && scouter.accuracy}
                </td>
        </tr>
    );
}



export { StatRow };
