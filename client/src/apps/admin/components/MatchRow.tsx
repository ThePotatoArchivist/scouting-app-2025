import { RobotPosition, SuperPosition } from 'requests';
import PositionCell from './PositionCell';

function MatchRow({
    matchNumber,
    scouters,
}: {
    matchNumber: string;
    scouters: Record<RobotPosition, { schedule: number; real: number[] }> &
        Record<SuperPosition, boolean>;
}) {
    return (
        <tr>
            <th>{matchNumber}</th>
          
        </tr>
    );
}

export default MatchRow;
