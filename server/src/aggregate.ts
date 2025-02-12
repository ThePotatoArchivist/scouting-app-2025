import { MatchDataAggregations, SuperDataAggregations, ScouterData } from 'requests';
import { matchApp, superApp, pitApp, leaderboardApp } from './Schema.js';

async function averageAndMax(): Promise<MatchDataAggregations[]> {
    await matchApp.aggregate([
        {
            $group: {
                _id: {
                    matchNumber: '$metadata.matchNumber',
                    alliance: {
                        $cond: [
                            {
                                $in: [
                                    '$metadata.robotPosition',
                                    ['red_1', 'red_2', 'red_3'],
                                ],
                            },
                            'red',
                            'blue',
                        ],
                    },
                },
                shallow: {
                    $sum: { $cond: [{ $eq: ['$climb', 'shallow'] }, 1, 0] },
                },
                deep: {
                    $sum: { $cond: [{ $eq: ['$climb', 'deep'] }, 1, 0] },
                },
                teams: {
                    $push: '$metadata.robotTeam',
                },
            },
        },
    ]);

    const result = await matchApp.aggregate([
        {
            $group: {
                _id: { teamNumber: '$metadata.robotTeam', matchnumber: '$metadata.matchNumber'},
                // averageTeleCoral: {
                //     $avg: {
                //         $add: [
                //             '$teleCoral.L1',
                //             '$teleCoral.L2',
                //             '$teleCoral.L3',
                //             '$teleCoral.L4'
                //         ],
                //     },
                // },
                // averageTeleAlgaeProcessor: { $avg: '$teleAlgae.processor' },
                // averageTeleAlgaeRobotNet: { $avg: '$teleAlgae.netRobot'},
                // averageAutoCoral: {
                //     $avg: {
                //         $add: [
                //             '$autoCoral.L1',
                //             '$autoCoral.L2',
                //             '$autoCoral.L3',
                //             '$autoCoral.L4'
                //         ],
                //     },
                // },
                // averageAutoAlgaeProcessor: { $avg: '$autoAlgae.processor' },
                // averageAutoAlgaeRobotNet: { $avg: '$autoAlgae.netRobot' },
                avgClimbRate: {
                    $avg: {
                        $cond: [
                            { $in: ['$climb', ['shallow', 'deep']]},
                            1,
                            { $cond: [{ $eq: ['$climb', 'failed'] }, 0, null] },
                        ],
                    },
                },
                totalL1: {
                    $sum: {
                        $add: [
                            '$autoCoral.L1',
                            '$teleCoral.L1'
                        ]
                    }
                },
                totalL2: {
                    $sum: {
                        $add: [
                            '$autoCoral.L2',
                            '$teleCoral.L2'
                        ]
                    }
                },
                totalL3: {
                    $sum: {
                        $add: [
                            '$autoCoral.L3',
                            '$teleCoral.L3'
                        ]
                    }
                },
                totalL4: {
                    $sum: {
                        $add: [
                            '$autoCoral.L4',
                            '$teleCoral.L4'
                        ]
                    }
                },
                totalProcessor: {
                    $sum: {
                        $add: [
                            '$autoAlgae.processor',
                            '$teleAlgae.processor'
                        ]
                    }
                },
                totalNet: {
                    $sum: {
                        $add: [
                            '$autoAlgae.netRobot',
                            '$teleAlgae.netRobot'
                        ]
                    }
                },
                totalRemoved: {
                    $sum: {
                        $add: [
                            '$autoAlgae.removed',
                            '$teleAlgae.removed'
                        ]
                    }
                },
            }
        },
    ]);
    return result;
}

async function superAverageAndMax(): Promise<SuperDataAggregations[]> {
    return await superApp.aggregate([
        {
            $group: {
                _id: { teamNumber: '$metadata.robotTeam' },
                avgFouls: {
                    $avg: {
                        $add: [
                            '$fouls.protectedZone',
                            '$fouls.multiplePieces',
                            '$fouls.insideRobot',
                            '$fouls.pinning',
                            '$fouls.cageFoul',
                            '$fouls.other',
                        ],
                    },
                },
                maxFouls: {
                    $max: {
                        $add: [
                            '$fouls.protectedZone',
                            '$fouls.multiplePieces',
                            '$fouls.insideRobot',
                            '$fouls.pinning',
                            '$fouls.cageFoul',
                            '$fouls.other',
                        ],
                    },
                }, 
                humanAccuracy: {
                    $avg: {
                     $cond: [
                        {$eq: [ {$add: [
                            "$humanShooter.Success",
                            "$humanShooter.Failed"
                            ]
                        }, 0]},
                        null,
                        {$divide: [
                            '$humanShooter.Success',
                            {$add: [
                                "$humanShooter.Success",
                                "$humanShooter.Failed"
                                ]
                            }    
                        ]}
                     ]
                    }
                }

            } satisfies { [K in keyof SuperDataAggregations]: unknown },
        },
    ]);
}

// async function scouterRankings(): Promise<ScouterDataAggregations[]> {
//     return await leaderboardApp.aggregate([
//         {
//             $group: {
//                 _id: { scouterName: '$metadata.scouterName' },

//                 accuracy: {
                   
                    
//                 },
//             } satisfies { [K in keyof ScouterDataAggregations]: unknown },
//         },
//     ]);
// }

async function scouterRankings(): Promise<ScouterData[]> {
    const filter = {};
    const result =  await leaderboardApp.find(filter)
    return (
        result
    );
}



async function robotImageDisplay(
    teamNumber: number
): Promise<Buffer | undefined> {
    return (
        await pitApp.findOne({ teamNumber: teamNumber }, 'teamNumber photo')
    )?.photo;
}

export { averageAndMax, superAverageAndMax, robotImageDisplay, scouterRankings };
