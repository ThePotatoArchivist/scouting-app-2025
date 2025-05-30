import camelToSpaced from '../../../lib/camelCaseConvert';
import { AnalysisEntry, StatSummaryData } from '../data';
import { TeamData } from 'requests';

const empty1x1Base64: string =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

function StatSummary({
    table,
    data,
    teamInfoJson,
}: {
    table: StatSummaryData;
    data: AnalysisEntry[];
    teamInfoJson: TeamData;
}) {
    const entries = data.map<[number, number]>(e => [
        e.teamNumber,
        e[table.column] as number,
    ]);
    const sortedEntries = entries.sort((a, b) => a[1] - b[1]);

    const sortedEntryTeamNumbers = sortedEntries.map(entry =>
        entry[0].toString()
    );
    const sortedEntryDataPoints = sortedEntries.map(entry => entry[1]);

    // Create a list of the avatar data for each team based on the base64 images stored under the key 'avatar' in the team_info.json file
    const lowTeamNumber = sortedEntryTeamNumbers[0];
    const lowTeamAvatar = teamInfoJson[lowTeamNumber]?.avatar ?? empty1x1Base64;
    const lowDataPoint = sortedEntryDataPoints[0];

    const medianTeamNumber =
        sortedEntryTeamNumbers[Math.floor(sortedEntryTeamNumbers.length / 2)];
    const medianTeamAvatar =
        teamInfoJson[medianTeamNumber]?.avatar ?? empty1x1Base64;
    const medainDataPoint =
        sortedEntryDataPoints[Math.floor(sortedEntryDataPoints.length / 2)];

    const highTeamNumber =
        sortedEntryTeamNumbers[sortedEntryTeamNumbers.length - 1];
    const highTeamAvatar =
        teamInfoJson[highTeamNumber]?.avatar ?? empty1x1Base64;
    const highDataPoint =
        sortedEntryDataPoints[sortedEntryDataPoints.length - 1];

    return (
        <>
            <h1 className='text-3xl'>{camelToSpaced(table.column)}</h1>
            <p className='text-0.5xl text-gray-500'>{table.column}</p>

            <br />

            <div className='flex space-x-4'>
                <p>
                    Mean:{' '}
                    {(
                        sortedEntryDataPoints.reduce((a, b) => a + b, 0) /
                        sortedEntryDataPoints.length
                    ).toFixed(3)}
                </p>
                <p>
                    Standard Deviation:{' '}
                    {Math.sqrt(
                        sortedEntryDataPoints.reduce(
                            (a, b) =>
                                a +
                                (b -
                                    sortedEntryDataPoints.reduce(
                                        (a, b) => a + b,
                                        0
                                    ) /
                                        sortedEntryDataPoints.length) **
                                    2,
                            0
                        ) / sortedEntryDataPoints.length
                    ).toFixed(3)}
                </p>
            </div>

            <br />

            <div className='flex space-x-4'>
                <p>Low: {lowDataPoint}</p>
                <p>by </p>
                <img
                    src={`data:image/png;base64,${lowTeamAvatar}`}
                    max-width='32'
                    max-height='32'
                />
                <p>Team {lowTeamNumber}</p>
            </div>

            <div className='flex space-x-4'>
                <p>Median: {medainDataPoint}</p>
                <p>by </p>
                <img
                    src={`data:image/png;base64,${medianTeamAvatar}`}
                    max-width='32'
                    max-height='32'
                />
                <p>Team {medianTeamNumber}</p>
            </div>

            <div className='flex space-x-4'>
                <p>High: {highDataPoint}</p>
                <p>by </p>
                <img
                    src={`data:image/png;base64,${highTeamAvatar}`}
                    max-width='32'
                    max-height='32'
                />
                <p>Team {highTeamNumber}</p>
            </div>
        </>
    );
}

export default StatSummary;
