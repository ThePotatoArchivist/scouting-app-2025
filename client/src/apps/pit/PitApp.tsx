import MultiButton from '../../components/MultiButton';
//import ToggleButton from '../../components/ToggleButton'
import React, { useEffect, useState } from 'react';
import Checkbox from '../../components/Checkbox';
import { PitFile, teamRoles, drivebase } from 'requests';
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

    const [autoInputValues, setAutoInputValues] = useState(['']);
    const [role, setRole] = useState<teamRoles | undefined>();
    const [drivetrain, setDrivetrain] = useState<drivebase | undefined>();
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [batteryNumber, setBatteryNumber] = useState(Number);
    const [teamNumber, setTeamNumber] = useState(Number);

    const [algaeChecked, setalgaeChecked] = useState(false);
    const [coralChecked, setcoralChecked] = useState(false);
    const [climbShallowChecked, setclimbShallowChecked] = useState(false);
    const [climbDeepChecked, setclimbDeepChecked] = useState(false);
    const [algaePrefChecked, setalgaePrefChecked] = useState(false);
    const [coralPrefChecked, setcoralPrefChecked] = useState(false);
    const [climbShallowPrefChecked, setclimbShallowPrefChecked] = useState(false);
    const [climbDeepPrefChecked, setclimbDeepPrefChecked] = useState(false);

    const [coral, setCoral] = useState<number[]>([]);
    const [algae, setAlgae] = useState<number[]>([]);
    const [movement, setMovement] = useState<boolean[]>([]);


    const [scouterName, setScouterName] = useState('');
    const [robotImage, setRobotImage] = useState('');
    useEffect(() => {
        const timeout = setInterval(refreshScoutedTeams, 60 * 1000);
        return () => clearInterval(timeout);
    }, [refreshScoutedTeams]);

    const handleSubmit = async () => {
        if (sending) return;

        if (!drivetrain || !role) {
            alert('data is missing :(');
            return;
        }

        const data: PitFile = {
            scouterName: 'bcdsh',
            teamNumber,
            capabilities: {
                algae: algaeChecked,
                coral: coralChecked,
                climbShallow: climbShallowChecked,
                climbDeep: climbDeepChecked,
            },
            preference: {
                algaePrefer: algaePrefChecked,
                coralPrefer: coralPrefChecked,
                climbSPrefer: climbShallowPrefChecked,
                climbDPrefer: climbDeepPrefChecked,
            },
            autoCapability: autoInputValues,
            teamRole: role,
            pitBatteryCount: batteryNumber,
            drivebase: drivetrain,
            photo: robotImage,
            comments: additionalNotes,
        };

        setSending(true);
        try {
            const result = await postJson('/data/pit', data);
            if (!result.ok) throw new Error('Request Did Not Succeed');
            refreshScoutedTeams();
            setAutoInputValues(['']);
            setalgaeChecked(false);
            setalgaePrefChecked(false);
            setBatteryNumber(0);
            setAdditionalNotes('');
            setRole(undefined);
            setTeamNumber(0);
            setclimbDeepChecked(false);
            setclimbDeepPrefChecked(false);
            setDrivetrain(undefined);
            setcoralChecked(false);
            setcoralPrefChecked(false);
            setclimbShallowChecked(false);
            setclimbShallowPrefChecked(false);
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

    //add auto set
  const addAuto = () => {
    setCoral((prev) => [...prev, 0]);
    setAlgae((prev) => [...prev, 0]);
    setMovement((prev) => [...prev, false]);
  };

  //remove auto set
  const removeAuto = (index: number) => {
    setCoral((prev) => prev.filter((_, i) => i !== index));
    setAlgae((prev) => prev.filter((_, i) => i !== index));
    setMovement((prev) => prev.filter((_, i) => i !== index));
  };

  const updateValue = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    newValue: number
  ) => {
    setter((prev) =>
      prev.map((value, i) => (i === index ? newValue : value))
    );
  };

  // Toggle a boolean value (for auto movement)
  const toggleMovement = (index: number) => {
    setMovement((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
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

                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-24 w-2/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646]'>
                        <h1 className='text-center text-white'>Team Number</h1>
                        <TeamDropdown
                            onChange={setTeamNumber}
                            value={teamNumber}
                            disabledOptions={scoutedTeams}
                        />
                    </div>
                </div>

                <h1 className='mb-7 text-center text-white '>
                    Capabilities? Choose all that apply.
                </h1>
                <div className='pad mx-auto !flex w-min flex-wrap place-content-center'>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={algaeChecked}
                            onChange={setalgaeChecked}
                            className='form-checkbox mr-2 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='algae'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Algae 
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={coralChecked}
                            onChange={setcoralChecked}
                            className='form-checkbox mr-2 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='coral'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Coral
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={climbShallowChecked}
                            onChange={setclimbShallowChecked}
                            className='form-checkbox ml-5 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='climbShallowNotes'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Shallow Cage
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={climbDeepChecked}
                            onChange={setclimbDeepChecked}
                            className='form-checkbox ml-16 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='climbDeepingCapability'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Deep Cage
                        </label>
                    </div>
                     
                </div>

                <h1 className='mb-3 mt-8 text-center text-white'>
                    What is their preference? Choose all that apply.
                </h1>
                <div className='pad mx-auto !flex w-min flex-wrap place-content-center'>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={algaePrefChecked}
                            onChange={setalgaePrefChecked}
                            className='form-checkbox h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='algaePreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Algae Preferred?
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={coralPrefChecked}
                            onChange={setcoralPrefChecked}
                            className='form-checkbox h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='coralPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Coral Preferred?
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={climbShallowPrefChecked}
                            onChange={setclimbShallowPrefChecked}
                            className='form-checkbox ml-7 h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='climbShallowPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Shallow Cage Preferred?
                        </label>
                    </div>
                    
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={climbDeepPrefChecked}
                            onChange={setclimbDeepPrefChecked}
                            className='form-checkbox ml-9 h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='climbDeepPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Deep Cage Preferred?
                        </label>
                    </div>
                </div>

      <div className="flex-col items-center justify-center bg-[#2f3646] border-2 rounded-lg text-gray-200 border-[#2f3646]">
        {coral.map((_, index) => (
          <div key={index} className="">
            <h2 className="text-lg font-semibold mb-2 mt-5">Auto {index + 1}</h2>

            {/* Algae n Coral Controls */}
            {[
              { label: "Coral", state: coral, setter: setCoral},
              { label: "Algae", state: algae, setter: setAlgae},
            ].map(({label, state, setter}) => (
              <div key={label} className="flex item-center justify-center mb-2">
                <p className="text-md font-medium px-3 py-5">{label}:</p>
                <p className="text-md py-5 px-3 w-10">{state[index]}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateValue(setter, index, state[index] - 1)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateValue(setter, index, state[index] + 1)}
                    className="px-10 py-5 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Movement Control */}
            <div className="flex items-center justify-center mb-2">
              <p className="text-md w-40">
                {movement[index] ? "Movement" : "No Movement"}
              </p>
              <button
                onClick={() => toggleMovement(index)}
                className=" px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Toggle
              </button>
            </div>

            {/* Remove Data Set Button */}
            <div className='flex items-center justify-center'>
            <button
              onClick={() => removeAuto(index)}
              className="mt-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Remove Auto
            </button>
            </div>
          </div>
        ))}
      </div>
      <br/>
      <div className='flex items-center justify-center'>
                <button
        onClick={addAuto}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-4"
      >
        Add Auto
      </button>
</div>

                <div className='mb-8 mt-7 flex items-center justify-center'>
                    <div className='flex h-24 w-2/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
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

                <div className='ml-1 flex flex-col items-center justify-center'></div>

                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-48 w-3/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
                        <h1 className='mb-3 text-center font-semibold text-white'>
                            Team role?
                        </h1>
                        <div className='grid grid-cols-2 justify-center gap-4'>
                            <MultiButton
                                onChange={setRole}
                                value={role}
                                labels={['Scoring', 'Defense']}
                                values={['scoring', 'defense']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-8',
                                ]}
                            />
                            <MultiButton
                                onChange={setRole}
                                value={role}
                                labels={['Support', 'All-Round']}
                                values={['support', 'all-round']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-8',
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-48 w-3/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
                        <h1 className='mb-3 text-center font-semibold text-white'>
                            Drivetrain type?
                        </h1>
                        <div className='grid grid-cols-2 justify-center gap-4'>
                            <MultiButton
                                onChange={setDrivetrain}
                                value={drivetrain}
                                labels={['Tank', 'Swerve']}
                                values={['tank', 'swerve']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-8',
                                ]}
                            />
                            <MultiButton
                                onChange={setDrivetrain}
                                value={drivetrain}
                                labels={['Mecanum', 'Other']}
                                values={['MECANUM', 'other']}
                                className={[
                                    'mx-auto !flex w-min place-content-center ',
                                    'mx-auto !flex w-min place-content-center px-8',
                                ]}
                            />
                        </div>
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
