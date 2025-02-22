import EndgameButton from './components/EndGameButton'; 
import FieldButton from './components/LeaveButton';
import LinkButton from '../../components/LinkButton';
import {
    ClimbPosition,
    MatchData,
    MatchSchedule,
    RobotPosition,
    // ScouterPosition,
} from 'requests';
import { SetStateAction, useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import SignIn from '../../components/SignIn';
import Dialog from '../../components/Dialog';
import NumberInput from '../../components/NumberInput';
import CheckBoxMatch from './components/CheckBoxButton';
import { useStatus } from '../../lib/useStatus';
import TeamDropdown from '../../components/TeamDropdown';
import { useQueue } from '../../lib/useQueue';
import scheduleFile from '../../assets/matchSchedule.json';
import { usePreventUnload } from '../../lib/usePreventUnload';
import ToggleButton from '../../components/LightVDarkMode';
import CoralSectionButton from './components/CoralSectionButton';

const schedule = scheduleFile as MatchSchedule;

interface MatchScores {
    autoL1: number;
    autoL2: number;
    autoL3: number;
    autoL4: number;
    autoAlgaenetRobot: number;
    autoProcessor: number;
    autoRemove: number;
    teleRemove: number;
    teleL1: number;
    teleL2: number;
    teleL3: number;
    teleL4: number;
    teleAlgaenetRobot: number;
    teleProcessor: number;
}
const defaultScores: MatchScores = {
    autoL1: 0,
    autoL2: 0,
    autoL3: 0,
    autoL4: 0,
    autoAlgaenetRobot: 0,
    autoProcessor: 0,
    autoRemove: 0,
    teleRemove: 0,
    teleL1: 0,
    teleL2: 0,
    teleL3: 0,
    teleL4: 0,
    teleAlgaenetRobot: 0,
    teleProcessor: 0
};

function MatchApp() {
    usePreventUnload();
    const [sendQueue, sendAll, queue, sending] = useQueue();
    const [teamNumber, setTeamNumber] = useState<number>();
    const [matchNumber, setMatchNumber] = useState<number>();
    const [count, setCount] = useState<MatchScores>(defaultScores);
    const [leave, setLeave] = useState(false); //false=Not Left, true=Left
    const [left, setLeft] = useState(false);
    const [middle, setMiddle] = useState(false);
    const [right, setRight] = useState(false);
    const [leftSource, setleftSource] = useState(false);
    const [rightSource, setrightSource] = useState(false);
    const [ground1, setGround1] = useState(false);
    const [ground2, setGround2] = useState(false);
    const [ground3, setGround3] = useState(false);
    const [deposit1, setDeposit1] = useState(false);
    const [deposit2, setDeposit2] = useState(false);
    const [deposit3, setDeposit3] = useState(false);
    const [deposit4, setDeposit4] = useState(false);
    const [deposit5, setDeposit5] = useState(false);
    const [deposit6, setDeposit6] = useState(false);
    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');
    const [showCheck, setShowCheck] = useState(false);
    const [scouterName, setScouterName] = useState('');
    const [robotPosition, setRobotPosition] = useState<RobotPosition>();
    const [toggleState, setToggleState] = useState(false);
    // const [scouterPosition, setScouterPosition] = useState<ScouterPosition>();

    const blueAlliance = (
        ['blue_1', 'blue_2', 'blue_3'] as (string | undefined)[]
    ).includes(robotPosition);

    const handleAbsentRobot = async () => {
        if (robotPosition == undefined || matchNumber == undefined) {
            alert('Check if your signed in, and you have the match number');
            return;
        }
    

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: undefined,
            },
            leftStartingZone: leave,
            startingZone: {
                left: left,
                middle: middle,
                right: right,
            },
            pickupLocation: {
                leftSource: leftSource,
                rightSource: rightSource,
                ground1: ground1,
                ground2: ground2,
                round3: ground3
            },
            placement: {
                deposit1: deposit1,
                deposit2: deposit2,
                deposit3: deposit3,
                deposit4: deposit4,
                deposit5: deposit5,
                deposit6: deposit6,
            },
            autoCoral: {
                L1: count.autoL1,
                L2: count.autoL2,
                L3: count.autoL3,
                L4: count.autoL4,
            },
            autoAlgae: {
                netRobot: count.autoAlgaenetRobot,
                processor: count.autoProcessor,
                remove: count.autoRemove
            },
            teleCoral: {
                L1: count.teleL1,
                L2: count.teleL2,
                L3: count.teleL3,
                L4: count.teleL4
            },
            teleAlgae: {
                netRobot: count.teleAlgaenetRobot,
                processor: count.teleProcessor,
                remove: count.teleRemove
            },
            climb: climbPosition,
        };

        sendQueue('/data/match', data);
        setCount(defaultScores);
        setClimbPosition('none');
        setLeave(false);
        setMatchNumber(matchNumber + 1);
        setCountHistory([]);

        setShowCheck(true);

        setTimeout(() => {
            setShowCheck(false);
        }, 3000);
    };

    const handleSubmit = async () => {
        if (
            robotPosition == undefined ||
            matchNumber == undefined ||
            teamNumber == undefined
        ) {
            alert('data is missing! :(');
            return;
        }

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: teamNumber,
            },
            leftStartingZone: leave,
            startingZone: {
                left: left,
                middle: middle,
                right: right,
            },
            pickupLocation: {
                leftSource: leftSource,
                rightSource: rightSource,
                ground1: ground1,
                ground2: ground2,
                round3: ground3
            },
            placement: {
                deposit1: deposit1,
                deposit2: deposit2,
                deposit3: deposit3,
                deposit4: deposit4,
                deposit5: deposit5,
                deposit6: deposit6,
            },
            autoCoral: {
                L1: count.autoL1,
                L2: count.autoL2,
                L3: count.autoL3,
                L4: count.autoL4
            },
            autoAlgae: {
                netRobot: count.autoAlgaenetRobot,
                processor: count.autoProcessor,
                remove: count.autoRemove
            },
            teleCoral: {
               L1: count.teleL1,
               L2: count.teleL2,
               L3: count.teleL3,
               L4: count.teleL4
            },
            teleAlgae: {
                netRobot: count.teleAlgaenetRobot,
                processor: count.teleProcessor,
                remove: count.teleRemove
            },
            climb: climbPosition,
        };

        sendQueue('/data/match', data);
        setCount(defaultScores);
        setClimbPosition('none');
        setLeave(false);
        setLeft(false);
        setMiddle(false);
        setRight(false);
        setDeposit1(false);
        setDeposit2(false);
        setDeposit3(false);
        setDeposit4(false);
        setDeposit5(false);
        setDeposit6(false);
        setleftSource(false);
        setrightSource(false);
        setGround1(false);
        setGround2(false);
        setGround3(false);
        setMatchNumber(matchNumber + 1);
        setCountHistory([]);

        setShowCheck(true);

        setTimeout(() => {
            setShowCheck(false);
        }, 3000);
    };

    const showConfirmationDialog = () => {
        if (window.confirm('Are you sure you want to mark as absent?')) {
            // User confirmed, call the action
            handleAbsentRobot();
            // Optionally, you can also scroll to the top
            scrollTo(0, 0);
        }
    };

    const undoCount = () => {
        if (countHistory.length > 0) {
            setCountHistory(prevHistory => prevHistory.slice(0, -1));
            setCount(countHistory.at(-1)!);
        }
    };
    const handleSetCount = (newCount: SetStateAction<MatchScores>) => {
        setCountHistory([...countHistory, count]);
        setCount(newCount);
    };

    useEffect(() => {
        setTeamNumber(
            schedule && robotPosition && matchNumber
                ? schedule[matchNumber]?.[robotPosition]
                : undefined
        );
    }, [matchNumber, robotPosition]);

    useStatus(robotPosition, matchNumber, scouterName);

    function buttonToggle() {
        if (toggleState == false) {
            setToggleState(true);
        } else {
            setToggleState(false);
        }
    }

    const [handleCheck ] = useState(false);

    return (
       <div className= {`${ toggleState ? 'bg-[#171c26]' : 'bg-white'}`}> 
        <main className='mx-auto flex w-min grid-flow-row flex-col content-center items-center justify-center '>
            {showCheck && (
                <MaterialSymbol
                    icon='check'
                    size={150}
                    fill
                    grade={200}
                    color="#48c55c"
                    className='absolute right-10 top-0 ml-10'
                />
            )}
            <h1 className='my-8 mt-10 text-center font-semibold text-[#48c55c] text-3xl'>Match Scouting App</h1>

            <div className='fixed left-4 top-4 z-30 flex flex-row gap-3 rounded-md bg-slate-200 p-1'>
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

                <Dialog
                    open
                    trigger={open => (
                        <button onClick={open}>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${scouterName && robotPosition ? 'text-green-400' : 'text-gray-400'} snap-none`}
                            />
                        </button>
                    )}>
                    {close => (
                        <SignIn
                            scouterName={scouterName}
                            onChangeScouterName={setScouterName}
                            robotPosition={robotPosition}
                            onChangeRobotPosition={setRobotPosition}
                            // scouterPosition={scouterPosition}
                            // onChangeScouterPosition={setScouterPosition}
                            onSubmit={close}
                        />
                    )}
                </Dialog>
                <button
                    onClick={undoCount}
                    className='z-10 aspect-square snap-none rounded bg-[#f07800]  font-bold text-black '>
                    <MaterialSymbol
                        icon='undo'
                        size={60}
                        fill
                        grade={200}
                        color='black'
                        className='snap-none'
                    />
</button>

                <div className={`fixed right-4 top-4 z-20 flex flex-row gap-3 rounded-md p-1`}>
                    <ToggleButton
                    className='' 
                    buttonClassName=''
                    onClick={buttonToggle}>
                    <MaterialSymbol
                        icon={`${toggleState ? 'dark_mode' : 'light_mode'}`}
                        size={60}
                        fill
                        grade={200}
                        color='#48c55c'
                        className='snap-none'
                    />
                    </ToggleButton>
                </div>

            </div>

            <p className={`mb-2 mt-2 text-2xl ${ toggleState ? 'text-white' : 'text-[#171c26]'}`}>Match Number</p>
            <NumberInput
                className='border border-black'
                onChange={setMatchNumber}
                value={matchNumber}
            />
            <p className={`mb-2 mt-8 text-2xl ${toggleState ? 'text-white' : 'text-[#171c26]'}`}>Team Number</p>
            <TeamDropdown onChange={setTeamNumber} value={teamNumber} />

            <div>
                <button
                    onClick={showConfirmationDialog}
                    style={{ fontSize: '20px' }}
                    className='mb-2 mt-14 rounded-md bg-green-500 px-2 py-1 text-center'>
                    Robot Absent
                </button>
            </div>

            <div>
                <h2 className='mb-5 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Autonomous
                </h2>
                
                <img src={`${blueAlliance ? 'bluesidematch.png': 'redsidematch.png'}`} width={500} height={600} className='justify-self-center my-7'></img>
                {   <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance ? '' :'bottom-[120px] right-[700px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    }
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance ? '' :'bottom-[230px] right-[395px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance ? '' :'bottom-[135px] right-[395px] ' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance? '' :'bottom-[390px] right-[365px] ' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance? '' :'bottom-[315px] right-[395px] ' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance? 'bottom-[100px] right-[180px] ' :'bottom-[230px] left-[32px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance? 'bottom-[100px] right-[160px] ' :'bottom-[345px] left-[30px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    <CheckBoxMatch
                    handleChecked={handleCheck}
                    className={`${blueAlliance? 'bottom-[350px] right-[170px] ' :'bottom-[40px] left-[365px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    
                    
                    <CoralSectionButton selectClassName='bg-green-300 absolute left-[9.01em] top-[51em] h-[1em] w-[4em] rotate-[6.88rad]'
                    unselectClassName='bg-red-300 absolute left-[9.01em] top-[51em] h-[1em] w-[4em] rotate-[6.88rad]'></CoralSectionButton>
                    <CoralSectionButton selectClassName='bg-green-300 absolute left-[12.2em] top-[45.2em] h-[1em] w-[4.5em] rotate-[6.88rad]'
                    unselectClassName='bg-red-300 absolute left-[12.2em] top-[45.2em] h-[1em] w-[4.5em] rotate-[6.88rad]'></CoralSectionButton>
                    <CoralSectionButton selectClassName='bg-green-300 absolute left-[7.6em] top-[48em] h-[1em] w-[4em] rotate-90'
                    unselectClassName='bg-red-300 absolute left-[7.6em] top-[48em] h-[1em] w-[4em] rotate-90'></CoralSectionButton>
                    <CoralSectionButton selectClassName='bg-green-300 absolute left-[14.25em] top-[48.3em] h-[1em] w-[4em] rotate-90'
                    unselectClassName='bg-red-300 absolute left-[14.25em] top-[48.3em] h-[1em] w-[4em] rotate-90'></CoralSectionButton>
                    <CoralSectionButton selectClassName='bg-green-300 absolute left-[9.1em] top-[45em] h-[1em] w-[4em] rotate-[2.64rad]'
                    unselectClassName='bg-red-300 absolute left-[9.1em] top-[45em] h-[1em] w-[4em] rotate-[2.64rad]'></CoralSectionButton>
                    <CoralSectionButton selectClassName='bg-green-300 absolute left-[12.5em] top-[51.1em] h-[1em] w-[4em] rotate-[2.64rad]'
                    unselectClassName='bg-red-300 absolute left-[12.5em] top-[51.1em] h-[1em] w-[4em] rotate-[2.64rad]'></CoralSectionButton>
                    
                <p
                    className={`text-center m-5 ${toggleState ? 'text-white' : 'text-[#171c26]'}`}>
                    Please select starting position, collection location, and scored location in autos.
                </p>

                { <FieldButton
                    setCount={handleSetCount}
                    setLeave={setLeave}
                    count={count}
                    teleOp={false}
                    leave={leave}
                    styleMode={toggleState}
                /> }
                <h2 className='my-6 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Tele-Op
                </h2>
                { <FieldButton
                    setCount={handleSetCount}
                    count={count}
                    teleOp={true}
                    styleMode={toggleState}
                /> }
                <h2 className='my-6 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Endgame
                </h2>
                <EndgameButton
                    climbPosition={climbPosition}
                    setClimb={setClimbPosition}
                    count={count}
                    setCount={setCount}
                />
                <div className='mb-5 mt-20 flex flex-col justify-center'>
                    <button
                        onClick={() => {
                            handleSubmit();
                            scrollTo(0, 0);
                        }}
                        style={{ fontSize: '30px' }}
                        className='rounded-md bg-green-500 px-2 py-1 text-center'>
                        Submit
                    </button>
                </div>
            </div>

            <div>
                <div>Queue: {queue.length}</div>
                <button
                    onClick={sendAll}
                    className='rounded-md bg-amber-500 px-2 py-1 text-center mb-5'>
                    {sending ? 'Sending...' : 'Resend All'}
                </button>
            </div>
        </main>
        </div> 
    );
}

export type { MatchScores, ClimbPosition };

export default MatchApp;