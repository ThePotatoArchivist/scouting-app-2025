import React, { useEffect, useState } from 'react';
import { PitFile } from 'requests';
import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';
import TeamDropdown from '../../components/TeamDropdown';
import Dialog from '../../components/Dialog';
import SignIn from '../../components/SignIn';
import ConeStacker from '../../components/ConeStacker';
import { usePreventUnload } from '../../lib/usePreventUnload';
import ImageUploader from './components/ImageUploader';
import { useFetchJson } from '../../lib/useFetch';
import { postJson } from '../../lib/postJson';

function PitApp() {
    usePreventUnload();

    const [scoutedTeams, refreshScoutedTeams] = useFetchJson<number[]>(
        '/data/pit/scouted-teams'
    );

    const [sending, setSending] = useState(false);

    const [additionalNotes, setAdditionalNotes] = useState('');
    const [batteryNumber, setBatteryNumber] = useState(Number);
    const [teamNumber, setTeamNumber] = useState(Number);

    const [scouterName, setScouterName] = useState('');
    const [robotImage, setRobotImage] = useState('');
    useEffect(() => {
        const timeout = setInterval(refreshScoutedTeams, 60 * 1000);
        return () => clearInterval(timeout);
    }, [refreshScoutedTeams]);

    const handleSubmit = async () => {
        if (sending) return;

        const data: PitFile = {
            scouterName: 'bcdsh',
            teamNumber,
            pitBatteryCount: batteryNumber,
            photo: robotImage,
            comments: additionalNotes,
        };

        setSending(true);
        try {
            const result = await postJson('/data/pit', data);
            if (!result.ok) throw new Error('Request Did Not Succeed');
            refreshScoutedTeams();
            setBatteryNumber(0);
            setAdditionalNotes('');
            setTeamNumber(0);
            setRobotImage('');
        } catch {
            alert('Sending Data Failed');
        }
        setSending(false);
    };

    const inputBattery = {
        width: '150px',
        height: '50px',
    };


    return (
        <>
            <div className='bg-[#171c26]'>
                <div className='mb-7 border border-neutral-900 bg-gray-800'>
                    <br />
                    <h1 className='mb-4 text-center text-3xl font-bold text-[#48c55c]'>
                        Pit App
                    </h1>
                </div>

                <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-2'>
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
                                    className={` ${scouterName ? 'text-green-400' : 'text-gray-400'} snap-none`}
                                />
                            </button>
                        )}>
                        {close => (
                            <SignIn
                                scouterName={scouterName}
                                onChangeScouterName={setScouterName}
                                pitScouting
                                onSubmit={close}
                            />
                        )}
                    </Dialog>
                    <ConeStacker />
                </div>

                <div className='mb-2 flex items-center justify-center'>
                    <div className='flex h-40 w-2/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646]'>
                        <h1 className='text-center text-white'>Team Number</h1>
                        <TeamDropdown
                            onChange={setTeamNumber}
                            value={teamNumber}
                            disabledOptions={scoutedTeams}
                        />
                    </div>
                </div>



     
                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-40 w-2/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
                        <h1 className='text-center text-white'>
                            Number of Batteries?
                        </h1>
                        <input
                            min={0}
                            onChange={event =>
                                setBatteryNumber(parseInt(event.target.value))
                            }
                            value={batteryNumber}
                            style={inputBattery}
                            className='border-1 mx-auto !flex w-min place-content-center rounded-lg border border-gray-700 text-center text-4xl'
                            type='number'
                            placeholder='0'></input>
                    </div>
                </div>

                <h1 className='my-2 text-center text-white '>Robot Image</h1>
                <ImageUploader value={robotImage} onChange={setRobotImage} />

                <h1 className='pt-6 text-center text-white'>
                    Additional Notes?
                </h1>
                <input
                    className='border-1 mx-auto mb-3 !flex w-5/6 place-content-center rounded-lg border border-gray-700 text-center text-4xl'
                    onChange={event => setAdditionalNotes(event.target.value)}
                    value={additionalNotes}
                    type='text'></input>

                <button
                    onClick={handleSubmit}
                    className='border-1 pad mx-auto !flex w-min place-content-center rounded-lg border border-gray-700 bg-[#48c55c] px-4 py-4 font-sans text-4xl font-semibold text-black shadow-xl md:bg-opacity-50 '>
                    {sending ? 'Sending...' : 'Submit'}
                </button>
            </div>
        </>
    );
}

export default PitApp;
