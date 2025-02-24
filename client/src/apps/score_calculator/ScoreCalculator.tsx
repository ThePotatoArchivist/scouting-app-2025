//import ToggleButton from '../../components/ToggleButton'
import React, { Dispatch, SetStateAction, useState } from 'react';

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';

function Counter({
    value,
    onChange,
    children,
}: {
    value: number;
    onChange: Dispatch<SetStateAction<number>>;
    children: string;
}) {
    return (
        <>
            <button
                className='text-md my-2 rounded-l-lg bg-red-400 px-4 py-2 text-zinc-100 active:brightness-75'
                onClick={() => onChange(value > 0 ? value - 1 : value)}>
                -
            </button>
            <button
                className='text-md min-w-55 my-2 rounded-r-lg bg-slate-600 px-3  py-2 text-zinc-100 active:brightness-75'
                onClick={() => onChange(value + 1)}>
                + {children} ({value})
            </button>
        </>
    );
}

function ScoreCalculator() {
    const [autoLeave, setAutoLeave] = useState(0);
    const [autoCoral1, setAutoCoral1] = useState(0);
    const [autoCoral2, setAutoCoral2] = useState(0);
    const [autoCoral3, setAutoCoral3] = useState(0);
    const [autoCoral4, setAutoCoral4] = useState(0);
    const [autoAlgaeProcessor, setAutoAlgaeProcessor] = useState(0);
    const [autoAlgaeNet, setAutoAlgaeNet] = useState(0);
    const [teleCoral1, setTeleCoral1] = useState(0);
    const [teleCoral2, setTeleCoral2] = useState(0);
    const [teleCoral3, setTeleCoral3] = useState(0);
    const [teleCoral4, setTeleCoral4] = useState(0);
    const [teleAlgaeNet, setTeleAlgaeNet] = useState(0);
    const [teleAlgaeProcessor, setTeleAlgaeProcessor] = useState(0);
    const [park, setPark] = useState(0);
    const [Deep, setDeep] = useState(0);
    const [Shallow, setShallow] = useState(0);
    
    const [foulPoints, setFoulPoints] = useState<number | undefined>(0);

    const autoPoints = autoLeave * 3 ;
    const CoralPoints =
        autoCoral1 * 3 + autoCoral2 * 4 + autoCoral3 * 6 + autoCoral4 * 7 + teleCoral1 * 2 + teleCoral2 * 3 + teleCoral3 * 4 + teleCoral4 * 5;
    const AlgaePoints = autoAlgaeProcessor * 6 + teleAlgaeProcessor * 6 + autoAlgaeNet *4; teleAlgaeNet * 4;
    const cagePoints =
        park * 2 + Deep * 12 + Shallow * 6;
    const totalPoints =
        autoPoints +
        CoralPoints + 
        AlgaePoints +
        cagePoints +
        (foulPoints ?? 0);

    const handleReset = () => {
        setAutoLeave(0);
        setAutoCoral1(0);
        setAutoCoral2(0);
        setAutoCoral3(0);
        setAutoCoral4(0);
        setAutoAlgaeProcessor(0);
        setAutoAlgaeNet(0);
        setTeleCoral1(0);
        setTeleCoral2(0);
        setTeleCoral3(0);
        setTeleCoral4(0);
        setTeleAlgaeProcessor(0);
        setTeleAlgaeNet(0);
        setPark(0);
        setDeep(0);
        setShallow(0);
        setFoulPoints(0);
    };

    return (
        <div className='flex h-dvh flex-col'>
            <div className='mb-2 bg-gray-800'>
                <br />
                <h1 className='mb-4 text-center text-3xl  font-bold text-[#48c55c]'>
                    Score Calculator
                </h1>
            </div>

            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-1'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={50}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>
            </div>

            <div className='flex flex-grow flex-col'>
                <button
                    onClick={handleReset}
                    className='text-md col-span-2 mx-2 rounded-md  bg-blue-400/70 px-3 py-2 text-black active:brightness-75'>
                    Reset All
                </button>
                <div className='flex flex-grow snap-x snap-mandatory flex-row gap-2 overflow-x-auto p-2 *:flex-shrink-0'>
                    <div className='grid w-[calc(100%_-_1rem)] snap-center snap-always auto-rows-fr grid-cols-[auto_1fr] grid-rows-[auto] gap-1 md:w-auto md:flex-grow md:basis-0 '>
                        <h2 className='col-span-2 text-center text-xl font-bold text-green-600'>
                            Auto
                        </h2>
                        <Counter value={autoLeave} onChange={setAutoLeave}>
                            Auto Leave
                        </Counter>
                        <Counter value={autoCoral1} onChange={setAutoCoral1}>
                            Auto Coral L1
                        </Counter>
                        <Counter value={autoCoral2} onChange={setAutoCoral2}>
                            Auto Coral L2
                        </Counter>
                        <Counter value={autoCoral3} onChange={setAutoCoral3}>
                            Auto Coral L3
                        </Counter>
                        <Counter value={autoCoral4} onChange={setAutoCoral4}>
                            Auto Coral L4
                        </Counter>
                        <Counter value={autoAlgaeProcessor} onChange={setAutoAlgaeProcessor}>
                            Auto Algae Processor
                        </Counter>
                        <Counter value={autoAlgaeNet} onChange={setAutoAlgaeNet}>
                            Auto Algae Net
                        </Counter>
                    </div>
                    <div className='grid w-[calc(100%_-_2rem)] snap-center snap-always auto-rows-fr grid-cols-[auto_1fr] grid-rows-[auto] gap-1 md:w-auto md:flex-grow md:basis-0'>
                        <h2 className='col-span-2 text-center text-xl font-bold text-green-600'>
                            Teleop
                        </h2>
                        <Counter value={teleCoral1} onChange={setTeleCoral1}>
                            Tele Coral L1
                        </Counter>
                        <Counter value={teleCoral2} onChange={setTeleCoral2}>
                            Tele Coral L2
                        </Counter>
                        <Counter value={teleCoral3} onChange={setTeleCoral3}>
                            Tele Coral L3
                        </Counter>
                        <Counter value={teleCoral4} onChange={setTeleCoral4}>
                            Tele Coral L4
                        </Counter>

                        <Counter value={teleAlgaeProcessor} onChange={setTeleAlgaeProcessor}>
                            Tele Algae Processor
                        </Counter>

                        <Counter
                            value={teleAlgaeNet}
                            onChange={setTeleAlgaeNet}>
                            Tele Algae Net
                        </Counter>
                    </div>

                    <div className='grid w-[calc(100%_-_1rem)] snap-center snap-always auto-rows-fr  grid-cols-[auto_1fr] grid-rows-[auto]  gap-1 md:w-auto md:flex-grow md:basis-0'>
                        <h2 className='col-span-2 text-center text-xl font-bold text-green-600'>
                            Endgame
                        </h2>
                        <Counter value={park} onChange={setPark}>
                            Park
                        </Counter>
                        <Counter value={Deep} onChange={setDeep}>
                            Deep
                        </Counter>
                        <Counter value={Shallow} onChange={setShallow}>
                            Shallow
                        </Counter>
                        
                    </div>
                </div>

                <div className='col-span-2 grid grid-cols-2 justify-center gap-2 bg-slate-200 p-3'>
                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Leave:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoPoints}
                        </span>
                    </p>

                    <p
                        className={` text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center`}>
                        Coral:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {CoralPoints}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Algae:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {AlgaePoints}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Barge:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-2'>
                            {cagePoints}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center font-black'>
                        Total:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {totalPoints}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScoreCalculator;
