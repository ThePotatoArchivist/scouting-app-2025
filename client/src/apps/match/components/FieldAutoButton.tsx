import { useState } from "react";
import { RobotPosition } from "requests";
import CheckBoxMatch from './CheckBoxButton';
import CoralSectionButton from "./CoralSectionButton";
import bluesidematch from 'path/to/bluesidematch.png';
import redsidematch from 'path/to/redsidematch.png';

const FieldAutoButton = () => {
    const [robotPosition] = useState<RobotPosition>();
    const [ground1, setGround1] = useState(false);
    const [ground2, setGround2] = useState(false);
    const [ground3, setGround3] = useState(false);
    const [source1, setSource1] = useState(false);
    const [source2, setSource2] = useState(false);
    const [start1, setStart1] = useState(false);
    const [start2, setStart2] = useState(false);
    const [start3, setStart3] = useState(false);
    const [deposit1, setDeposit1] = useState(false);
    const [deposit2, setDeposit2] = useState(false);
    const [deposit3, setDeposit3] = useState(false);
    const [deposit4, setDeposit4] = useState(false);
    const [deposit5, setDeposit5] = useState(false);
    const [deposit6, setDeposit6] = useState(false);
    const blueAlliance = (
        ['blue_1', 'blue_2', 'blue_3'] as (string | undefined)[]
    ).includes(robotPosition);

    return (
        <>
            <img src={`${blueAlliance ? bluesidematch : redsidematch}`} width={500} height={600} className="justify-self-center my-7" />
            <CheckBoxMatch
                checked={ground1}
                onChange={setGround1}
                className={`${blueAlliance ? 'top-[660px] left-[285px]' : 'top-[675px] left-[455px]'} absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
            </CheckBoxMatch>
            <CheckBoxMatch
                checked={ground2}
                onChange={setGround2}
                className={`${blueAlliance ? 'top-[740px] left-[285px]' :'top-[760px] left-[455px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CheckBoxMatch
                checked={ground3}
                onChange={setGround3}
                className={`${blueAlliance ? 'top-[820px] left-[285px]' :'top-[840px] left-[455px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CheckBoxMatch
                checked={source1}
                onChange={setSource1}
                className={`${blueAlliance? 'top-[570px] left-[250px]' :'top-[585px] left-[485px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CheckBoxMatch
                checked={source2}
                onChange={setSource2}
                className={`${blueAlliance? 'top-[910px] left-[250px]' :'top-[930px] left-[485px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CheckBoxMatch
                checked={start1}
                onChange={setStart1}
                className={`${blueAlliance? 'top-[645px] left-[565px]' :'top-[660px] left-[160px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CheckBoxMatch
                checked={start2}
                onChange={setStart2}
                className={`${blueAlliance? 'top-[740px] left-[565px]' :'top-[760px] left-[160px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CheckBoxMatch
                checked={start3}
                onChange={setStart3}
                className={`${blueAlliance? 'top-[835px] left-[565px]' :'top-[858px] left-[160px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`} />
            <CoralSectionButton
                onChange={setDeposit1}
                value={deposit1} 
                selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[27.45em] top-[44.3em]':'bg-green-300 absolute left-[20.15em] top-[45.3em]'} h-[1em] w-[4.5em] rotate-[6.83rad]`}
                unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[27.45em] top-[44.3em]':'bg-red-300 absolute left-[20.15em] top-[45.3em]'} h-[1em] w-[4.5em] rotate-[6.83rad]`}>
            </CoralSectionButton>
            <CoralSectionButton
                onChange={setDeposit2}
                value={deposit2} 
                selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[29.4em] top-[47.1em]':'bg-green-300 absolute left-[22em] top-[48.4em]'} h-[1em] w-[4em] rotate-90`}
                unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[29.4em] top-[47.1em]':'bg-red-300 absolute left-[22em] top-[48.4em]'} h-[1em] w-[4em] rotate-90`}>
            </CoralSectionButton>
            <CoralSectionButton
                onChange={setDeposit3}
                value={deposit3} 
                selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[27.6em] top-[49.9em]':'bg-green-300 absolute left-[20.2em] top-[51.1em]'} h-[1em] w-[4em] rotate-[2.6rad]`}
                unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[27.6em] top-[49.9em]':'bg-red-300 absolute left-[20.2em] top-[51.1em]'} h-[1em] w-[4em] rotate-[2.6rad]`}>
            </CoralSectionButton>
            <CoralSectionButton 
                onChange={setDeposit4}
                value={deposit4}
                selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[24.35em] top-[49.9em]':'bg-green-300 absolute left-[16.95em] top-[51em]'} h-[1em] w-[4em] rotate-[6.83rad]`}
                unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[24.35em] top-[49.9em]':'bg-red-300 absolute left-[16.95em] top-[51em]'} h-[1em] w-[4em] rotate-[6.83rad]`}>
            </CoralSectionButton>
            <CoralSectionButton 
                onChange={setDeposit5}
                value={deposit5}
                selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[22.85em] top-[47.3em]':'bg-green-300 absolute left-[15.4em] top-[48.05em]'} h-[1em] w-[4em] rotate-90`}
                unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[22.85em] top-[47.3em]':'bg-red-300 absolute left-[15.4em] top-[48.05em]'} h-[1em] w-[4em] rotate-90`}>
            </CoralSectionButton>
            <CoralSectionButton
                onChange={setDeposit6}
                value={deposit6} 
                selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[24.3em] top-[44.4em]':'bg-green-300 absolute left-[17em] top-[45.3em]'} h-[1em] w-[4em] rotate-[2.6rad]`}
                unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[24.3em] top-[44.4em]':'bg-red-300 absolute left-[17em] top-[45.3em]'} h-[1em] w-[4em] rotate-[2.6rad]`}>
            </CoralSectionButton>
        </>
    );
};

export default FieldAutoButton;
