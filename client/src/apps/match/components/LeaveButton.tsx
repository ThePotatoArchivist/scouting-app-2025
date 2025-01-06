import { Dispatch } from 'react';
import MultiButton from '../../../components/MultiButton';


function LeaveButton({
    setLeave,
    teleOp,
    leave,
}: {
    setLeave?: Dispatch<boolean>;
    teleOp: boolean;
    leave?: boolean;
}) {
    
    
    const handleLeave = () => {
        setLeave?.(!leave);
    };
    return (
        <>
            <div className='flex items-center justify-center gap-2 py-2'>
                {!teleOp && (
                    <>
                        <div className='flex-col items-center justify-center pr-3'>
                            <h1 className='text-4xl'>Leave? </h1>
                            <p>
                                The robot must exit the barge
                                <br /> zone to select yes.
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
        </>


    );
}
export default LeaveButton;


