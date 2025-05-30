import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useEffect, useState } from 'react';
import Dialog from '../../components/Dialog';
import {
    Foul,
    SuperPosition,
    Break,
    MatchSchedule,
    SuperData,
    RobotPosition,
} from 'requests';
import SuperTeam from './components/SuperTeam';
import { SuperTeamState } from './components/SuperTeam';
import NumberInput from '../../components/NumberInput';
import MultiButton from '../../components/MultiButton';
import { useStatus } from '../../lib/useStatus';
import { useQueue } from '../../lib/useQueue';
import scheduleFile from '../../assets/matchSchedule.json';
import { usePreventUnload } from '../../lib/usePreventUnload';
import HumanCounter from './components/HumanNetCounter';
// import Human from './components/HumanNetCounter';

const schedule = scheduleFile as MatchSchedule;

const foulTypes: Foul[] = [
    'insideRobot',
    'protectedZone',
    'pinning',
    'multiplePieces',
    'other',
];

interface SuperScores {
    Success: number;
    Failed: number;
}

const defaultScore: SuperScores = {
    Success: 0,
    Failed: 0,
};

const breakTypes: Break[] = ['mechanismDmg', 'batteryFall', 'commsFail'];

const defaultSuperTeamState: SuperTeamState = {
    foulCounts: Object.fromEntries(foulTypes.map(e => [e, 0])) as Record<
        Foul, number
    >,
    breakCount: Object.fromEntries(breakTypes.map(e => [e, 0])) as Record<
        Break, number
    >,
    defenseRank: 'noDef',
    wasDefended: false,
    teamNumber: undefined,
    cannedComments: [],
};

function SuperApp() {
    usePreventUnload();
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();
    const [team1, setTeam1] = useState(defaultSuperTeamState);
    const [team2, setTeam2] = useState(defaultSuperTeamState);
    const [team3, setTeam3] = useState(defaultSuperTeamState);
    const [count, setCount] = useState<SuperScores>(defaultScore);
    const [shooterPlayerTeam, setShooterPlayerTeam] = useState<number>();
    const [sendQueue, sendAll, queue, sending] = useQueue();
    const [matchNumber, setMatchNumber] = useState<number>();
    const [showCheck, setShowCheck] = useState(false);
    const [history, setHistory] = useState< { 1: SuperTeamState; 2: SuperTeamState; 3: SuperTeamState; 4: SuperScores  }[] >([]);
    useStatus(superPosition, matchNumber, scouterName);

    const saveHistory = () => {
        setHistory([
            ...history,
            {
                1: team1,
                2: team2,
                3: team3,
                4: count 
            },
        ]);
    };
    const handleTeam1 = (teamValue: SuperTeamState) => {
        setTeam1(teamValue);
        saveHistory();
    };
    const handleTeam2 = (teamValue: SuperTeamState) => {
        setTeam2(teamValue);
        saveHistory();
    };
    const handleTeam3 = (teamValue: SuperTeamState) => {
        setTeam3(teamValue);
        saveHistory();
    };
    const handleCount = (scoreValue: SuperScores) => {
        setCount(scoreValue);
        saveHistory();
    }

    const handleSubmit = async () => {
        if (
            scouterName === undefined ||
            superPosition === undefined ||
            matchNumber === undefined ||
            team1.teamNumber === undefined ||
            team2.teamNumber === undefined ||
            team3.teamNumber === undefined
        ) {
            alert('data is missing! :(');
            return;
        }

        const data = [team1, team2, team3].map(
            (team, index) =>
                ({
                    metadata: {
                        scouterName,
                        matchNumber,
                        robotTeam: team.teamNumber!,
                        robotPosition: (
                            (superPosition === 'blue_ss'
                                ? ['blue_1', 'blue_2', 'blue_3']
                                : ['red_1', 'red_2', 'red_3',]) satisfies RobotPosition[]
                        )[index],
                    },
                    fouls: team.foulCounts,
                    break: team.breakCount,
                    defense: team.defenseRank,
                    defended: team.wasDefended,
                    humanShooter:
                        shooterPlayerTeam === team.teamNumber
                            ? {
                                    Success: count.Success,
                                    Failed: count.Failed,
                              }
                            : undefined,
                    comments: team.cannedComments.map(option => option.value),
                }) satisfies SuperData
        );

        console.log(data);

        data.map(e => sendQueue('/data/super', e));
        setTeam1(defaultSuperTeamState);
        setTeam2(defaultSuperTeamState);
        setTeam3(defaultSuperTeamState);
        setCount(defaultScore);
        setHistory([]);
        setMatchNumber(matchNumber + 1);
        setShowCheck(true);
        setTimeout(() => {
            setShowCheck(false);
        }, 3000);
    };

    useEffect(() => {
        if (!schedule || !superPosition || !matchNumber) {
            setTeam1(team1 => ({ ...team1, teamNumber: undefined }));
            setTeam2(team2 => ({ ...team2, teamNumber: undefined }));
            setTeam3(team3 => ({ ...team3, teamNumber: undefined }));
            return;
        }
        const blueAlliance = superPosition === 'blue_ss';
        setTeam1(team1 => ({
            ...team1,
            teamNumber:
                schedule[matchNumber]?.[blueAlliance ? 'blue_1' : 'red_1'],
        }));
        setTeam2(team2 => ({
            ...team2,
            teamNumber:
                schedule[matchNumber]?.[blueAlliance ? 'blue_2' : 'red_2'],
        }));
        setTeam3(team3 => ({
            ...team3,
            teamNumber:
                schedule[matchNumber]?.[blueAlliance ? 'blue_3' : 'red_3'],
        }));
    }, [matchNumber, superPosition]);

    const undoHistoryCount = () => {
        if (history.length > 0) {
            setHistory(prevHistory => prevHistory.slice(0, -1));
            const last = history.at(-1)!;
            setTeam1(last[1]);
            setTeam2(last[2]);
            setTeam3(last[3]);
            setCount(last[4]);
        }
    };


    return (
        <main className='bg-[#171c26] text-center h-full'>
            {showCheck && (
                <MaterialSymbol
                    icon='check'
                    size={150}
                    fill
                    grade={200}
                    color='green'
                    className='absolute right-10 top-0 ml-10'
                />
            )}
            <h1 className='col-span-3 p-5 text-3xl font-bold text-[#48c55c]'>
                Super Scouting App
            </h1>

            <div className='fixed left-4 top-4 z-20 flex flex-row gap-3 rounded-md bg-slate-200 p-1'>
                <LinkButton link='/'>
                    <MaterialSymbol
                        icon='home'
                        size={60}
                        fill
                        grade={200}
                        color='green'
                       
                    />
                </LinkButton>

                <Dialog
                    open
                    trigger={open => (
                        <button onClick={open} className='col-span-3'>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${
                                    scouterName && superPosition
                                        ? 'text-green-400'
                                        : 'text-gray-400'
                                }`}
                            />
                        </button>
                    )}>
                    {close => (
                        <SignIn
                            scouterName={scouterName}
                            onChangeScouterName={setScouterName}
                            robotPosition={superPosition}
                            onChangeRobotPosition={setSuperPosition}
                            superScouting
                            onSubmit={close}
                        />
                    )}
                </Dialog>

                <button
                    onClick={undoHistoryCount}
                    className='z-10 aspect-square rounded bg-[#f07800]  p-1  font-bold text-black '>
                    <MaterialSymbol
                        icon='undo'
                        size={60}
                        fill
                        grade={200}
                        color='black'
                      
                    />
                </button>
            </div>
        <div>
            <p className='text-xl text-white'>Match Number</p>
            <NumberInput
                onChange={setMatchNumber}
                value={matchNumber}
                className='m-2 p-2 text-xl text-black'
            />
        </div>
        <p
            className={'mt-10  text-white text-2xl'}>
                Human Player Points
            </p>
            
               <HumanCounter
                count={count}
                className='mt-10 mb-5 p-10 mx-4 bg-green-500 text-white text-2xl rounded' 
                setCount={handleCount} >        
                </HumanCounter> 

                
                <div/>
       <p className='text-white pt-5 text-2xl'>Human Player</p>     
        <div className='grid grid-cols-3 justify-items-center gap-10 px-10'>
            <MultiButton
                className='mx-10 mt-10 w-full max-w-40 outline-black'
                onChange={setShooterPlayerTeam}
                values={[
                    team1.teamNumber ?? -1,
                    team2.teamNumber ?? -2,
                    team3.teamNumber ?? -3,
                ]} // ugly hack hehe 
                labels={[
                    team1.teamNumber ?? 'Team 1',
                    team2.teamNumber ?? 'Team 2',
                    team3.teamNumber ?? 'Team 3',
                ].map(e => e.toString())}
                value={shooterPlayerTeam}
                selectedClassName='bg-[#48c55c]'
                unSelectedClassName='bg-white'
            />
                <SuperTeam teamState={team1} setTeamState={handleTeam1} bgClass={`${shooterPlayerTeam == -1 ? 'bg-[#003805] rounded-lg p-5' : ''} `}/>
                <SuperTeam teamState={team2} setTeamState={handleTeam2} bgClass={`${shooterPlayerTeam == -2 ? 'bg-[#003805] rounded-lg p-5' : ''} `}/>
                <SuperTeam teamState={team3} setTeamState={handleTeam3} bgClass={`${shooterPlayerTeam == -3 ? 'bg-[#003805] rounded-lg p-5' : ''} `}/>
                
        </div>  
            <button
                onClick={() => {
                    handleSubmit();
                    
                }}
                className='m-5 w-full max-w-80 rounded-md bg-[#48c55c] px-4 py-2 text-lg'>
                Submit
            </button>

            <div>
                <div className='text-white'>Queue: {queue.length}</div>
                <button
                    onClick={sendAll}
                    className='rounded-md bg-amber-500 px-2 py-1 text-center'>
                    {sending ? 'Sending...' : 'Resend All'}
                </button>
            </div>
        </main>
    );
}

export type { SuperScores };
export default SuperApp;
