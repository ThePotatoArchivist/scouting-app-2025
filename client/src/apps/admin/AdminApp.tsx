import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import { useStatusRecieve } from '../../lib/useStatus';
import { ScouterTable } from './components/ScouterTable';
import { MatchTable } from './components/MatchTable';
//import { useFetchJson } from "../../lib/useFetch";

function AdminApp() {
    const status = useStatusRecieve();

    // const [schedule] = useFetchJson<MatchSchedule>('/matchSchedule.json');

    return (
        <main className='flex h-screen w-screen select-none flex-col items-center text-center'>
            <h1 className='col-span-4 my-8 text-3xl'>Admin Interface</h1>

            <div className='fixed left-4 top-4 z-20 flex gap-2 rounded-md p-2'>
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

            <div className='grid grid-cols-2 items-center justify-center gap-4'>
                <div>
                    <ScouterTable scouters={status.scouters} />
                    <p className='my-6'>Connected Tablets</p>
                </div>
                <div>
                    <p>Match Display</p>
                    <div className='table-container'>
                        <MatchTable matches={status.matches}></MatchTable>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminApp;
