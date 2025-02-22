import {
    MatchDataAggregations,
    MatchSchedule,
    MatchIndividualDataAggregations,
    SuperDataAggregations,
    SuperFoulAggregationsData,
} from 'requests';
import LinkButton from '../../components/LinkButton';
import { useFetchJson } from '../../lib/useFetch';
import { useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import TeamDropdown from '../../components/TeamDropdown';
import scheduleJson from '../../assets/matchSchedule.json';
import { RobotPosition } from 'requests';

import BarChartWIP, { MatchAndSuper } from './components/BarchartWIP';
import CheckBoxRecon from './components/CheckDisplayRecon';
import Checkbox from '../../components/Checkbox';
import CoralReconButton from './components/ReconDisplay';

const schedule = scheduleJson as MatchSchedule;

const matchStats: Exclude<keyof MatchDataAggregations, '_id'>[] = [
    // 'averageTeleCoral',
    // 'averageTeleAlgaeProcessor',
    // 'averageAutoCoral',
    // 'averageAutoAlgaeProcessor',
    // 'averageAutoAlgaeRobotNet',
    'avgClimbRate',
    'totalL1' ,
    'totalL2',
    'totalL3',
    'totalL4' ,
    'totalProcessor' ,
    'totalNet' ,
    'totalRemoved' ,
    'coralDrop1',
    'coralDrop2',
    'coralDrop3',
    'coralDrop4',
    'coralDrop5',
    'coralDrop6',
    'groundPick1',
    'groundPick2',
    'groundPick3',
    'sourcePick1',
    'sourcePick2'
];
const superStats: Exclude<keyof SuperDataAggregations, '_id'>[] = [
    'avgFouls',
    'maxFouls',
    'humanAccuracy'
];

function ReconApp() {
    const [retrieveMatch, reloadRetrieveMatch] =
        useFetchJson<MatchDataAggregations[]>('/data/retrieve');
    const [retrieveSuper, reloadRetrieveSuper] = useFetchJson<
        SuperDataAggregations[]
    >('/data/retrieve/super');
    const [retrieveIndividualMatch, reloadRetrieveIndividualMatch] =
        useFetchJson<MatchIndividualDataAggregations[]>('/data/retrieve/individualMatch');
    const [retrieveIndividualSuper, reloadRetrieveIndividualSuper] = useFetchJson<
        SuperFoulAggregationsData[]
    >('/data/retrieve/individualSuper');
    const [matchNumber, setMatchNumber] = useState<number>();
    const [teams, setTeams] = useState<(number | undefined)[]>([undefined]);
    const [teamNumber, setTeamNumber] = useState(Number);
    const [handleCheck ] = useState(false);
    const [robotPosition, setRobotPosition] = useState<RobotPosition>();


    const blueAlliance = (
        ['blue_1', 'blue_2', 'blue_3'] as (string | undefined)[]
    ).includes(robotPosition);


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


   const sampleData : MatchAndSuper = {
       _id: {
           teamNumber: 0,
           matchNumber: 0
       },
       totalL1: 4,
       totalL2: 5,
       totalL3: 6,
       totalL4: 73,
       totalProcessor: 21,
       totalNet: 43,
       totalRemoved: 8,
       coralDrop1: false,
       coralDrop2: false,
       coralDrop3: false,
       coralDrop4: false,
       coralDrop5: false,
       coralDrop6: false,
       groundPick1: false,
       groundPick2: false,
       groundPick3: false,
       sourcePick1: false,
       sourcePick2: false,
       totalInsideRobot: 9,
       totalProtectedZone: 8,
       totalPinning: 10,
       totalMultiplePieces: 44,
       totalCageFoul: 23,
       totalOther: 7
   }

   let bingus: MatchAndSuper[]
//for (const x: MatchIndividualDataAggregations)
    return (
        <div className='h-auto min-h-fit border-4 border-[#171c26] bg-[#171c26]'>
            <main className='mx-auto mb-10 flex h-full grid-flow-row flex-col content-center items-center justify-center bg-[#171c26] bg-repeat text-white'>
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
                <p className='mb-2 text-2xl text-white'>Team Number</p>
                <TeamDropdown onChange={setTeamNumber} value={teamNumber} />
                <button
                    className='mb-10 mt-5 rounded-lg border-2 border-slate-900 text-lg'
                    onClick={() => {
                        reloadRetrieveMatch();
                        reloadRetrieveSuper();
                    }}>
                    Reload Data
                </button>
                <div className='grid gap-10 grid-cols-4 w-full'>

                    <div className='col-span-2 ml-auto mr-20 rounded-lg border-2 border-gray-800 bg-gray-800 p-4 w-full'>
                        <img
                            src={`/image/${teamNumber}.jpeg`}
                            width='100px'
                            height='100px'
                            alt=''
                            className='items-center text-center h-[300px] w-[500px]'
                        />
                    </div>

                    <div className='col-span-2 w-full items-center justify-center rounded-lg border-2 border-gray-800 bg-gray-800 p-4'>
                        <BarChartWIP data={[sampleData]} teamNumber={0}></BarChartWIP>
                    </div>

                <div className='mt-6 h-fit w-full col-span-2 items-center rounded-lg border-2 border-gray-800 bg-gray-800 p-4'>
                    <h3 className='text-3xl font-bold text-center'>Autos</h3>
                    <img src='bluesidematch.png'>
                    </img>
                    <CheckBoxRecon
                    read-only
                    className={`top-[820px] left-[115px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[873px] left-[115px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[925px] left-[115px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[760px] left-[95px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[980px] left-[95px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[812px] left-[300px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[875px] left-[300px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>
                    <CheckBoxRecon
                    read-only
                    className={`top-[935px] left-[300px] absolute z-20 h-8 w-8 overflow-hidden rounded-full text-left`}>
                    </CheckBoxRecon>

                    <CoralReconButton selectClassName='bg-green-300 absolute left-[222px] top-[855px] h-[10px] w-[45px] rotate-[6.81rad]'
                    unselectClassName='bg-red-300 absolute left-[222px] top-[855px] h-[10px] w-[45px] rotate-[6.81rad]'></CoralReconButton>
                    <CoralReconButton selectClassName='bg-green-300 absolute left-[187px] top-[915px] h-[10px] w-[45px] rotate-[6.81rad]'
                    unselectClassName='bg-red-300 absolute left-[187px] top-[915px] h-[10px] w-[45px] rotate-[6.81rad]'></CoralReconButton>
                    <CoralReconButton selectClassName='bg-green-300 absolute left-[188px] top-[855px] h-[10px] w-[45px] rotate-[6.81rad]'
                    unselectClassName='bg-red-300 absolute left-[188px] top-[855px] h-[10px] w-[45px] rotate-[5.76rad]'></CoralReconButton>
                    <CoralReconButton selectClassName='bg-green-300 absolute left-[222px] top-[915px] h-[10px] w-[45px] rotate-[6.81rad]'
                    unselectClassName='bg-red-300 absolute left-[222px] top-[915px] h-[10px] w-[45px] rotate-[5.76rad]'></CoralReconButton>
                    <CoralReconButton selectClassName='bg-green-300 absolute left-[170px] top-[885px] h-[10px] w-[45px] rotate-[6.81rad]'
                    unselectClassName='bg-red-300 absolute left-[170px] top-[885px] h-[10px] w-[45px] rotate-[4.7rad]'></CoralReconButton>
                    <CoralReconButton selectClassName='bg-green-300 absolute left-[240px] top-[885px] h-[10px] w-[45px] rotate-[6.81rad]'
                    unselectClassName='bg-red-300 absolute left-[240px] top-[885px] h-[10px] w-[45px] rotate-[4.7rad]'></CoralReconButton>

                </div>
                <div className='h-80 w-full col-span-1 col-start-3 mt-6 rounded-lg border-2 border-gray-800 bg-gray-800'>
                    <h3 className='text-3xl font-bold text-center'>Outliers</h3>
                </div>
                <div>
                <div className='justify h-24 w-full col-span-1 col-start-4 mt-6 rounded-lg border-2 border-gray-800 bg-gray-800'>
                    <h3 className='text-3xl font-bold text-center'>HP%</h3>
                    <p className='text-center mt-2 text-2xl'>
                        {(retrieveSuper?.filter((superDataEntry) => superDataEntry._id.teamNumber == teamNumber)[0]?.humanAccuracy) 
                        ? retrieveSuper?.filter((superDataEntry) => superDataEntry._id.teamNumber == teamNumber)[0]?.humanAccuracy.toFixed(3) 
                        : "No Data"}
                    </p>
                </div>
                <div className='justify h-48 w-full col-span-1 mt-8 col-start-4 rounded-lg border-2 border-gray-800 bg-gray-800'> 
                    <h3 className='text-3xl font-bold text-center'>Checklist</h3>
                    <Checkbox className='text-center'>Coral L1</Checkbox>
                    <br/>
                    <Checkbox className='text-center'>Coral L2</Checkbox>
                    <br/>
                    <Checkbox className='text-center'>Coral L3</Checkbox>
                    <br/>
                    <Checkbox className='text-center'>Coral L4</Checkbox>
                    <br/>
                    <Checkbox className='text-center'>Algae Net</Checkbox>
                    <br/>
                    <Checkbox className='text-center'>Algae Processor</Checkbox>
                </div>
                </div>


                </div>
            </main>
        </div>
    );
}

export default ReconApp;
