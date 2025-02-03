import {
    MatchDataAggregations,
    MatchSchedule,
    SuperDataAggregations,
} from 'requests';
import LinkButton from '../../components/LinkButton';
import { useFetchJson } from '../../lib/useFetch';
import { useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import NumberInput from '../../components/NumberInput';
import scheduleJson from '../../assets/matchSchedule.json';

import BarChartWIP from './components/BarchartWIP';

const schedule = scheduleJson as MatchSchedule;

const matchStats: Exclude<keyof MatchDataAggregations, '_id'>[] = [
    'averageTeleCoral',
    'averageTeleAlgaeProcessor',
    'averageAutoCoral',
    'averageAutoAlgaeProcessor',
    'averageAutoAlgaeRobotNet',
    'maxTeleCoral',
    'maxTeleAlgaeProcessor',
    'maxTeleAlgaeRobotNet',
    'maxAutoCoral',
    'maxAutoAlgaeProcessor',
    'maxAutoAlgaeRobotNet',
    'maxCoral',
    'maxAlgaeProcessor',
    'maxAlgaeRobotNet',
    'avgClimbRate'
];
const superStats: Exclude<keyof SuperDataAggregations, '_id'>[] = [
    'avgFouls',
    'maxFouls',
];

function ReconApp() {
    const [retrieveMatch, reloadRetrieveMatch] =
        useFetchJson<MatchDataAggregations[]>('/data/retrieve');
    const [retrieveSuper, reloadRetrieveSuper] = useFetchJson<
        SuperDataAggregations[]
    >('/data/retrieve/super');
    const [matchNumber, setMatchNumber] = useState<number>();
    const [teams, setTeams] = useState<(number | undefined)[]>([undefined]);

    useEffect(() => {
        if (!matchNumber) return;
        const match = schedule?.[matchNumber];
        if (!match) return;
        setTeams([
            match.red_1,
            match.red_2,
            match.red_3,
            match.blue_1,
            match.blue_2,
            match.blue_3,
        ]);
    }, [matchNumber]);

    return (
       <div className='bg-[#171c26] min-h-fit border-4 border-[#171c26]'> 
        <main className='mx-auto mb-5 flex h-full grid-flow-row flex-col content-center items-center justify-center bg-[#171c26] text-white bg-repeat'>
            <h1 className='my-8 text-center text-3xl font-bold text-[#48c55c]'>
                Recon Interface
            </h1>

            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md p-2'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={60}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>
            </div>
            <NumberInput
                className='rounded-lg border-2 border-slate-900 text-center text-2xl text-black'
                placeholder='type match #'
                value={matchNumber}
                onChange={setMatchNumber}></NumberInput>
            <button
                className='my-3 rounded-lg border-2 border-slate-900 text-lg'
                onClick={() => {
                    reloadRetrieveMatch();
                    reloadRetrieveSuper();
                }}>
                Reload Data
            </button>
            
            <BarChartWIP></BarChartWIP>
           
        </main>
        </div> 
    );
}

export default ReconApp;
