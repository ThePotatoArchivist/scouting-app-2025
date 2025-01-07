import { MatchDataAggregations, SuperDataAggregations } from 'requests';
import { matchApp, superApp, pitApp } from './Schema.js';

async function averageAndMax(): Promise<MatchDataAggregations[]> {
    const climbCounts = await matchApp.aggregate([
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
                source: {
                    $sum: { $cond: [{ $eq: ['$climb', 'source'] }, 1, 0] },
                },
                center: {
                    $sum: { $cond: [{ $eq: ['$climb', 'center'] }, 1, 0] },
                },
                amp: {
                    $sum: { $cond: [{ $eq: ['$climb', 'amp'] }, 1, 0] },
                },
                teams: {
                    $push: '$metadata.robotTeam',
                },
            },
        },
    ]);

    const matches = await matchApp
        .find()
        .select('metadata.matchNumber metadata.robotTeam climb');

    const result = await matchApp.aggregate([
        {
            $group: {
                _id: { teamNumber: '$metadata.robotTeam' },
                averageTeleCoral: {
                    $avg: {
                        $add: [
                            '$teleCoral.L1',
                            '$teleCoral.L2',
                            '$teleCoral.L3',
                            '$teleCoral.L4'
                        ],
                    },
                },
                averageTeleAlgaeProcessor: { $avg: '$teleAlgae.processor' },
                averageTeleAlgaeRobotNet: { $avg: '$teleAlgae.netRobot'},
                averageAutoCoral: {
                    $avg: {
                        $add: [
                            '$autoCoral.L1',
                            '$autoCoral.L2',
                            '$autoCoral.L3',
                            '$autoCoral.L4'
                        ],
                    },
                },
                averageAutoAlgaeProcessor: { $avg: '$autoAlgae.processor' },
                averageAutoAlgaeRobotNet: { $avg: '$autoAlgae.netRobot' },
                maxTeleCoral: {
                    $max: {
                        $add: [
                            '$teleCoral.L1',
                            '$teleCoral.L2',
                            '$teleCoral.L3',
                            '$teleCoral.L4'
                        ],
                    },
                },
                maxTeleAlgaeProcessor: { $max: '$teleAlgae.processor' },
                maxTeleAlgaeRobotNet: { $max: '$teleAlgae.netRobot' },
                maxAutoCoral: {
                    $max: {
                        $add: [
                            '$autoCoral.L1',
                            '$autoCoral.L2',
                            '$autoCoral.L3',
                            '$autoCoral.L4'
                        ],
                    },
                },
                maxAutoAlgaeProcessor: { $max: '$autoAlgae.processor' },
                maxCoral: {
                    $max: {
                        $add: [
                            '$autoCoral.L1',
                            '$autoCoral.L2',
                            '$autoCoral.L3',
                            '$autoCoral.L4',
                            '$teleCoral.L1',
                            '$teleCoral.L2',
                            '$teleCoral.L3',
                            '$teleCoral.L4'
                        ],
                    },
                },
                maxAlgaeProcessor: {
                    $max: {
                        $add: [
                            'teleAlgae.processor',
                            'autoAlgae.processor'
                        ],
                    },
                },
                maxAlgaeRobotNet: { 
                    $max: {
                        $add: [
                            '$teleAlgae.netRobot',
                            '$autoAlgae.netRobot'
                        ],
                    }, 
                },
                avgClimbRate: {
                    $avg: {
                        $cond: [
                            { $in: ['$climb', ['shallow', 'deep', 'park']] },
                            1,
                            { $cond: [{ $eq: ['$climb', 'failed'] }, 0, null] },
                        ],
                    },
                },
            }
        },
    ]);

    result.forEach(result => {
        const matchingMatches = matches.filter(
            match => match.metadata.robotTeam === result._id.teamNumber
        );
        const matchingClimbCounts = matchingMatches.map(
            match =>
                climbCounts.find(
                    climbCount =>
                        climbCount._id.matchNumber ===
                            match.metadata.matchNumber &&
                        climbCount.teams.includes(result._id.teamNumber)
                )[match.climb]
        );
        const harmonyCount = matchingClimbCounts.filter(e => e > 1).length;
        result.harmonyRate = harmonyCount / matchingMatches.length;
    });

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
            } satisfies { [K in keyof SuperDataAggregations]: unknown },
        },
    ]);
}

async function robotImageDisplay(
    teamNumber: number
): Promise<Buffer | undefined> {
    return (
        await pitApp.findOne({ teamNumber: teamNumber }, 'teamNumber photo')
    )?.photo;
}

export { averageAndMax, superAverageAndMax, robotImageDisplay };
