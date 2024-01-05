import { Card, CardBody, CardFooter, CardHeader, commonColors, Tooltip } from '@nextui-org/react'
import Icon from '@mdi/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowPointer, faCannabis, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { getAllTimeReset, getAllTimeTier, getStartTime } from '../Utils/Store/allTimeStatsSlice'
import durationFormat from 'format-duration'
import {
    mdiCannabis,
    mdiZodiacCancer,
    mdiBabyFaceOutline,
    mdiChartLineVariant,
    mdiAbacus,
    mdiSync,
    mdiBrushOutline,
    mdiNewBox,
} from '@mdi/js'
import { THEMES } from '../Utils/THEMES'
import { useEffect } from 'react'

function BadgeCluster() {
    const allTimeClicks = useSelector((state) => getAllTimeTier(state, 0))
    const allTimeResets = useSelector(getAllTimeReset)
    const startTime = useSelector(getStartTime)
    let playTime = durationFormat(Date.now() - startTime)

    interface badge {
        icon: string
        color: string
        description: string
        isUnlocked: boolean
        rotate?: number
    }
    const badges: badge[] = [
        {
            icon: mdiBabyFaceOutline,
            color: commonColors.zinc[600],
            description: 'Babies First Click',
            isUnlocked: allTimeClicks > 0,
        },
        {
            icon: mdiSync,
            color: commonColors.purple[300],
            description: 'First Reset',
            isUnlocked: allTimeResets > 0,
        },
        {
            icon: mdiZodiacCancer,
            color: commonColors.red[600],
            description: 'Nice 😏',
            rotate: 90,
            isUnlocked: allTimeClicks > 69,
        },
        {
            icon: mdiChartLineVariant,
            color: commonColors.blue[200],
            description: 'First 100',
            isUnlocked: allTimeClicks > 100,
        },

        {
            icon: mdiCannabis,
            color: commonColors.green[600],
            description: '420 Clicks!',
            isUnlocked: allTimeClicks > 420,
        },
        {
            icon: mdiAbacus,
            color: commonColors.purple[400],
            description: 'Growing Fast!',
            isUnlocked: allTimeClicks > 10000,
        },
        {
            icon: mdiNewBox,
            color: commonColors.yellow[700],
            description: 'A Whole New Game',
            isUnlocked: allTimeResets >= 3,
        },
        {
            icon: mdiBrushOutline,
            color: commonColors.purple[400],
            description: 'Unlocked All Themes',
            isUnlocked: allTimeResets >= THEMES.length,
        },
    ]
    return (
        <Card className="min-w-full min-h-full bg-content2">
            <CardHeader className="text-center justify-center text-lg pb-0 pt-1 max-h-fit">Achievements</CardHeader>
            <CardBody className="min-h-12 grid grid-rows-1 grid-flow-col justify-start gap-0.5 bg-content1 border-content2 border-4 rounded-2xl">
                {badges.map((badge) => {
                    if (badge.isUnlocked)
                        return (
                            <div key={badge.description}>
                                <Tooltip content={badge.description}>
                                    <Icon
                                        color={badge.color}
                                        rotate={badge.rotate ?? 0}
                                        size={2}
                                        path={badge.icon}
                                    ></Icon>
                                </Tooltip>
                            </div>
                        )
                })}
            </CardBody>
        </Card>
    )
}
export default BadgeCluster
