

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';



function LeaderboardApp() {
    
   
    return (
       <div className='bg-[#171c26] min-h-fit min-w-f border-4 border-[#171c26]'> 
        <main className='mx-auto mb-5 flex h-full grid-flow-row flex-col content-center items-center justify-center bg-[#171c26] text-white bg-repeat'>
            <h1 className='mt-8 mb-6 text-center text-3xl font-bold text-[#48c55c]'>
                Scouting Leaderboard
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
            <table className='h-screen border-4 border-slate-700 bg-[#171c26] '>
                            <th className='justify-center border-4 border-slate-700 px-3 pt-3 '>
                                Rank
                            </th>
                                <th className='border-4 px-40 border-slate-700'>
                                Name
                                </th>
                            <th className='justify-center border-4 border-slate-700 px-3'>
                                Accuracy
                            </th>
                
                <tbody className='rows-12'>
                    
                </tbody>
            </table>
        </main>
        </div> 
    );
}


export default LeaderboardApp;