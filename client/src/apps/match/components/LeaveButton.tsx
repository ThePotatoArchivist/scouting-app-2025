import { Dispatch, SetStateAction } from 'react';
import { MatchScores } from '../MatchApp';
import MultiButton from '../../../components/MultiButton';

type countKeys = keyof MatchScores;

function RegionButton({
    handleCount,
    className,
    teleKey,
    autoKey,
    teleOp,
    count,
    label,

}: {
    handleCount: (
        autokey: countKeys,
        telekey: countKeys,
        aKey?: countKeys
    ) => void;
    className?: string;
    teleKey: countKeys;
    autoKey: countKeys;
    teleOp: boolean;
    count: MatchScores;
    label?: string;
}) {
    return (
        <div className='flex flex-col items-center'>
            <p className='text-4xl text-white'>{label}</p>
            <button
            className={` ${className} text-5xl rounded-md border-white border-2 min-w-44 h-44 bg-[#48c55c]`}
            onClick={() => handleCount(autoKey, teleKey)}
            id='one'>
            <p>
                {count[teleOp ? teleKey : autoKey]}
            </p>
        </button>
        
        </div>
    );
}

function FieldButton({
    setLeave,
    setCount,
    teleOp,
    leave,
    count,
}: {
    setLeave?: Dispatch<boolean>;
    setCount: Dispatch<SetStateAction<MatchScores>>;
    teleOp: boolean;
    leave?: boolean;
    count: MatchScores;
}) {
    const handleCount = (autoKey: countKeys, teleKey: countKeys) => {
        //if (teleOp) {
            const finalKey = teleOp ? teleKey : autoKey;
            setCount(prevCount => ({
                ...prevCount,
                [finalKey]: prevCount[finalKey] + 1,
            }));
      //  }
    };

    const handleLeave = () => {
        setLeave?.(!leave);
    };

    
    return (
        <>
            <div className='flex items-center justify-center gap-2 py-2'>
                {!teleOp && (
                    <>
                        <div className='flex-col items-center justify-center pr-3'>
                            <h1 className='text-4xl text-white'>Leave? </h1>
                            <p className='text-white'>
                                The robot must cross the starting
                                <br /> line completely to select yes.
                            </p>
                        </div>
                        <MultiButton
                            className='h-[100px] flex-grow basis-0 flex-row text-4xl'
                            value={leave}
                            values={[true, false]}
                            labels={['Yes', 'No']}
                            onChange={handleLeave}
                        />
                    </>
                )}
            </div>

            <div
                className={`mx-auto justify-center w-[20em] bg-center object-contain brightness-75 transition-[filter] duration-200
                    `}>
                    <>
                    <div className='my-10 flex justify-center text-4xl font-semibold text-white'>Coral</div>
                        <div className='mb-20 flex justify-center gap-x-4 '>
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoL1'
                            teleKey='teleL1'
                            className={` `}
                            label='L1'
                        />

                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoL2'
                            teleKey='teleL2'
                            className={``}
                            label='L2'
                        />
                    
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoL3'
                            teleKey='teleL3'
                            className={``}
                            label='L3'
                        />
                        
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoL4'
                            teleKey='teleL4'
                            className={``}
                            label='L4'
                        />

                    </div>
                    </>
                
                    <>
                    <div className='my-10 flex justify-center text-4xl font-semibold text-white'>Algae</div>
                        <div className=' mb-20 flex justify-center gap-x-4'>
                        
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoAlgaenetRobot'
                            teleKey='teleAlgaenetRobot'
                            className={``}
                            label='Net'
                        />
                    
                        <RegionButton
                            teleOp={teleOp}
                            count={count}
                            handleCount={handleCount}
                            autoKey='autoProcessor'
                            teleKey='teleProcessor'
                            className={``}
                            label='Processor'
                        />
                        </div>
                    </>
            </div>

        </>
    );
}

export default FieldButton;
